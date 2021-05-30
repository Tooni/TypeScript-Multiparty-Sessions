import WebSocket from "ws";
import { v1 as uuidv1 } from "uuid";

import * as Cancellation from "./Cancellation";

import {
    Message,
    Role,
    State,
} from "./EFSM";

// =============
// Runtime Types
// =============

type StateInitialiser<SessionID> = (sessionID: SessionID) => State.S0;

export type StateTransitionHandler = (state: State.Type) => void;
export type SendStateHandler = (role: Role.Peers, label: string, payload: any, fromState: string) => void;
export type MessageHandler = (payload: any) => void;
export type ReceiveStateHandler = (from: Role.Peers, messageHandler: MessageHandler) => void;

// ===============
// WebSocket Types
// ===============

type RoleToSocket = Role.PeersToMapped<WebSocket>;
type RoleToMessageQueue = Role.PeersToMapped<any[]>;
type RoleToHandlerQueue = Role.PeersToMapped<MessageHandler[]>;

interface WebSocketMessage {
    data: any
    type: string
    target: WebSocket
};

// ================
// Connection Phase
// ================

namespace Connect {
    export interface Request {
        connect: Role.Peers;
    };

    export const Confirm = {
        connected: true,
    };
};

export class Wallet {
    constructor(wss: WebSocket.Server,
        cancellation: Cancellation.Handler<string>,
        initialise: StateInitialiser<string>,
        generateID: () => string = uuidv1) {
        let connectionContexts: Session[];

        let removeSession = (s: Session) => {
            const sIndex = connectionContexts.indexOf(s);
            if (sIndex > -1) {
                connectionContexts.splice(sIndex, 1);
            }
        }

        connectionContexts = [
            new Session(generateID(), cancellation, initialise, removeSession)
        ];

        // Handle explicit cancellation during the join phase.
        const onClose = ({ target: socket }: WebSocket.CloseEvent) => {
            socket.removeAllListeners();

            // Wait for the role again - guaranteed to occur in map by construction.
            for (const session of connectionContexts) {
                const role = session.getRoleFromSocket(socket);
                if (role !== undefined) {
                    // Might need to check if role is optional? todo
                    session.startWaitingFor(role);
                    return;
                }
            }
        }

        // Handle connection invitation message from participant.
        const onSubscribe = (event: WebSocketMessage) => {
            const { data, target: socket } = event;
            const { connect: role } = Message.deserialise<Connect.Request>(data);
            for (let i = 0; i < connectionContexts.length; i++) {
                const session = connectionContexts[i];
                if (session.isWaitingFor(role)) {
                    session.stopWaitingFor(role);
                    session.addRole(role, socket);

                    if (session.isNotWaitingForRoles()) {
                        const newContext = new Session(generateID(), cancellation, initialise, removeSession)
                        connectionContexts.push(newContext);
                    }
                    return;
                }
            }

            const initialMandatoryRoles = new Set([Role.Peers.Customer]);
            if (!initialMandatoryRoles.has(role)) {
                return;
            }

            // Role occupied in all existing connection contexts;
            // Create new connection context.
            const context = new Session(generateID(), cancellation, initialise, removeSession)
            const session = context;

            // Update role-WebSocket mapping.
            session.addRole(role, socket);
            session.stopWaitingFor(role);

            connectionContexts.push(context);
        }

        // Bind event listeners for every new connection.
        wss.addListener('connection', (ws: WebSocket) => {
            ws.onmessage = onSubscribe;
            ws.onclose = onClose;
        });

    }

}

class Session {

    private id: string;
    private roleToSocket: Map<Role.Peers, WebSocket>;
    private socketToRole: Map<WebSocket, Role.Peers>;
    private cancellation: Cancellation.Handler<string>;
    private initialise: StateInitialiser<string>;
    private removeSession: (s: Session) => void;

    private waiting: Set<Role.Peers>;

    private activeRoles: Set<Role.Peers>;
    private messageQueue: RoleToMessageQueue;
    private handlerQueue: RoleToHandlerQueue;
    private sendQueue: RoleToMessageQueue;

    private varMap: Map<string, any>;
    private refMap: Map<string, () => boolean>;
    private recExprMap: Map<string, [string, () => void]>;

    constructor(id: string,
        cancellation: Cancellation.Handler<string>,
        initialise: StateInitialiser<string>,
        removeSession: (s: Session) => void) {

        this.id = id;
        this.roleToSocket = new Map<Role.Peers, WebSocket>();
        this.socketToRole = new Map<WebSocket, Role.Peers>();
        this.cancellation = cancellation;
        this.initialise = initialise;
        this.removeSession = removeSession; // tODO: fix cancels!

        this.varMap = new Map<string, any>();
        this.refMap = new Map<string, () => boolean>(
            [
                ["Wallet>login_denied>msg>S3>Customer", () => (this.varMap.get('try') === 3)],
                ["Wallet>login_retry>msg>S3>Customer", () => (this.varMap.get('try') < 3)],
                ["Vendor>request>bill>S3>Customer", () => (this.varMap.get('bill') > 0)],
                ["Customer>login>account>S0>Wallet", () => (this.varMap.get('account') >= 100000 && this.varMap.get('account') < 1000000)],
                ["Customer>pin>pin>S2>Wallet", () => (this.varMap.get('pin') >= 1000 && this.varMap.get('pin') < 10000)],
                ["Customer>pay>payment>S8>Vendor", () => (this.varMap.get('payment') === this.varMap.get('bill'))],

            ]
        );
        this.recExprMap = new Map<string, [string, () => void]>(
            [
                ["Wallet>login_retry>msg>S3>Customer", ["try", () => {

                    this.varMap.set("try", this.varMap.get('try') + 1);

                }]],
            ]
        );

        this.waiting = new Set([Role.Peers.Customer]);

        // Keep track of active participants in the session.
        this.activeRoles = new Set();

        // Bind `this` instances to callbacks
        this.next = this.next.bind(this);
        this.cancel = this.cancel.bind(this);
        this.send = this.send.bind(this);
        this.registerMessageHandler = this.registerMessageHandler.bind(this);

        // Initialise queues for receiving.
        this.messageQueue = {
            [Role.Peers.Vendor]: [], [Role.Peers.Customer]: [],
        };

        this.handlerQueue = {
            [Role.Peers.Vendor]: [], [Role.Peers.Customer]: [],
        };

        this.sendQueue = {
            [Role.Peers.Vendor]: [], [Role.Peers.Customer]: [],
        };

        this.next(initialise(this.id));
    }

    // =======================
    // Session roles functions
    // =======================

    isNotWaitingForRoles() {
        return this.waiting.size === 0;
    }

    isWaitingFor(role: Role.Peers) {
        return this.waiting.has(role);
    }

    stopWaitingFor(role: Role.Peers) {
        return this.waiting.delete(role);
    }

    startWaitingFor(role: Role.Peers) {
        return this.waiting.add(role);
    }

    getRoleFromSocket(socket: WebSocket) {
        return this.socketToRole.get(socket);
    }

    addRole(role: Role.Peers, socket: WebSocket) {
        this.roleToSocket.set(role, socket);
        this.socketToRole.set(socket, role);

        socket.send(Message.serialise(Connect.Confirm));

        this.activeRoles.add(role);

        socket.onmessage = this.receive(role).bind(this);
        socket.onclose = this.close(role).bind(this);

        // Send all queued messages...
        var queuedMessage = this.sendQueue[role].shift()
        while (queuedMessage) {
            this.sendMessage(role, queuedMessage);
            queuedMessage = this.sendQueue[role].shift()
        }
    }

    // ====================
    // Refinement functions
    // ====================

    updateVarMap(payload: any) {
        for (const [k, v] of Object.entries(payload)) {
            this.varMap.set(k, v);
        }
        this.initRecExprs();
    }

    initRecExprs() {
        if (!this.varMap.has("try")) {
            this.varMap.set("try", 0);
        }
    }

    updateRecExprs(id: string) {
        if (this.recExprMap.has(id)) {
            const [recExprName, recExprUpdater] = this.recExprMap.get(id)!;
            recExprUpdater();
            if (recExprName === "") {
                return;
            }
            const recExprId = `recExpr:${recExprName}`
            if (!this.checkRefinement(recExprId)) {
                this.cancel(`The refinement on recursive expression ${recExprName} failed when updating.`)
            }
        }
    }

    checkRefinement(id: string) {
        let refinement;
        if (this.refMap.has(id)) {
            refinement = this.refMap.get(id);
        }
        return refinement === undefined || refinement();
    }

    // ===================
    // Transition function
    // ===================

    next(state: State.Type) {
        switch (state.type) {
            case 'Send':
                return state.performSend(this.next, this.cancel, this.send);
            case 'Receive':
                return state.prepareReceive(this.next, this.cancel, this.registerMessageHandler);
            case 'Terminal':
                return;
        }
    }

    // ===============
    // Channel methods
    // ===============

    send(to: Role.Peers, label: string, payload: any, fromState: string, from: Role.All = Role.Self) {
        const message: Message.Channel = { role: from, label, payload, fromState };
        if (!this.activeRoles.has(to)) {
            this.waiting.add(to);
        }
        this.sendMessage(to, message);
    }

    sendMessage(to: Role.Peers, message: Message.Channel) {
        const onError = (error?: Error) => {
            if (error !== undefined) {
                // Only flag an error if the recipient is meant to be active,
                // and the message cannot be sent.
                if (this.activeRoles.has(to)) {
                    throw new Error(`Cannot send to role: ${to}`);
                }
            }
        };
        const { role, label, payload, fromState } = message;
        if (this.roleToSocket.has(to)) {
            this.updateVarMap(payload)
            const payloadKeys = Object.keys(payload).join(",");
            const id = `${role}>${label}>${payloadKeys}>${fromState}>${to}`;
            if (!this.checkRefinement(id)) {
                this.cancel(`The refinement on the interaction ${id} failed`);
            } else {
                this.updateRecExprs(id);
                const messageStr = Message.serialise<Message.Channel>(message);
                this.roleToSocket.get(to)?.send(messageStr, onError);
            }
        } else {
            this.sendQueue[to].push(message);
        }
    }

    receive(from: Role.Peers) {
        return ({ data: messageData }: WebSocketMessage) => {
            const { role, label, payload, fromState } = Message.deserialise<Message.Channel>(messageData);
            if (role !== Role.Self) {
                // Route message
                this.send(role, label, payload, fromState, from);
            } else {
                const delayedUpdate = () => {
                    this.updateVarMap(payload);
                    const payloadKeys = Object.keys(payload).join(",");
                    const id = `${from}>${label}>${payloadKeys}>${fromState}>${role}`;
                    if (!this.checkRefinement(id)) {
                        this.cancel(`The refinement on the interaction ${id} failed`);
                    }
                    this.updateRecExprs(id);
                };
                const handler = this.handlerQueue[from].shift();
                if (handler !== undefined) {
                    delayedUpdate();
                    handler(messageData);
                } else {
                    this.messageQueue[from].push([messageData, delayedUpdate]);
                }
            }
        }
    }

    registerMessageHandler(from: Role.Peers, messageHandler: MessageHandler) {
        const data = this.messageQueue[from].shift();
        let messageData: any;
        let delayedUpdate: (() => void) | undefined;
        if (data !== undefined) {
            [messageData, delayedUpdate] = data;
        }
        if (messageData !== undefined && delayedUpdate !== undefined) {
            delayedUpdate();
            messageHandler(messageData);
        } else {
            this.handlerQueue[from].push(messageHandler);
        }
    }

    // ============
    // Cancellation
    // ============

    cancel(reason?: any) {
        // Deactivate all roles as the session is cancelled.
        this.activeRoles.clear();

        // Emit cancellation to other roles.
        const message = Cancellation.toChannel(Role.Self, reason);
        this.roleToSocket.forEach((socket) => {
            socket.removeAllListeners();
            socket.close(Cancellation.Emit.LOGICAL_ERROR, JSON.stringify(message));
        });

        // Execute user-defined cancellation handler.
        this.cancellation(this.id, Role.Self, reason);
    }

    propagateCancellation(cancelledRole: Role.Peers, reason?: any) {
        // Deactivate all roles as the session is cancelled.
        this.activeRoles.clear();

        // Emit cancellation to other roles.
        const message = Cancellation.toChannel(cancelledRole, reason);
        this.roleToSocket.forEach((socket, role) => {
            if (role !== cancelledRole) {
                socket.removeAllListeners();
                socket.close(Cancellation.Emit.LOGICAL_ERROR, JSON.stringify(message));
            }
        });

        // Execute user-defined cancellation handler.
        this.cancellation(this.id, cancelledRole, reason);
    }

    close(role: Role.Peers) {
        return ({ target: socket, code, reason }: WebSocket.CloseEvent) => {
            this.activeRoles.delete(role);
            if (this.activeRoles.size === 0) {
                this.removeSession(this);
            }
            switch (code) {
                case Cancellation.Receive.NORMAL: {
                    // Unsubscribe from socket events.
                    socket.removeAllListeners();
                    return;
                }
                case Cancellation.Receive.CLIENT_BROWSER_CLOSED: {
                    // Client closed their browser
                    this.propagateCancellation(role, 'browser disconnected');
                    return;
                }
                case Cancellation.Receive.LOGICAL_ERROR: {
                    // Client has logical error
                    this.propagateCancellation(role, reason);
                    return;
                }
                default: {
                    // Unsupported code
                    this.propagateCancellation(role, reason);
                    return;
                }
            }
        }
    }

}