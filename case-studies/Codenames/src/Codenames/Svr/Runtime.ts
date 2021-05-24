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

type ConnectionContext = [Set<Role.Peers>, Partial<RoleToSocket>, Map<WebSocket, Role.Peers>];

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

// Factory function to create a new connection context to keep track
// of pending connections before instantiating a session.
const makeNewContext = (): ConnectionContext => {
    // Keep track of participants that have yet to join.
    const waiting: Set<Role.Peers> = new Set([Role.Peers.FO1, Role.Peers.SM2, Role.Peers.SM1, Role.Peers.FO2]);

    // Keep track of mapping between role and WebSocket.
    const roleToSocket: Partial<RoleToSocket> = {
        [Role.Peers.FO1]: undefined, [Role.Peers.SM2]: undefined, [Role.Peers.SM1]: undefined, [Role.Peers.FO2]: undefined,
    };
    const socketToRole = new Map<WebSocket, Role.Peers>();

    return [waiting, roleToSocket, socketToRole];
};

export class Svr {
    constructor(wss: WebSocket.Server,
        cancellation: Cancellation.Handler<string>,
        initialise: StateInitialiser<string>,
        generateID: () => string = uuidv1) {
        let connectionContexts: ConnectionContext[] = [
            makeNewContext(),
        ];

        // Handle explicit cancellation during the join phase.
        const onClose = ({ target: socket }: WebSocket.CloseEvent) => {
            socket.removeAllListeners();

            // Wait for the role again - guaranteed to occur in map by construction.
            for (const [waiting, _, socketToRole] of connectionContexts) {
                const role = socketToRole.get(socket);
                if (role !== undefined) {
                    waiting.add(role);
                    return;
                }
            }
        }

        // Handle connection invitation message from participant.
        const onSubscribe = (event: WebSocketMessage) => {
            const { data, target: socket } = event;
            const { connect: role } = Message.deserialise<Connect.Request>(data);

            for (let i = 0; i < connectionContexts.length; ++i) {
                const [waiting, roleToSocket, socketToRole] = connectionContexts[i];
                if (waiting.has(role)) {
                    // Update role-WebSocket mapping.
                    roleToSocket[role] = socket;
                    socketToRole.set(socket, role);
                    waiting.delete(role);

                    if (waiting.size === 0) {
                        connectionContexts = connectionContexts.filter((_, j) => j !== i);

                        // Execute protocol when all participants have joined.
                        new Session(
                            generateID(),
                            wss,
                            roleToSocket as RoleToSocket,
                            cancellation,
                            initialise
                        );

                        if (connectionContexts.length === 0) {
                            connectionContexts.push(makeNewContext());
                        }
                    }
                    return;
                }
            }

            // Role occupied in all existing connection contexts;
            // Create new connection context.
            const context = makeNewContext();
            const [waiting, roleToSocket, socketToRole] = context;

            // Update role-WebSocket mapping.
            roleToSocket[role] = socket;
            socketToRole.set(socket, role);
            waiting.delete(role);

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
    private wss: WebSocket.Server;
    private roleToSocket: RoleToSocket;
    private cancellation: Cancellation.Handler<string>;
    private initialise: StateInitialiser<string>;

    private activeRoles: Set<Role.Peers>;
    private messageQueue: RoleToMessageQueue;
    private handlerQueue: RoleToHandlerQueue;

    private varMap: Map<string, any>;
    private refMap: Map<string, () => boolean>;
    private recExprMap: Map<string, [string, () => void]>;

    constructor(id: string,
        wss: WebSocket.Server,
        roleToSocket: RoleToSocket,
        cancellation: Cancellation.Handler<string>,
        initialise: StateInitialiser<string>) {
        this.id = id;
        this.wss = wss;
        this.roleToSocket = roleToSocket;
        this.cancellation = cancellation;
        this.initialise = initialise;

        this.varMap = new Map<string, any>();
        this.refMap = new Map<string, () => boolean>(
            [
                ["Svr>lose>ignore3>S16>FO1", () => (this.varMap.get('numCodenames') - this.varMap.get('numPicks1') - this.varMap.get('numPicks2') <= 18)],
                ["Svr>win>ignore4>S16>FO1", () => (this.varMap.get('numCodenames') - this.varMap.get('numPicks1') - this.varMap.get('numPicks2') <= 18)],
                ["Svr>lose>ignore5>S35>FO1", () => (this.varMap.get('numCodenames') - this.varMap.get('numPicks1') <= 17)],
                ["Svr>win>ignore6>S35>FO1", () => (this.varMap.get('numCodenames') - this.varMap.get('numPicks1') <= 17)],
                ["FO1>finishedPicking>ignore1>S3>Svr", () => (this.varMap.get('numPicks1') > 0)],
                ["SM2>clue>clue2,numAgents2>S5>FO2", () => (this.varMap.get('numAgents2') >= 0 && this.varMap.get('numAgents2') <= this.varMap.get('numCodenames'))],
                ["SM1>clue>clue,numAgents>S1>FO1", () => (this.varMap.get('numAgents') >= 0 && this.varMap.get('numAgents') <= this.varMap.get('numCodenames'))],
                ["FO2>finishedPicking>ignore2>S6>Svr", () => (this.varMap.get('numPicks2') > 0)],



                ["recExpr:numCodenames", () => this.varMap.get('numCodenames') >= 0],
            ]
        );
        this.recExprMap = new Map<string, [string, () => void]>(
            [
                ["Svr>givePoints>p14,p24>S20>FO2", ["numPicks2", () => {

                    this.varMap.set("numPicks2", this.varMap.get('numPicks2') + 1);

                }]],
                ["Svr>givePoints>p18,p28>S39>FO1", ["numPicks1", () => {

                    this.varMap.set("numPicks1", this.varMap.get('numPicks1') + 1);

                    this.varMap.delete("numPicks2");
                }]],
                ["FO2>finishedPicking>>S11>SM1", ["numCodenames", () => {

                    this.varMap.set("numCodenames", this.varMap.get('numCodenames') - this.varMap.get('numPicks1') - this.varMap.get('numPicks2'));

                    this.varMap.delete("numPicks1");
                    this.varMap.delete("numPicks2");
                }]],
            ]
        );

        // Keep track of active participants in the session.
        this.activeRoles = new Set([Role.Peers.FO1, Role.Peers.SM2, Role.Peers.SM1, Role.Peers.FO2]);

        // Bind `this` instances to callbacks
        this.next = this.next.bind(this);
        this.cancel = this.cancel.bind(this);
        this.send = this.send.bind(this);
        this.registerMessageHandler = this.registerMessageHandler.bind(this);

        // Bind event listeners to WebSockets
        Object.values(Role.Peers).forEach(role => {
            const socket = this.roleToSocket[role];

            // Bind handlers for message receive and socket close.
            socket.onmessage = this.receive(role).bind(this);
            socket.onclose = this.close(role).bind(this);
        });

        // Initialise queues for receiving.
        this.messageQueue = {
            [Role.Peers.FO1]: [], [Role.Peers.SM2]: [], [Role.Peers.SM1]: [], [Role.Peers.FO2]: [],
        };

        this.handlerQueue = {
            [Role.Peers.FO1]: [], [Role.Peers.SM2]: [], [Role.Peers.SM1]: [], [Role.Peers.FO2]: [],
        };

        // Notify all roles for confirming the connection.
        Object.values(this.roleToSocket).forEach(socket => {
            socket.send(Message.serialise(Connect.Confirm));
        });

        this.next(initialise(this.id));
    }

    // ====================
    // Refinement functions
    // ====================

    updateVarMap(payload: any) {
        for (const [k, v] of Object.entries(payload)) {
            this.varMap.set(k, v);
        }
        this.initRecExprs();
        //console.log(this.varMap)
    }

    initRecExprs() {
        if (!this.varMap.has("numPicks2")) {
            this.varMap.set("numPicks2", 0);
        }
        if (!this.varMap.has("numPicks1")) {
            this.varMap.set("numPicks1", 0);
        }
        if (!this.varMap.has("numCodenames")) {
            this.varMap.set("numCodenames", 25);
            if (!this.checkRefinement("recExpr:numCodenames")) {
                this.cancel("Refinement on initialisation rec expr failed!");
            }
        }
        // what to do when initialising one rec expr means another one should be initialised too??
    }

    updateRecExprs(id: string) {
        //console.log("update")
        if (this.recExprMap.has(id)) {
            const [recExprName, recExprUpdater] = this.recExprMap.get(id)!;
            recExprUpdater();
            if (recExprName === "") {
                return;
            }
            const recExprId = `recExpr:${recExprName}`
            if (!this.checkRefinement(recExprId)) {
                this.cancel("When updating rec expr, refinement failed.")
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
        const message = Message.serialise<Message.Channel>({ role: from, label, payload, fromState });
        const onError = (error?: Error) => {
            if (error !== undefined) {
                // Only flag an error if the recipient is meant to be active,
                // and the message cannot be sent.
                if (this.activeRoles.has(to)) {
                    throw new Error(`Cannot send to role: ${to}`);
                }
            }
        };
        this.updateVarMap(payload)
        const payloadKeys = Object.keys(payload).join(",");
        const id = `${from}>${label}>${payloadKeys}>${fromState}>${to}`;
        if (!this.checkRefinement(id)) {
            this.cancel("Server-side: Refinement failed.... " + id)
        } else {
            this.updateRecExprs(id);
            this.roleToSocket[to].send(message, onError);
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
                        this.cancel("Server-side: Refinement failed222....")
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
        Object.values(this.roleToSocket)
            .forEach(socket => {
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
        Object.entries(this.roleToSocket)
            .filter(([role, _]) => role !== cancelledRole)
            .forEach(([_, socket]) => {
                socket.removeAllListeners();
                socket.close(Cancellation.Emit.LOGICAL_ERROR, JSON.stringify(message));
            });

        // Execute user-defined cancellation handler.
        this.cancellation(this.id, cancelledRole, reason);
    }

    close(role: Role.Peers) {
        return ({ target: socket, code, reason }: WebSocket.CloseEvent) => {
            this.activeRoles.delete(role);
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