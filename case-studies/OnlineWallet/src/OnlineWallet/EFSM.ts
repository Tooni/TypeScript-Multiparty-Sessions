import {
    FromPromise,
    MaybePromise,
} from "./Utility";

import {
    Cancellation,
} from "./Cancellation";

import {
    StateTransitionHandler,
    SendStateHandler,
    MessageHandler,
    ReceiveStateHandler,
} from "./Runtime";

export namespace Role {
    type Self = "Wallet";

    // Constant value for value comparisons
    export const Self: Self = "Wallet";

    export enum Peers {
        Vendor = "Vendor", Customer = "Customer",
    };

    export type All = Self | Peers;

    export type PeersToMapped<Value> = {
        [Role in Peers]: Value
    };
};

export namespace Message {

    export interface S5_login_ok_payload {
    }
    export interface S5_login_ok {
        label: "login_ok",
        payload: S5_login_ok_payload
    };

    export type S5 = | S5_login_ok;

    export interface S3_login_retry_payload {
        msg: string,
    }
    export interface S3_login_retry {
        label: "login_retry",
        payload: S3_login_retry_payload
    };
    export interface S3_login_ok_payload {
    }
    export interface S3_login_ok {
        label: "login_ok",
        payload: S3_login_ok_payload
    };
    export interface S3_login_denied_payload {
        msg: string,
    }
    export interface S3_login_denied {
        label: "login_denied",
        payload: S3_login_denied_payload
    };

    export type S3 = | S3_login_retry | S3_login_ok | S3_login_denied;

    export interface S6_authorise_payload {
    }
    export interface S6_authorise {
        label: "authorise",
        payload: S6_authorise_payload
    };
    export interface S6_reject_payload {
    }
    export interface S6_reject {
        label: "reject",
        payload: S6_reject_payload
    };

    export type S6 = | S6_authorise | S6_reject;

    export interface S0_login_payload {
        account: number,
    }
    export interface S0_login {
        label: "login",
        payload: S0_login_payload
    };

    export type S0 = | S0_login;

    export interface S2_pin_payload {
        pin: number,
    }
    export interface S2_pin {
        label: "pin",
        payload: S2_pin_payload
    };

    export type S2 = | S2_pin;


    export interface Channel {
        role: Role.All;
        label: string;
        payload: any;
        fromState: string;
    };

    export const serialise = <T>(obj: T) => JSON.stringify(obj);
    export const deserialise = <T>(message: any) => JSON.parse(message) as T;

};

export namespace Handler {
    export type S5 =
        MaybePromise<
            | ["login_ok", Message.S5_login_ok['payload'], State.S6, Role.Peers.Vendor]

        >;
    export type S3 =
        MaybePromise<
            | ["login_retry", Message.S3_login_retry['payload'], State.S0, Role.Peers.Customer]
            | ["login_ok", Message.S3_login_ok['payload'], State.S5, Role.Peers.Customer]
            | ["login_denied", Message.S3_login_denied['payload'], State.S8, Role.Peers.Customer]

        >;

    export interface S6 {
        "authorise": (Next: typeof Factory.S8, payload: Message.S6_authorise['payload']) => MaybePromise<State.S8>,
        "reject": (Next: typeof Factory.S8, payload: Message.S6_reject['payload']) => MaybePromise<State.S8>,

    };
    export interface S0 {
        "login": (Next: typeof Factory.S2, payload: Message.S0_login['payload']) => MaybePromise<State.S2>,

    };
    export interface S2 {
        "pin": (Next: typeof Factory.S3, payload: Message.S2_pin['payload']) => MaybePromise<State.S3>,

    };

};

export namespace State {

    interface ISend {
        readonly type: 'Send';
        performSend(next: StateTransitionHandler, cancel: Cancellation, send: SendStateHandler): void;
    };

    interface IReceive {
        readonly type: 'Receive';
        prepareReceive(next: StateTransitionHandler, cancel: Cancellation, register: ReceiveStateHandler): void;
    };

    interface ITerminal {
        readonly type: 'Terminal';
    };

    export type Type = ISend | IReceive | ITerminal;

    export class S5 implements ISend {
        readonly type: 'Send' = 'Send';
        constructor(public handler: Handler.S5) { }

        performSend(next: StateTransitionHandler, cancel: Cancellation, send: SendStateHandler) {
            const thunk = ([label, payload, successor, role]: FromPromise<Handler.S5>) => {
                send(role, label, payload, S5.name);
                return next(successor);
            };

            if (this.handler instanceof Promise) {
                this.handler.then(thunk).catch(cancel);
            } else {
                try {
                    thunk(this.handler);
                } catch (error) {
                    cancel(error);
                }
            }
        }
    };
    export class S3 implements ISend {
        readonly type: 'Send' = 'Send';
        constructor(public handler: Handler.S3) { }

        performSend(next: StateTransitionHandler, cancel: Cancellation, send: SendStateHandler) {
            const thunk = ([label, payload, successor, role]: FromPromise<Handler.S3>) => {
                send(role, label, payload, S3.name);
                return next(successor);
            };

            if (this.handler instanceof Promise) {
                this.handler.then(thunk).catch(cancel);
            } else {
                try {
                    thunk(this.handler);
                } catch (error) {
                    cancel(error);
                }
            }
        }
    };


    export class S6 implements IReceive {
        readonly type: 'Receive' = 'Receive';
        constructor(public handler: Handler.S6) { }

        prepareReceive(next: StateTransitionHandler, cancel: Cancellation, register: ReceiveStateHandler) {
            const onReceive = (message: any) => {
                const parsed = JSON.parse(message) as Message.S6;
                switch (parsed.label) {
                    case "authorise": {
                        try {
                            const successor = this.handler[parsed.label](Factory.S8, parsed.payload);
                            if (successor instanceof Promise) {
                                successor.then(next).catch(cancel);
                            } else {
                                next(successor);
                            }
                        } catch (error) {
                            cancel(error);
                        }
                        return;
                    }
                    case "reject": {
                        try {
                            const successor = this.handler[parsed.label](Factory.S8, parsed.payload);
                            if (successor instanceof Promise) {
                                successor.then(next).catch(cancel);
                            } else {
                                next(successor);
                            }
                        } catch (error) {
                            cancel(error);
                        }
                        return;
                    }

                }
            };

            register(Role.Peers.Customer, onReceive);
        }
    };
    export class S0 implements IReceive {
        readonly type: 'Receive' = 'Receive';
        constructor(public handler: Handler.S0) { }

        prepareReceive(next: StateTransitionHandler, cancel: Cancellation, register: ReceiveStateHandler) {
            const onReceive = (message: any) => {
                const parsed = JSON.parse(message) as Message.S0;
                switch (parsed.label) {
                    case "login": {
                        try {
                            const successor = this.handler[parsed.label](Factory.S2, parsed.payload);
                            if (successor instanceof Promise) {
                                successor.then(next).catch(cancel);
                            } else {
                                next(successor);
                            }
                        } catch (error) {
                            cancel(error);
                        }
                        return;
                    }

                }
            };

            register(Role.Peers.Customer, onReceive);
        }
    };
    export class S2 implements IReceive {
        readonly type: 'Receive' = 'Receive';
        constructor(public handler: Handler.S2) { }

        prepareReceive(next: StateTransitionHandler, cancel: Cancellation, register: ReceiveStateHandler) {
            const onReceive = (message: any) => {
                const parsed = JSON.parse(message) as Message.S2;
                switch (parsed.label) {
                    case "pin": {
                        try {
                            const successor = this.handler[parsed.label](Factory.S3, parsed.payload);
                            if (successor instanceof Promise) {
                                successor.then(next).catch(cancel);
                            } else {
                                next(successor);
                            }
                        } catch (error) {
                            cancel(error);
                        }
                        return;
                    }

                }
            };

            register(Role.Peers.Customer, onReceive);
        }
    };



    export class S8 implements ITerminal {
        readonly type: 'Terminal' = 'Terminal';
    };


};

export namespace Factory {


    type S5_login_ok =
        | [Message.S5_login_ok['payload'], (Next: typeof S6) => State.S6]
        | [Message.S5_login_ok['payload'], State.S6]
        ;

    function S5_login_ok(
        payload: Message.S5_login_ok['payload'],
        generateSuccessor: (Next: typeof S6) => State.S6
    ): State.S5;
    function S5_login_ok(
        payload: Message.S5_login_ok['payload'],
        succ: State.S6
    ): State.S5;
    function S5_login_ok(...args: S5_login_ok) {
        if (typeof args[1] === 'function') {
            const [payload, generateSuccessor] = args;
            const successor = generateSuccessor(S6);
            return new State.S5(["login_ok", payload, successor, Role.Peers.Vendor]);
        } else {
            const [payload, successor] = args;
            return new State.S5(["login_ok", payload, successor, Role.Peers.Vendor]);
        }
    }


    export const S5 = {
        login_ok: S5_login_ok,

    };
    type S3_login_retry =
        | [Message.S3_login_retry['payload'], (Next: typeof S0) => State.S0]
        | [Message.S3_login_retry['payload'], State.S0]
        ;

    function S3_login_retry(
        payload: Message.S3_login_retry['payload'],
        generateSuccessor: (Next: typeof S0) => State.S0
    ): State.S3;
    function S3_login_retry(
        payload: Message.S3_login_retry['payload'],
        succ: State.S0
    ): State.S3;
    function S3_login_retry(...args: S3_login_retry) {
        if (typeof args[1] === 'function') {
            const [payload, generateSuccessor] = args;
            const successor = generateSuccessor(S0);
            return new State.S3(["login_retry", payload, successor, Role.Peers.Customer]);
        } else {
            const [payload, successor] = args;
            return new State.S3(["login_retry", payload, successor, Role.Peers.Customer]);
        }
    }

    type S3_login_ok =
        | [Message.S3_login_ok['payload'], (Next: typeof S5) => State.S5]
        | [Message.S3_login_ok['payload'], State.S5]
        ;

    function S3_login_ok(
        payload: Message.S3_login_ok['payload'],
        generateSuccessor: (Next: typeof S5) => State.S5
    ): State.S3;
    function S3_login_ok(
        payload: Message.S3_login_ok['payload'],
        succ: State.S5
    ): State.S3;
    function S3_login_ok(...args: S3_login_ok) {
        if (typeof args[1] === 'function') {
            const [payload, generateSuccessor] = args;
            const successor = generateSuccessor(S5);
            return new State.S3(["login_ok", payload, successor, Role.Peers.Customer]);
        } else {
            const [payload, successor] = args;
            return new State.S3(["login_ok", payload, successor, Role.Peers.Customer]);
        }
    }

    type S3_login_denied =
        | [Message.S3_login_denied['payload'], (Next: typeof S8) => State.S8]
        | [Message.S3_login_denied['payload'], State.S8]
        ;

    function S3_login_denied(
        payload: Message.S3_login_denied['payload'],
        generateSuccessor: (Next: typeof S8) => State.S8
    ): State.S3;
    function S3_login_denied(
        payload: Message.S3_login_denied['payload'],
        succ: State.S8
    ): State.S3;
    function S3_login_denied(...args: S3_login_denied) {
        if (typeof args[1] === 'function') {
            const [payload, generateSuccessor] = args;
            const successor = generateSuccessor(S8);
            return new State.S3(["login_denied", payload, successor, Role.Peers.Customer]);
        } else {
            const [payload, successor] = args;
            return new State.S3(["login_denied", payload, successor, Role.Peers.Customer]);
        }
    }


    export const S3 = {
        login_retry: S3_login_retry,
        login_ok: S3_login_ok,
        login_denied: S3_login_denied,

    };

    export function S6(handler: Handler.S6) {
        return new State.S6(handler);
    };
    export function S0(handler: Handler.S0) {
        return new State.S0(handler);
    };
    export function S2(handler: Handler.S2) {
        return new State.S2(handler);
    };


    export const Initial = S0;

    export const S8 = () => new State.S8();
    export const Terminal = S8;

};