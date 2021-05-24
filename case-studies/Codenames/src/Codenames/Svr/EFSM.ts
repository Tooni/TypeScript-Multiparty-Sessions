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
    type Self = "Svr";

    // Constant value for value comparisons
    export const Self: Self = "Svr";

    export enum Peers {
        FO1 = "FO1", SM2 = "SM2", SM1 = "SM1", FO2 = "FO2",
    };

    export type All = Self | Peers;

    export type PeersToMapped<Value> = {
        [Role in Peers]: Value
    };
};

export namespace Message {

    export interface S23_win_payload {
    }
    export interface S23_win {
        label: "win",
        payload: S23_win_payload
    };

    export type S23 = | S23_win;

    export interface S31_reveal_payload {
        compromisedAgents5: number,
    }
    export interface S31_reveal {
        label: "reveal",
        payload: S31_reveal_payload
    };

    export type S31 = | S31_reveal;

    export interface S39_givePoints_payload {
        p18: number,
        p28: number,
    }
    export interface S39_givePoints {
        label: "givePoints",
        payload: S39_givePoints_payload
    };

    export type S39 = | S39_givePoints;

    export interface S3_codeAndAgentNames_payload {
        codeNames4: string,
        agentColours2: string,
    }
    export interface S3_codeAndAgentNames {
        label: "codeAndAgentNames",
        payload: S3_codeAndAgentNames_payload
    };

    export type S3 = | S3_codeAndAgentNames;

    export interface S24_win_payload {
    }
    export interface S24_win {
        label: "win",
        payload: S24_win_payload
    };

    export type S24 = | S24_win;

    export interface S35_givePoints_payload {
        p15: number,
        p25: number,
    }
    export interface S35_givePoints {
        label: "givePoints",
        payload: S35_givePoints_payload
    };
    export interface S35_lose_payload {
        ignore5: null,
    }
    export interface S35_lose {
        label: "lose",
        payload: S35_lose_payload
    };
    export interface S35_win_payload {
        ignore6: null,
    }
    export interface S35_win {
        label: "win",
        payload: S35_win_payload
    };

    export type S35 = | S35_givePoints | S35_lose | S35_win;

    export interface S41_lose_payload {
    }
    export interface S41_lose {
        label: "lose",
        payload: S41_lose_payload
    };

    export type S41 = | S41_lose;

    export interface S22_lose_payload {
    }
    export interface S22_lose {
        label: "lose",
        payload: S22_lose_payload
    };

    export type S22 = | S22_lose;

    export interface S28_lose_payload {
    }
    export interface S28_lose {
        label: "lose",
        payload: S28_lose_payload
    };

    export type S28 = | S28_lose;

    export interface S16_givePoints_payload {
        p11: number,
        p21: number,
    }
    export interface S16_givePoints {
        label: "givePoints",
        payload: S16_givePoints_payload
    };
    export interface S16_lose_payload {
        ignore3: null,
    }
    export interface S16_lose {
        label: "lose",
        payload: S16_lose_payload
    };
    export interface S16_win_payload {
        ignore4: null,
    }
    export interface S16_win {
        label: "win",
        payload: S16_win_payload
    };

    export type S16 = | S16_givePoints | S16_lose | S16_win;

    export interface S45_win_payload {
    }
    export interface S45_win {
        label: "win",
        payload: S45_win_payload
    };

    export type S45 = | S45_win;

    export interface S15_reveal_payload {
        compromisedAgents4: number,
    }
    export interface S15_reveal {
        label: "reveal",
        payload: S15_reveal_payload
    };

    export type S15 = | S15_reveal;

    export interface S27_win_payload {
    }
    export interface S27_win {
        label: "win",
        payload: S27_win_payload
    };

    export type S27 = | S27_win;

    export interface S12_reveal_payload {
        compromisedAgents1: number,
    }
    export interface S12_reveal {
        label: "reveal",
        payload: S12_reveal_payload
    };

    export type S12 = | S12_reveal;

    export interface S0_codeNames_payload {
        codeNames1: string,
    }
    export interface S0_codeNames {
        label: "codeNames",
        payload: S0_codeNames_payload
    };

    export type S0 = | S0_codeNames;

    export interface S19_givePoints_payload {
        p13: number,
        p23: number,
    }
    export interface S19_givePoints {
        label: "givePoints",
        payload: S19_givePoints_payload
    };

    export type S19 = | S19_givePoints;

    export interface S38_givePoints_payload {
        p17: number,
        p27: number,
    }
    export interface S38_givePoints {
        label: "givePoints",
        payload: S38_givePoints_payload
    };

    export type S38 = | S38_givePoints;

    export interface S33_reveal_payload {
        compromisedAgents7: number,
    }
    export interface S33_reveal {
        label: "reveal",
        payload: S33_reveal_payload
    };

    export type S33 = | S33_reveal;

    export interface S43_win_payload {
    }
    export interface S43_win {
        label: "win",
        payload: S43_win_payload
    };

    export type S43 = | S43_win;

    export interface S18_givePoints_payload {
        p12: number,
        p22: number,
    }
    export interface S18_givePoints {
        label: "givePoints",
        payload: S18_givePoints_payload
    };

    export type S18 = | S18_givePoints;

    export interface S37_givePoints_payload {
        p16: number,
        p26: number,
    }
    export interface S37_givePoints {
        label: "givePoints",
        payload: S37_givePoints_payload
    };

    export type S37 = | S37_givePoints;

    export interface S1_codeAndAgentNames_payload {
        codeNames2: string,
        agentColours1: string,
    }
    export interface S1_codeAndAgentNames {
        label: "codeAndAgentNames",
        payload: S1_codeAndAgentNames_payload
    };

    export type S1 = | S1_codeAndAgentNames;

    export interface S2_codeNames_payload {
        codeNames3: string,
    }
    export interface S2_codeNames {
        label: "codeNames",
        payload: S2_codeNames_payload
    };

    export type S2 = | S2_codeNames;

    export interface S14_reveal_payload {
        compromisedAgents3: number,
    }
    export interface S14_reveal {
        label: "reveal",
        payload: S14_reveal_payload
    };

    export type S14 = | S14_reveal;

    export interface S29_lose_payload {
    }
    export interface S29_lose {
        label: "lose",
        payload: S29_lose_payload
    };

    export type S29 = | S29_lose;

    export interface S32_reveal_payload {
        compromisedAgents6: number,
    }
    export interface S32_reveal {
        label: "reveal",
        payload: S32_reveal_payload
    };

    export type S32 = | S32_reveal;

    export interface S42_win_payload {
    }
    export interface S42_win {
        label: "win",
        payload: S42_win_payload
    };

    export type S42 = | S42_win;

    export interface S47_lose_payload {
    }
    export interface S47_lose {
        label: "lose",
        payload: S47_lose_payload
    };

    export type S47 = | S47_lose;

    export interface S20_givePoints_payload {
        p14: number,
        p24: number,
    }
    export interface S20_givePoints {
        label: "givePoints",
        payload: S20_givePoints_payload
    };

    export type S20 = | S20_givePoints;

    export interface S46_lose_payload {
    }
    export interface S46_lose {
        label: "lose",
        payload: S46_lose_payload
    };

    export type S46 = | S46_lose;

    export interface S13_reveal_payload {
        compromisedAgents2: number,
    }
    export interface S13_reveal {
        label: "reveal",
        payload: S13_reveal_payload
    };

    export type S13 = | S13_reveal;

    export interface S34_reveal_payload {
        compromisedAgents8: number,
    }
    export interface S34_reveal {
        label: "reveal",
        payload: S34_reveal_payload
    };

    export type S34 = | S34_reveal;

    export interface S4_pick_payload {
        codeName8: string,
    }
    export interface S4_pick {
        label: "pick",
        payload: S4_pick_payload
    };
    export interface S4_finishedPicking_payload {
        ignore1: null,
    }
    export interface S4_finishedPicking {
        label: "finishedPicking",
        payload: S4_finishedPicking_payload
    };

    export type S4 = | S4_pick | S4_finishedPicking;

    export interface S8_pick_payload {
        codeName4: string,
    }
    export interface S8_pick {
        label: "pick",
        payload: S8_pick_payload
    };
    export interface S8_finishedPicking_payload {
        ignore2: null,
    }
    export interface S8_finishedPicking {
        label: "finishedPicking",
        payload: S8_finishedPicking_payload
    };

    export type S8 = | S8_pick | S8_finishedPicking;


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
    export type S23 =
        MaybePromise<
            | ["win", Message.S23_win['payload'], State.S24, Role.Peers.FO2]

        >;
    export type S31 =
        MaybePromise<
            | ["reveal", Message.S31_reveal['payload'], State.S32, Role.Peers.FO2]

        >;
    export type S39 =
        MaybePromise<
            | ["givePoints", Message.S39_givePoints['payload'], State.S4, Role.Peers.FO1]

        >;
    export type S3 =
        MaybePromise<
            | ["codeAndAgentNames", Message.S3_codeAndAgentNames['payload'], State.S4, Role.Peers.SM1]

        >;
    export type S24 =
        MaybePromise<
            | ["win", Message.S24_win['payload'], State.S25, Role.Peers.SM2]

        >;
    export type S35 =
        MaybePromise<
            | ["givePoints", Message.S35_givePoints['payload'], State.S37, Role.Peers.SM2]
            | ["lose", Message.S35_lose['payload'], State.S41, Role.Peers.FO1]
            | ["win", Message.S35_win['payload'], State.S45, Role.Peers.FO1]

        >;
    export type S41 =
        MaybePromise<
            | ["lose", Message.S41_lose['payload'], State.S42, Role.Peers.SM1]

        >;
    export type S22 =
        MaybePromise<
            | ["lose", Message.S22_lose['payload'], State.S23, Role.Peers.SM1]

        >;
    export type S28 =
        MaybePromise<
            | ["lose", Message.S28_lose['payload'], State.S29, Role.Peers.FO2]

        >;
    export type S16 =
        MaybePromise<
            | ["givePoints", Message.S16_givePoints['payload'], State.S18, Role.Peers.SM1]
            | ["lose", Message.S16_lose['payload'], State.S22, Role.Peers.FO1]
            | ["win", Message.S16_win['payload'], State.S27, Role.Peers.FO1]

        >;
    export type S45 =
        MaybePromise<
            | ["win", Message.S45_win['payload'], State.S46, Role.Peers.SM1]

        >;
    export type S15 =
        MaybePromise<
            | ["reveal", Message.S15_reveal['payload'], State.S16, Role.Peers.SM1]

        >;
    export type S27 =
        MaybePromise<
            | ["win", Message.S27_win['payload'], State.S28, Role.Peers.SM1]

        >;
    export type S12 =
        MaybePromise<
            | ["reveal", Message.S12_reveal['payload'], State.S13, Role.Peers.FO2]

        >;
    export type S0 =
        MaybePromise<
            | ["codeNames", Message.S0_codeNames['payload'], State.S1, Role.Peers.FO2]

        >;
    export type S19 =
        MaybePromise<
            | ["givePoints", Message.S19_givePoints['payload'], State.S20, Role.Peers.SM2]

        >;
    export type S38 =
        MaybePromise<
            | ["givePoints", Message.S38_givePoints['payload'], State.S39, Role.Peers.SM1]

        >;
    export type S33 =
        MaybePromise<
            | ["reveal", Message.S33_reveal['payload'], State.S34, Role.Peers.FO1]

        >;
    export type S43 =
        MaybePromise<
            | ["win", Message.S43_win['payload'], State.S25, Role.Peers.SM2]

        >;
    export type S18 =
        MaybePromise<
            | ["givePoints", Message.S18_givePoints['payload'], State.S19, Role.Peers.FO1]

        >;
    export type S37 =
        MaybePromise<
            | ["givePoints", Message.S37_givePoints['payload'], State.S38, Role.Peers.FO2]

        >;
    export type S1 =
        MaybePromise<
            | ["codeAndAgentNames", Message.S1_codeAndAgentNames['payload'], State.S2, Role.Peers.SM2]

        >;
    export type S2 =
        MaybePromise<
            | ["codeNames", Message.S2_codeNames['payload'], State.S3, Role.Peers.FO1]

        >;
    export type S14 =
        MaybePromise<
            | ["reveal", Message.S14_reveal['payload'], State.S15, Role.Peers.FO1]

        >;
    export type S29 =
        MaybePromise<
            | ["lose", Message.S29_lose['payload'], State.S25, Role.Peers.SM2]

        >;
    export type S32 =
        MaybePromise<
            | ["reveal", Message.S32_reveal['payload'], State.S33, Role.Peers.SM2]

        >;
    export type S42 =
        MaybePromise<
            | ["win", Message.S42_win['payload'], State.S43, Role.Peers.FO2]

        >;
    export type S47 =
        MaybePromise<
            | ["lose", Message.S47_lose['payload'], State.S25, Role.Peers.SM2]

        >;
    export type S20 =
        MaybePromise<
            | ["givePoints", Message.S20_givePoints['payload'], State.S8, Role.Peers.FO2]

        >;
    export type S46 =
        MaybePromise<
            | ["lose", Message.S46_lose['payload'], State.S47, Role.Peers.FO2]

        >;
    export type S13 =
        MaybePromise<
            | ["reveal", Message.S13_reveal['payload'], State.S14, Role.Peers.SM2]

        >;
    export type S34 =
        MaybePromise<
            | ["reveal", Message.S34_reveal['payload'], State.S35, Role.Peers.SM1]

        >;

    export interface S4 {
        "pick": (Next: typeof Factory.S31, payload: Message.S4_pick['payload']) => MaybePromise<State.S31>,
        "finishedPicking": (Next: typeof Factory.S8, payload: Message.S4_finishedPicking['payload']) => MaybePromise<State.S8>,

    };
    export interface S8 {
        "pick": (Next: typeof Factory.S12, payload: Message.S8_pick['payload']) => MaybePromise<State.S12>,
        "finishedPicking": (Next: typeof Factory.S4, payload: Message.S8_finishedPicking['payload']) => MaybePromise<State.S4>,

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

    export class S23 implements ISend {
        readonly type: 'Send' = 'Send';
        constructor(public handler: Handler.S23) { }

        performSend(next: StateTransitionHandler, cancel: Cancellation, send: SendStateHandler) {
            const thunk = ([label, payload, successor, role]: FromPromise<Handler.S23>) => {
                send(role, label, payload, S23.name);
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
    export class S31 implements ISend {
        readonly type: 'Send' = 'Send';
        constructor(public handler: Handler.S31) { }

        performSend(next: StateTransitionHandler, cancel: Cancellation, send: SendStateHandler) {
            const thunk = ([label, payload, successor, role]: FromPromise<Handler.S31>) => {
                send(role, label, payload, S31.name);
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
    export class S39 implements ISend {
        readonly type: 'Send' = 'Send';
        constructor(public handler: Handler.S39) { }

        performSend(next: StateTransitionHandler, cancel: Cancellation, send: SendStateHandler) {
            const thunk = ([label, payload, successor, role]: FromPromise<Handler.S39>) => {
                send(role, label, payload, S39.name);
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
    export class S24 implements ISend {
        readonly type: 'Send' = 'Send';
        constructor(public handler: Handler.S24) { }

        performSend(next: StateTransitionHandler, cancel: Cancellation, send: SendStateHandler) {
            const thunk = ([label, payload, successor, role]: FromPromise<Handler.S24>) => {
                send(role, label, payload, S24.name);
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
    export class S35 implements ISend {
        readonly type: 'Send' = 'Send';
        constructor(public handler: Handler.S35) { }

        performSend(next: StateTransitionHandler, cancel: Cancellation, send: SendStateHandler) {
            const thunk = ([label, payload, successor, role]: FromPromise<Handler.S35>) => {
                send(role, label, payload, S35.name);
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
    export class S41 implements ISend {
        readonly type: 'Send' = 'Send';
        constructor(public handler: Handler.S41) { }

        performSend(next: StateTransitionHandler, cancel: Cancellation, send: SendStateHandler) {
            const thunk = ([label, payload, successor, role]: FromPromise<Handler.S41>) => {
                send(role, label, payload, S41.name);
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
    export class S22 implements ISend {
        readonly type: 'Send' = 'Send';
        constructor(public handler: Handler.S22) { }

        performSend(next: StateTransitionHandler, cancel: Cancellation, send: SendStateHandler) {
            const thunk = ([label, payload, successor, role]: FromPromise<Handler.S22>) => {
                send(role, label, payload, S22.name);
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
    export class S28 implements ISend {
        readonly type: 'Send' = 'Send';
        constructor(public handler: Handler.S28) { }

        performSend(next: StateTransitionHandler, cancel: Cancellation, send: SendStateHandler) {
            const thunk = ([label, payload, successor, role]: FromPromise<Handler.S28>) => {
                send(role, label, payload, S28.name);
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
    export class S16 implements ISend {
        readonly type: 'Send' = 'Send';
        constructor(public handler: Handler.S16) { }

        performSend(next: StateTransitionHandler, cancel: Cancellation, send: SendStateHandler) {
            const thunk = ([label, payload, successor, role]: FromPromise<Handler.S16>) => {
                send(role, label, payload, S16.name);
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
    export class S45 implements ISend {
        readonly type: 'Send' = 'Send';
        constructor(public handler: Handler.S45) { }

        performSend(next: StateTransitionHandler, cancel: Cancellation, send: SendStateHandler) {
            const thunk = ([label, payload, successor, role]: FromPromise<Handler.S45>) => {
                send(role, label, payload, S45.name);
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
    export class S15 implements ISend {
        readonly type: 'Send' = 'Send';
        constructor(public handler: Handler.S15) { }

        performSend(next: StateTransitionHandler, cancel: Cancellation, send: SendStateHandler) {
            const thunk = ([label, payload, successor, role]: FromPromise<Handler.S15>) => {
                send(role, label, payload, S15.name);
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
    export class S27 implements ISend {
        readonly type: 'Send' = 'Send';
        constructor(public handler: Handler.S27) { }

        performSend(next: StateTransitionHandler, cancel: Cancellation, send: SendStateHandler) {
            const thunk = ([label, payload, successor, role]: FromPromise<Handler.S27>) => {
                send(role, label, payload, S27.name);
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
    export class S12 implements ISend {
        readonly type: 'Send' = 'Send';
        constructor(public handler: Handler.S12) { }

        performSend(next: StateTransitionHandler, cancel: Cancellation, send: SendStateHandler) {
            const thunk = ([label, payload, successor, role]: FromPromise<Handler.S12>) => {
                send(role, label, payload, S12.name);
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
    export class S0 implements ISend {
        readonly type: 'Send' = 'Send';
        constructor(public handler: Handler.S0) { }

        performSend(next: StateTransitionHandler, cancel: Cancellation, send: SendStateHandler) {
            const thunk = ([label, payload, successor, role]: FromPromise<Handler.S0>) => {
                send(role, label, payload, S0.name);
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
    export class S19 implements ISend {
        readonly type: 'Send' = 'Send';
        constructor(public handler: Handler.S19) { }

        performSend(next: StateTransitionHandler, cancel: Cancellation, send: SendStateHandler) {
            const thunk = ([label, payload, successor, role]: FromPromise<Handler.S19>) => {
                send(role, label, payload, S19.name);
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
    export class S38 implements ISend {
        readonly type: 'Send' = 'Send';
        constructor(public handler: Handler.S38) { }

        performSend(next: StateTransitionHandler, cancel: Cancellation, send: SendStateHandler) {
            const thunk = ([label, payload, successor, role]: FromPromise<Handler.S38>) => {
                send(role, label, payload, S38.name);
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
    export class S33 implements ISend {
        readonly type: 'Send' = 'Send';
        constructor(public handler: Handler.S33) { }

        performSend(next: StateTransitionHandler, cancel: Cancellation, send: SendStateHandler) {
            const thunk = ([label, payload, successor, role]: FromPromise<Handler.S33>) => {
                send(role, label, payload, S33.name);
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
    export class S43 implements ISend {
        readonly type: 'Send' = 'Send';
        constructor(public handler: Handler.S43) { }

        performSend(next: StateTransitionHandler, cancel: Cancellation, send: SendStateHandler) {
            const thunk = ([label, payload, successor, role]: FromPromise<Handler.S43>) => {
                send(role, label, payload, S43.name);
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
    export class S18 implements ISend {
        readonly type: 'Send' = 'Send';
        constructor(public handler: Handler.S18) { }

        performSend(next: StateTransitionHandler, cancel: Cancellation, send: SendStateHandler) {
            const thunk = ([label, payload, successor, role]: FromPromise<Handler.S18>) => {
                send(role, label, payload, S18.name);
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
    export class S37 implements ISend {
        readonly type: 'Send' = 'Send';
        constructor(public handler: Handler.S37) { }

        performSend(next: StateTransitionHandler, cancel: Cancellation, send: SendStateHandler) {
            const thunk = ([label, payload, successor, role]: FromPromise<Handler.S37>) => {
                send(role, label, payload, S37.name);
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
    export class S1 implements ISend {
        readonly type: 'Send' = 'Send';
        constructor(public handler: Handler.S1) { }

        performSend(next: StateTransitionHandler, cancel: Cancellation, send: SendStateHandler) {
            const thunk = ([label, payload, successor, role]: FromPromise<Handler.S1>) => {
                send(role, label, payload, S1.name);
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
    export class S2 implements ISend {
        readonly type: 'Send' = 'Send';
        constructor(public handler: Handler.S2) { }

        performSend(next: StateTransitionHandler, cancel: Cancellation, send: SendStateHandler) {
            const thunk = ([label, payload, successor, role]: FromPromise<Handler.S2>) => {
                send(role, label, payload, S2.name);
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
    export class S14 implements ISend {
        readonly type: 'Send' = 'Send';
        constructor(public handler: Handler.S14) { }

        performSend(next: StateTransitionHandler, cancel: Cancellation, send: SendStateHandler) {
            const thunk = ([label, payload, successor, role]: FromPromise<Handler.S14>) => {
                send(role, label, payload, S14.name);
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
    export class S29 implements ISend {
        readonly type: 'Send' = 'Send';
        constructor(public handler: Handler.S29) { }

        performSend(next: StateTransitionHandler, cancel: Cancellation, send: SendStateHandler) {
            const thunk = ([label, payload, successor, role]: FromPromise<Handler.S29>) => {
                send(role, label, payload, S29.name);
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
    export class S32 implements ISend {
        readonly type: 'Send' = 'Send';
        constructor(public handler: Handler.S32) { }

        performSend(next: StateTransitionHandler, cancel: Cancellation, send: SendStateHandler) {
            const thunk = ([label, payload, successor, role]: FromPromise<Handler.S32>) => {
                send(role, label, payload, S32.name);
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
    export class S42 implements ISend {
        readonly type: 'Send' = 'Send';
        constructor(public handler: Handler.S42) { }

        performSend(next: StateTransitionHandler, cancel: Cancellation, send: SendStateHandler) {
            const thunk = ([label, payload, successor, role]: FromPromise<Handler.S42>) => {
                send(role, label, payload, S42.name);
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
    export class S47 implements ISend {
        readonly type: 'Send' = 'Send';
        constructor(public handler: Handler.S47) { }

        performSend(next: StateTransitionHandler, cancel: Cancellation, send: SendStateHandler) {
            const thunk = ([label, payload, successor, role]: FromPromise<Handler.S47>) => {
                send(role, label, payload, S47.name);
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
    export class S20 implements ISend {
        readonly type: 'Send' = 'Send';
        constructor(public handler: Handler.S20) { }

        performSend(next: StateTransitionHandler, cancel: Cancellation, send: SendStateHandler) {
            const thunk = ([label, payload, successor, role]: FromPromise<Handler.S20>) => {
                send(role, label, payload, S20.name);
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
    export class S46 implements ISend {
        readonly type: 'Send' = 'Send';
        constructor(public handler: Handler.S46) { }

        performSend(next: StateTransitionHandler, cancel: Cancellation, send: SendStateHandler) {
            const thunk = ([label, payload, successor, role]: FromPromise<Handler.S46>) => {
                send(role, label, payload, S46.name);
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
    export class S13 implements ISend {
        readonly type: 'Send' = 'Send';
        constructor(public handler: Handler.S13) { }

        performSend(next: StateTransitionHandler, cancel: Cancellation, send: SendStateHandler) {
            const thunk = ([label, payload, successor, role]: FromPromise<Handler.S13>) => {
                send(role, label, payload, S13.name);
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
    export class S34 implements ISend {
        readonly type: 'Send' = 'Send';
        constructor(public handler: Handler.S34) { }

        performSend(next: StateTransitionHandler, cancel: Cancellation, send: SendStateHandler) {
            const thunk = ([label, payload, successor, role]: FromPromise<Handler.S34>) => {
                send(role, label, payload, S34.name);
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


    export class S4 implements IReceive {
        readonly type: 'Receive' = 'Receive';
        constructor(public handler: Handler.S4) { }

        prepareReceive(next: StateTransitionHandler, cancel: Cancellation, register: ReceiveStateHandler) {
            const onReceive = (message: any) => {
                const parsed = JSON.parse(message) as Message.S4;
                switch (parsed.label) {
                    case "pick": {
                        try {
                            const successor = this.handler[parsed.label](Factory.S31, parsed.payload);
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
                    case "finishedPicking": {
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

            register(Role.Peers.FO1, onReceive);
        }
    };
    export class S8 implements IReceive {
        readonly type: 'Receive' = 'Receive';
        constructor(public handler: Handler.S8) { }

        prepareReceive(next: StateTransitionHandler, cancel: Cancellation, register: ReceiveStateHandler) {
            const onReceive = (message: any) => {
                const parsed = JSON.parse(message) as Message.S8;
                switch (parsed.label) {
                    case "pick": {
                        try {
                            const successor = this.handler[parsed.label](Factory.S12, parsed.payload);
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
                    case "finishedPicking": {
                        try {
                            const successor = this.handler[parsed.label](Factory.S4, parsed.payload);
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

            register(Role.Peers.FO2, onReceive);
        }
    };



    export class S25 implements ITerminal {
        readonly type: 'Terminal' = 'Terminal';
    };


};

export namespace Factory {


    type S23_win =
        | [Message.S23_win['payload'], (Next: typeof S24) => State.S24]
        | [Message.S23_win['payload'], State.S24]
        ;

    function S23_win(
        payload: Message.S23_win['payload'],
        generateSuccessor: (Next: typeof S24) => State.S24
    ): State.S23;
    function S23_win(
        payload: Message.S23_win['payload'],
        succ: State.S24
    ): State.S23;
    function S23_win(...args: S23_win) {
        if (typeof args[1] === 'function') {
            const [payload, generateSuccessor] = args;
            const successor = generateSuccessor(S24);
            return new State.S23(["win", payload, successor, Role.Peers.FO2]);
        } else {
            const [payload, successor] = args;
            return new State.S23(["win", payload, successor, Role.Peers.FO2]);
        }
    }


    export const S23 = {
        win: S23_win,

    };
    type S31_reveal =
        | [Message.S31_reveal['payload'], (Next: typeof S32) => State.S32]
        | [Message.S31_reveal['payload'], State.S32]
        ;

    function S31_reveal(
        payload: Message.S31_reveal['payload'],
        generateSuccessor: (Next: typeof S32) => State.S32
    ): State.S31;
    function S31_reveal(
        payload: Message.S31_reveal['payload'],
        succ: State.S32
    ): State.S31;
    function S31_reveal(...args: S31_reveal) {
        if (typeof args[1] === 'function') {
            const [payload, generateSuccessor] = args;
            const successor = generateSuccessor(S32);
            return new State.S31(["reveal", payload, successor, Role.Peers.FO2]);
        } else {
            const [payload, successor] = args;
            return new State.S31(["reveal", payload, successor, Role.Peers.FO2]);
        }
    }


    export const S31 = {
        reveal: S31_reveal,

    };
    type S39_givePoints =
        | [Message.S39_givePoints['payload'], (Next: typeof S4) => State.S4]
        | [Message.S39_givePoints['payload'], State.S4]
        ;

    function S39_givePoints(
        payload: Message.S39_givePoints['payload'],
        generateSuccessor: (Next: typeof S4) => State.S4
    ): State.S39;
    function S39_givePoints(
        payload: Message.S39_givePoints['payload'],
        succ: State.S4
    ): State.S39;
    function S39_givePoints(...args: S39_givePoints) {
        if (typeof args[1] === 'function') {
            const [payload, generateSuccessor] = args;
            const successor = generateSuccessor(S4);
            return new State.S39(["givePoints", payload, successor, Role.Peers.FO1]);
        } else {
            const [payload, successor] = args;
            return new State.S39(["givePoints", payload, successor, Role.Peers.FO1]);
        }
    }


    export const S39 = {
        givePoints: S39_givePoints,

    };
    type S3_codeAndAgentNames =
        | [Message.S3_codeAndAgentNames['payload'], (Next: typeof S4) => State.S4]
        | [Message.S3_codeAndAgentNames['payload'], State.S4]
        ;

    function S3_codeAndAgentNames(
        payload: Message.S3_codeAndAgentNames['payload'],
        generateSuccessor: (Next: typeof S4) => State.S4
    ): State.S3;
    function S3_codeAndAgentNames(
        payload: Message.S3_codeAndAgentNames['payload'],
        succ: State.S4
    ): State.S3;
    function S3_codeAndAgentNames(...args: S3_codeAndAgentNames) {
        if (typeof args[1] === 'function') {
            const [payload, generateSuccessor] = args;
            const successor = generateSuccessor(S4);
            return new State.S3(["codeAndAgentNames", payload, successor, Role.Peers.SM1]);
        } else {
            const [payload, successor] = args;
            return new State.S3(["codeAndAgentNames", payload, successor, Role.Peers.SM1]);
        }
    }


    export const S3 = {
        codeAndAgentNames: S3_codeAndAgentNames,

    };
    type S24_win =
        | [Message.S24_win['payload'], (Next: typeof S25) => State.S25]
        | [Message.S24_win['payload'], State.S25]
        ;

    function S24_win(
        payload: Message.S24_win['payload'],
        generateSuccessor: (Next: typeof S25) => State.S25
    ): State.S24;
    function S24_win(
        payload: Message.S24_win['payload'],
        succ: State.S25
    ): State.S24;
    function S24_win(...args: S24_win) {
        if (typeof args[1] === 'function') {
            const [payload, generateSuccessor] = args;
            const successor = generateSuccessor(S25);
            return new State.S24(["win", payload, successor, Role.Peers.SM2]);
        } else {
            const [payload, successor] = args;
            return new State.S24(["win", payload, successor, Role.Peers.SM2]);
        }
    }


    export const S24 = {
        win: S24_win,

    };
    type S35_givePoints =
        | [Message.S35_givePoints['payload'], (Next: typeof S37) => State.S37]
        | [Message.S35_givePoints['payload'], State.S37]
        ;

    function S35_givePoints(
        payload: Message.S35_givePoints['payload'],
        generateSuccessor: (Next: typeof S37) => State.S37
    ): State.S35;
    function S35_givePoints(
        payload: Message.S35_givePoints['payload'],
        succ: State.S37
    ): State.S35;
    function S35_givePoints(...args: S35_givePoints) {
        if (typeof args[1] === 'function') {
            const [payload, generateSuccessor] = args;
            const successor = generateSuccessor(S37);
            return new State.S35(["givePoints", payload, successor, Role.Peers.SM2]);
        } else {
            const [payload, successor] = args;
            return new State.S35(["givePoints", payload, successor, Role.Peers.SM2]);
        }
    }

    type S35_lose =
        | [Message.S35_lose['payload'], (Next: typeof S41) => State.S41]
        | [Message.S35_lose['payload'], State.S41]
        ;

    function S35_lose(
        payload: Message.S35_lose['payload'],
        generateSuccessor: (Next: typeof S41) => State.S41
    ): State.S35;
    function S35_lose(
        payload: Message.S35_lose['payload'],
        succ: State.S41
    ): State.S35;
    function S35_lose(...args: S35_lose) {
        if (typeof args[1] === 'function') {
            const [payload, generateSuccessor] = args;
            const successor = generateSuccessor(S41);
            return new State.S35(["lose", payload, successor, Role.Peers.FO1]);
        } else {
            const [payload, successor] = args;
            return new State.S35(["lose", payload, successor, Role.Peers.FO1]);
        }
    }

    type S35_win =
        | [Message.S35_win['payload'], (Next: typeof S45) => State.S45]
        | [Message.S35_win['payload'], State.S45]
        ;

    function S35_win(
        payload: Message.S35_win['payload'],
        generateSuccessor: (Next: typeof S45) => State.S45
    ): State.S35;
    function S35_win(
        payload: Message.S35_win['payload'],
        succ: State.S45
    ): State.S35;
    function S35_win(...args: S35_win) {
        if (typeof args[1] === 'function') {
            const [payload, generateSuccessor] = args;
            const successor = generateSuccessor(S45);
            return new State.S35(["win", payload, successor, Role.Peers.FO1]);
        } else {
            const [payload, successor] = args;
            return new State.S35(["win", payload, successor, Role.Peers.FO1]);
        }
    }


    export const S35 = {
        givePoints: S35_givePoints,
        lose: S35_lose,
        win: S35_win,

    };
    type S41_lose =
        | [Message.S41_lose['payload'], (Next: typeof S42) => State.S42]
        | [Message.S41_lose['payload'], State.S42]
        ;

    function S41_lose(
        payload: Message.S41_lose['payload'],
        generateSuccessor: (Next: typeof S42) => State.S42
    ): State.S41;
    function S41_lose(
        payload: Message.S41_lose['payload'],
        succ: State.S42
    ): State.S41;
    function S41_lose(...args: S41_lose) {
        if (typeof args[1] === 'function') {
            const [payload, generateSuccessor] = args;
            const successor = generateSuccessor(S42);
            return new State.S41(["lose", payload, successor, Role.Peers.SM1]);
        } else {
            const [payload, successor] = args;
            return new State.S41(["lose", payload, successor, Role.Peers.SM1]);
        }
    }


    export const S41 = {
        lose: S41_lose,

    };
    type S22_lose =
        | [Message.S22_lose['payload'], (Next: typeof S23) => State.S23]
        | [Message.S22_lose['payload'], State.S23]
        ;

    function S22_lose(
        payload: Message.S22_lose['payload'],
        generateSuccessor: (Next: typeof S23) => State.S23
    ): State.S22;
    function S22_lose(
        payload: Message.S22_lose['payload'],
        succ: State.S23
    ): State.S22;
    function S22_lose(...args: S22_lose) {
        if (typeof args[1] === 'function') {
            const [payload, generateSuccessor] = args;
            const successor = generateSuccessor(S23);
            return new State.S22(["lose", payload, successor, Role.Peers.SM1]);
        } else {
            const [payload, successor] = args;
            return new State.S22(["lose", payload, successor, Role.Peers.SM1]);
        }
    }


    export const S22 = {
        lose: S22_lose,

    };
    type S28_lose =
        | [Message.S28_lose['payload'], (Next: typeof S29) => State.S29]
        | [Message.S28_lose['payload'], State.S29]
        ;

    function S28_lose(
        payload: Message.S28_lose['payload'],
        generateSuccessor: (Next: typeof S29) => State.S29
    ): State.S28;
    function S28_lose(
        payload: Message.S28_lose['payload'],
        succ: State.S29
    ): State.S28;
    function S28_lose(...args: S28_lose) {
        if (typeof args[1] === 'function') {
            const [payload, generateSuccessor] = args;
            const successor = generateSuccessor(S29);
            return new State.S28(["lose", payload, successor, Role.Peers.FO2]);
        } else {
            const [payload, successor] = args;
            return new State.S28(["lose", payload, successor, Role.Peers.FO2]);
        }
    }


    export const S28 = {
        lose: S28_lose,

    };
    type S16_givePoints =
        | [Message.S16_givePoints['payload'], (Next: typeof S18) => State.S18]
        | [Message.S16_givePoints['payload'], State.S18]
        ;

    function S16_givePoints(
        payload: Message.S16_givePoints['payload'],
        generateSuccessor: (Next: typeof S18) => State.S18
    ): State.S16;
    function S16_givePoints(
        payload: Message.S16_givePoints['payload'],
        succ: State.S18
    ): State.S16;
    function S16_givePoints(...args: S16_givePoints) {
        if (typeof args[1] === 'function') {
            const [payload, generateSuccessor] = args;
            const successor = generateSuccessor(S18);
            return new State.S16(["givePoints", payload, successor, Role.Peers.SM1]);
        } else {
            const [payload, successor] = args;
            return new State.S16(["givePoints", payload, successor, Role.Peers.SM1]);
        }
    }

    type S16_lose =
        | [Message.S16_lose['payload'], (Next: typeof S22) => State.S22]
        | [Message.S16_lose['payload'], State.S22]
        ;

    function S16_lose(
        payload: Message.S16_lose['payload'],
        generateSuccessor: (Next: typeof S22) => State.S22
    ): State.S16;
    function S16_lose(
        payload: Message.S16_lose['payload'],
        succ: State.S22
    ): State.S16;
    function S16_lose(...args: S16_lose) {
        if (typeof args[1] === 'function') {
            const [payload, generateSuccessor] = args;
            const successor = generateSuccessor(S22);
            return new State.S16(["lose", payload, successor, Role.Peers.FO1]);
        } else {
            const [payload, successor] = args;
            return new State.S16(["lose", payload, successor, Role.Peers.FO1]);
        }
    }

    type S16_win =
        | [Message.S16_win['payload'], (Next: typeof S27) => State.S27]
        | [Message.S16_win['payload'], State.S27]
        ;

    function S16_win(
        payload: Message.S16_win['payload'],
        generateSuccessor: (Next: typeof S27) => State.S27
    ): State.S16;
    function S16_win(
        payload: Message.S16_win['payload'],
        succ: State.S27
    ): State.S16;
    function S16_win(...args: S16_win) {
        if (typeof args[1] === 'function') {
            const [payload, generateSuccessor] = args;
            const successor = generateSuccessor(S27);
            return new State.S16(["win", payload, successor, Role.Peers.FO1]);
        } else {
            const [payload, successor] = args;
            return new State.S16(["win", payload, successor, Role.Peers.FO1]);
        }
    }


    export const S16 = {
        givePoints: S16_givePoints,
        lose: S16_lose,
        win: S16_win,

    };
    type S45_win =
        | [Message.S45_win['payload'], (Next: typeof S46) => State.S46]
        | [Message.S45_win['payload'], State.S46]
        ;

    function S45_win(
        payload: Message.S45_win['payload'],
        generateSuccessor: (Next: typeof S46) => State.S46
    ): State.S45;
    function S45_win(
        payload: Message.S45_win['payload'],
        succ: State.S46
    ): State.S45;
    function S45_win(...args: S45_win) {
        if (typeof args[1] === 'function') {
            const [payload, generateSuccessor] = args;
            const successor = generateSuccessor(S46);
            return new State.S45(["win", payload, successor, Role.Peers.SM1]);
        } else {
            const [payload, successor] = args;
            return new State.S45(["win", payload, successor, Role.Peers.SM1]);
        }
    }


    export const S45 = {
        win: S45_win,

    };
    type S15_reveal =
        | [Message.S15_reveal['payload'], (Next: typeof S16) => State.S16]
        | [Message.S15_reveal['payload'], State.S16]
        ;

    function S15_reveal(
        payload: Message.S15_reveal['payload'],
        generateSuccessor: (Next: typeof S16) => State.S16
    ): State.S15;
    function S15_reveal(
        payload: Message.S15_reveal['payload'],
        succ: State.S16
    ): State.S15;
    function S15_reveal(...args: S15_reveal) {
        if (typeof args[1] === 'function') {
            const [payload, generateSuccessor] = args;
            const successor = generateSuccessor(S16);
            return new State.S15(["reveal", payload, successor, Role.Peers.SM1]);
        } else {
            const [payload, successor] = args;
            return new State.S15(["reveal", payload, successor, Role.Peers.SM1]);
        }
    }


    export const S15 = {
        reveal: S15_reveal,

    };
    type S27_win =
        | [Message.S27_win['payload'], (Next: typeof S28) => State.S28]
        | [Message.S27_win['payload'], State.S28]
        ;

    function S27_win(
        payload: Message.S27_win['payload'],
        generateSuccessor: (Next: typeof S28) => State.S28
    ): State.S27;
    function S27_win(
        payload: Message.S27_win['payload'],
        succ: State.S28
    ): State.S27;
    function S27_win(...args: S27_win) {
        if (typeof args[1] === 'function') {
            const [payload, generateSuccessor] = args;
            const successor = generateSuccessor(S28);
            return new State.S27(["win", payload, successor, Role.Peers.SM1]);
        } else {
            const [payload, successor] = args;
            return new State.S27(["win", payload, successor, Role.Peers.SM1]);
        }
    }


    export const S27 = {
        win: S27_win,

    };
    type S12_reveal =
        | [Message.S12_reveal['payload'], (Next: typeof S13) => State.S13]
        | [Message.S12_reveal['payload'], State.S13]
        ;

    function S12_reveal(
        payload: Message.S12_reveal['payload'],
        generateSuccessor: (Next: typeof S13) => State.S13
    ): State.S12;
    function S12_reveal(
        payload: Message.S12_reveal['payload'],
        succ: State.S13
    ): State.S12;
    function S12_reveal(...args: S12_reveal) {
        if (typeof args[1] === 'function') {
            const [payload, generateSuccessor] = args;
            const successor = generateSuccessor(S13);
            return new State.S12(["reveal", payload, successor, Role.Peers.FO2]);
        } else {
            const [payload, successor] = args;
            return new State.S12(["reveal", payload, successor, Role.Peers.FO2]);
        }
    }


    export const S12 = {
        reveal: S12_reveal,

    };
    type S0_codeNames =
        | [Message.S0_codeNames['payload'], (Next: typeof S1) => State.S1]
        | [Message.S0_codeNames['payload'], State.S1]
        ;

    function S0_codeNames(
        payload: Message.S0_codeNames['payload'],
        generateSuccessor: (Next: typeof S1) => State.S1
    ): State.S0;
    function S0_codeNames(
        payload: Message.S0_codeNames['payload'],
        succ: State.S1
    ): State.S0;
    function S0_codeNames(...args: S0_codeNames) {
        if (typeof args[1] === 'function') {
            const [payload, generateSuccessor] = args;
            const successor = generateSuccessor(S1);
            return new State.S0(["codeNames", payload, successor, Role.Peers.FO2]);
        } else {
            const [payload, successor] = args;
            return new State.S0(["codeNames", payload, successor, Role.Peers.FO2]);
        }
    }


    export const S0 = {
        codeNames: S0_codeNames,

    };
    type S19_givePoints =
        | [Message.S19_givePoints['payload'], (Next: typeof S20) => State.S20]
        | [Message.S19_givePoints['payload'], State.S20]
        ;

    function S19_givePoints(
        payload: Message.S19_givePoints['payload'],
        generateSuccessor: (Next: typeof S20) => State.S20
    ): State.S19;
    function S19_givePoints(
        payload: Message.S19_givePoints['payload'],
        succ: State.S20
    ): State.S19;
    function S19_givePoints(...args: S19_givePoints) {
        if (typeof args[1] === 'function') {
            const [payload, generateSuccessor] = args;
            const successor = generateSuccessor(S20);
            return new State.S19(["givePoints", payload, successor, Role.Peers.SM2]);
        } else {
            const [payload, successor] = args;
            return new State.S19(["givePoints", payload, successor, Role.Peers.SM2]);
        }
    }


    export const S19 = {
        givePoints: S19_givePoints,

    };
    type S38_givePoints =
        | [Message.S38_givePoints['payload'], (Next: typeof S39) => State.S39]
        | [Message.S38_givePoints['payload'], State.S39]
        ;

    function S38_givePoints(
        payload: Message.S38_givePoints['payload'],
        generateSuccessor: (Next: typeof S39) => State.S39
    ): State.S38;
    function S38_givePoints(
        payload: Message.S38_givePoints['payload'],
        succ: State.S39
    ): State.S38;
    function S38_givePoints(...args: S38_givePoints) {
        if (typeof args[1] === 'function') {
            const [payload, generateSuccessor] = args;
            const successor = generateSuccessor(S39);
            return new State.S38(["givePoints", payload, successor, Role.Peers.SM1]);
        } else {
            const [payload, successor] = args;
            return new State.S38(["givePoints", payload, successor, Role.Peers.SM1]);
        }
    }


    export const S38 = {
        givePoints: S38_givePoints,

    };
    type S33_reveal =
        | [Message.S33_reveal['payload'], (Next: typeof S34) => State.S34]
        | [Message.S33_reveal['payload'], State.S34]
        ;

    function S33_reveal(
        payload: Message.S33_reveal['payload'],
        generateSuccessor: (Next: typeof S34) => State.S34
    ): State.S33;
    function S33_reveal(
        payload: Message.S33_reveal['payload'],
        succ: State.S34
    ): State.S33;
    function S33_reveal(...args: S33_reveal) {
        if (typeof args[1] === 'function') {
            const [payload, generateSuccessor] = args;
            const successor = generateSuccessor(S34);
            return new State.S33(["reveal", payload, successor, Role.Peers.FO1]);
        } else {
            const [payload, successor] = args;
            return new State.S33(["reveal", payload, successor, Role.Peers.FO1]);
        }
    }


    export const S33 = {
        reveal: S33_reveal,

    };
    type S43_win =
        | [Message.S43_win['payload'], (Next: typeof S25) => State.S25]
        | [Message.S43_win['payload'], State.S25]
        ;

    function S43_win(
        payload: Message.S43_win['payload'],
        generateSuccessor: (Next: typeof S25) => State.S25
    ): State.S43;
    function S43_win(
        payload: Message.S43_win['payload'],
        succ: State.S25
    ): State.S43;
    function S43_win(...args: S43_win) {
        if (typeof args[1] === 'function') {
            const [payload, generateSuccessor] = args;
            const successor = generateSuccessor(S25);
            return new State.S43(["win", payload, successor, Role.Peers.SM2]);
        } else {
            const [payload, successor] = args;
            return new State.S43(["win", payload, successor, Role.Peers.SM2]);
        }
    }


    export const S43 = {
        win: S43_win,

    };
    type S18_givePoints =
        | [Message.S18_givePoints['payload'], (Next: typeof S19) => State.S19]
        | [Message.S18_givePoints['payload'], State.S19]
        ;

    function S18_givePoints(
        payload: Message.S18_givePoints['payload'],
        generateSuccessor: (Next: typeof S19) => State.S19
    ): State.S18;
    function S18_givePoints(
        payload: Message.S18_givePoints['payload'],
        succ: State.S19
    ): State.S18;
    function S18_givePoints(...args: S18_givePoints) {
        if (typeof args[1] === 'function') {
            const [payload, generateSuccessor] = args;
            const successor = generateSuccessor(S19);
            return new State.S18(["givePoints", payload, successor, Role.Peers.FO1]);
        } else {
            const [payload, successor] = args;
            return new State.S18(["givePoints", payload, successor, Role.Peers.FO1]);
        }
    }


    export const S18 = {
        givePoints: S18_givePoints,

    };
    type S37_givePoints =
        | [Message.S37_givePoints['payload'], (Next: typeof S38) => State.S38]
        | [Message.S37_givePoints['payload'], State.S38]
        ;

    function S37_givePoints(
        payload: Message.S37_givePoints['payload'],
        generateSuccessor: (Next: typeof S38) => State.S38
    ): State.S37;
    function S37_givePoints(
        payload: Message.S37_givePoints['payload'],
        succ: State.S38
    ): State.S37;
    function S37_givePoints(...args: S37_givePoints) {
        if (typeof args[1] === 'function') {
            const [payload, generateSuccessor] = args;
            const successor = generateSuccessor(S38);
            return new State.S37(["givePoints", payload, successor, Role.Peers.FO2]);
        } else {
            const [payload, successor] = args;
            return new State.S37(["givePoints", payload, successor, Role.Peers.FO2]);
        }
    }


    export const S37 = {
        givePoints: S37_givePoints,

    };
    type S1_codeAndAgentNames =
        | [Message.S1_codeAndAgentNames['payload'], (Next: typeof S2) => State.S2]
        | [Message.S1_codeAndAgentNames['payload'], State.S2]
        ;

    function S1_codeAndAgentNames(
        payload: Message.S1_codeAndAgentNames['payload'],
        generateSuccessor: (Next: typeof S2) => State.S2
    ): State.S1;
    function S1_codeAndAgentNames(
        payload: Message.S1_codeAndAgentNames['payload'],
        succ: State.S2
    ): State.S1;
    function S1_codeAndAgentNames(...args: S1_codeAndAgentNames) {
        if (typeof args[1] === 'function') {
            const [payload, generateSuccessor] = args;
            const successor = generateSuccessor(S2);
            return new State.S1(["codeAndAgentNames", payload, successor, Role.Peers.SM2]);
        } else {
            const [payload, successor] = args;
            return new State.S1(["codeAndAgentNames", payload, successor, Role.Peers.SM2]);
        }
    }


    export const S1 = {
        codeAndAgentNames: S1_codeAndAgentNames,

    };
    type S2_codeNames =
        | [Message.S2_codeNames['payload'], (Next: typeof S3) => State.S3]
        | [Message.S2_codeNames['payload'], State.S3]
        ;

    function S2_codeNames(
        payload: Message.S2_codeNames['payload'],
        generateSuccessor: (Next: typeof S3) => State.S3
    ): State.S2;
    function S2_codeNames(
        payload: Message.S2_codeNames['payload'],
        succ: State.S3
    ): State.S2;
    function S2_codeNames(...args: S2_codeNames) {
        if (typeof args[1] === 'function') {
            const [payload, generateSuccessor] = args;
            const successor = generateSuccessor(S3);
            return new State.S2(["codeNames", payload, successor, Role.Peers.FO1]);
        } else {
            const [payload, successor] = args;
            return new State.S2(["codeNames", payload, successor, Role.Peers.FO1]);
        }
    }


    export const S2 = {
        codeNames: S2_codeNames,

    };
    type S14_reveal =
        | [Message.S14_reveal['payload'], (Next: typeof S15) => State.S15]
        | [Message.S14_reveal['payload'], State.S15]
        ;

    function S14_reveal(
        payload: Message.S14_reveal['payload'],
        generateSuccessor: (Next: typeof S15) => State.S15
    ): State.S14;
    function S14_reveal(
        payload: Message.S14_reveal['payload'],
        succ: State.S15
    ): State.S14;
    function S14_reveal(...args: S14_reveal) {
        if (typeof args[1] === 'function') {
            const [payload, generateSuccessor] = args;
            const successor = generateSuccessor(S15);
            return new State.S14(["reveal", payload, successor, Role.Peers.FO1]);
        } else {
            const [payload, successor] = args;
            return new State.S14(["reveal", payload, successor, Role.Peers.FO1]);
        }
    }


    export const S14 = {
        reveal: S14_reveal,

    };
    type S29_lose =
        | [Message.S29_lose['payload'], (Next: typeof S25) => State.S25]
        | [Message.S29_lose['payload'], State.S25]
        ;

    function S29_lose(
        payload: Message.S29_lose['payload'],
        generateSuccessor: (Next: typeof S25) => State.S25
    ): State.S29;
    function S29_lose(
        payload: Message.S29_lose['payload'],
        succ: State.S25
    ): State.S29;
    function S29_lose(...args: S29_lose) {
        if (typeof args[1] === 'function') {
            const [payload, generateSuccessor] = args;
            const successor = generateSuccessor(S25);
            return new State.S29(["lose", payload, successor, Role.Peers.SM2]);
        } else {
            const [payload, successor] = args;
            return new State.S29(["lose", payload, successor, Role.Peers.SM2]);
        }
    }


    export const S29 = {
        lose: S29_lose,

    };
    type S32_reveal =
        | [Message.S32_reveal['payload'], (Next: typeof S33) => State.S33]
        | [Message.S32_reveal['payload'], State.S33]
        ;

    function S32_reveal(
        payload: Message.S32_reveal['payload'],
        generateSuccessor: (Next: typeof S33) => State.S33
    ): State.S32;
    function S32_reveal(
        payload: Message.S32_reveal['payload'],
        succ: State.S33
    ): State.S32;
    function S32_reveal(...args: S32_reveal) {
        if (typeof args[1] === 'function') {
            const [payload, generateSuccessor] = args;
            const successor = generateSuccessor(S33);
            return new State.S32(["reveal", payload, successor, Role.Peers.SM2]);
        } else {
            const [payload, successor] = args;
            return new State.S32(["reveal", payload, successor, Role.Peers.SM2]);
        }
    }


    export const S32 = {
        reveal: S32_reveal,

    };
    type S42_win =
        | [Message.S42_win['payload'], (Next: typeof S43) => State.S43]
        | [Message.S42_win['payload'], State.S43]
        ;

    function S42_win(
        payload: Message.S42_win['payload'],
        generateSuccessor: (Next: typeof S43) => State.S43
    ): State.S42;
    function S42_win(
        payload: Message.S42_win['payload'],
        succ: State.S43
    ): State.S42;
    function S42_win(...args: S42_win) {
        if (typeof args[1] === 'function') {
            const [payload, generateSuccessor] = args;
            const successor = generateSuccessor(S43);
            return new State.S42(["win", payload, successor, Role.Peers.FO2]);
        } else {
            const [payload, successor] = args;
            return new State.S42(["win", payload, successor, Role.Peers.FO2]);
        }
    }


    export const S42 = {
        win: S42_win,

    };
    type S47_lose =
        | [Message.S47_lose['payload'], (Next: typeof S25) => State.S25]
        | [Message.S47_lose['payload'], State.S25]
        ;

    function S47_lose(
        payload: Message.S47_lose['payload'],
        generateSuccessor: (Next: typeof S25) => State.S25
    ): State.S47;
    function S47_lose(
        payload: Message.S47_lose['payload'],
        succ: State.S25
    ): State.S47;
    function S47_lose(...args: S47_lose) {
        if (typeof args[1] === 'function') {
            const [payload, generateSuccessor] = args;
            const successor = generateSuccessor(S25);
            return new State.S47(["lose", payload, successor, Role.Peers.SM2]);
        } else {
            const [payload, successor] = args;
            return new State.S47(["lose", payload, successor, Role.Peers.SM2]);
        }
    }


    export const S47 = {
        lose: S47_lose,

    };
    type S20_givePoints =
        | [Message.S20_givePoints['payload'], (Next: typeof S8) => State.S8]
        | [Message.S20_givePoints['payload'], State.S8]
        ;

    function S20_givePoints(
        payload: Message.S20_givePoints['payload'],
        generateSuccessor: (Next: typeof S8) => State.S8
    ): State.S20;
    function S20_givePoints(
        payload: Message.S20_givePoints['payload'],
        succ: State.S8
    ): State.S20;
    function S20_givePoints(...args: S20_givePoints) {
        if (typeof args[1] === 'function') {
            const [payload, generateSuccessor] = args;
            const successor = generateSuccessor(S8);
            return new State.S20(["givePoints", payload, successor, Role.Peers.FO2]);
        } else {
            const [payload, successor] = args;
            return new State.S20(["givePoints", payload, successor, Role.Peers.FO2]);
        }
    }


    export const S20 = {
        givePoints: S20_givePoints,

    };
    type S46_lose =
        | [Message.S46_lose['payload'], (Next: typeof S47) => State.S47]
        | [Message.S46_lose['payload'], State.S47]
        ;

    function S46_lose(
        payload: Message.S46_lose['payload'],
        generateSuccessor: (Next: typeof S47) => State.S47
    ): State.S46;
    function S46_lose(
        payload: Message.S46_lose['payload'],
        succ: State.S47
    ): State.S46;
    function S46_lose(...args: S46_lose) {
        if (typeof args[1] === 'function') {
            const [payload, generateSuccessor] = args;
            const successor = generateSuccessor(S47);
            return new State.S46(["lose", payload, successor, Role.Peers.FO2]);
        } else {
            const [payload, successor] = args;
            return new State.S46(["lose", payload, successor, Role.Peers.FO2]);
        }
    }


    export const S46 = {
        lose: S46_lose,

    };
    type S13_reveal =
        | [Message.S13_reveal['payload'], (Next: typeof S14) => State.S14]
        | [Message.S13_reveal['payload'], State.S14]
        ;

    function S13_reveal(
        payload: Message.S13_reveal['payload'],
        generateSuccessor: (Next: typeof S14) => State.S14
    ): State.S13;
    function S13_reveal(
        payload: Message.S13_reveal['payload'],
        succ: State.S14
    ): State.S13;
    function S13_reveal(...args: S13_reveal) {
        if (typeof args[1] === 'function') {
            const [payload, generateSuccessor] = args;
            const successor = generateSuccessor(S14);
            return new State.S13(["reveal", payload, successor, Role.Peers.SM2]);
        } else {
            const [payload, successor] = args;
            return new State.S13(["reveal", payload, successor, Role.Peers.SM2]);
        }
    }


    export const S13 = {
        reveal: S13_reveal,

    };
    type S34_reveal =
        | [Message.S34_reveal['payload'], (Next: typeof S35) => State.S35]
        | [Message.S34_reveal['payload'], State.S35]
        ;

    function S34_reveal(
        payload: Message.S34_reveal['payload'],
        generateSuccessor: (Next: typeof S35) => State.S35
    ): State.S34;
    function S34_reveal(
        payload: Message.S34_reveal['payload'],
        succ: State.S35
    ): State.S34;
    function S34_reveal(...args: S34_reveal) {
        if (typeof args[1] === 'function') {
            const [payload, generateSuccessor] = args;
            const successor = generateSuccessor(S35);
            return new State.S34(["reveal", payload, successor, Role.Peers.SM1]);
        } else {
            const [payload, successor] = args;
            return new State.S34(["reveal", payload, successor, Role.Peers.SM1]);
        }
    }


    export const S34 = {
        reveal: S34_reveal,

    };

    export function S4(handler: Handler.S4) {
        return new State.S4(handler);
    };
    export function S8(handler: Handler.S8) {
        return new State.S8(handler);
    };


    export const Initial = S0;

    export const S25 = () => new State.S25();
    export const Terminal = S25;

};