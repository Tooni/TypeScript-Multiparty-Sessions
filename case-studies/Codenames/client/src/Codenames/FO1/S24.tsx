import React from 'react';

import * as Roles from './Roles';
import {
    State,
    ReceiveState,
    SendState,
    TerminalState,
} from './EFSM';

import {
    MaybePromise,
} from './Types';

import {
    ReceiveHandler
} from './Session';



// ==================
// Message structures
// ==================

enum Labels {
    lose = 'lose',
    win = 'win',
    givePoints = 'givePoints',
}

export namespace Payloads {
    export interface lose {
        ignore5: null;
    };
    export interface win {
        ignore6: null;
    };
    export interface givePoints {
        p18: number;
        p28: number;
    };
}

namespace Messages {
    export interface lose {
        label: Labels.lose;
        payload: Payloads.lose;
    };
    export interface win {
        label: Labels.win;
        payload: Payloads.win;
    };
    export interface givePoints {
        label: Labels.givePoints;
        payload: Payloads.givePoints;
    };
}

type Message = Messages.lose | Messages.win | Messages.givePoints

// ===============
// Component types
// ===============

type Props = {
    register: (role: Roles.Peers, handle: ReceiveHandler) => void
};

/**
 * __Receives from Svr.__ Possible messages:
 *
 * * __lose__(Payloads.lose)
 * * __win__(Payloads.win)
 * * __givePoints__(Payloads.givePoints)
 */
export default abstract class S24<ComponentState = {}> extends React.Component<Props, ComponentState> {

    componentDidMount() {
        this.props.register(Roles.Peers.Svr, this.handle.bind(this));
    }

    handle(message: any): MaybePromise<State> {
        const parsedMessage = JSON.parse(message) as Message;
        switch (parsedMessage.label) {
            case Labels.lose: {
                const thunk = () => {
                    return TerminalState.S17;
                }

                const continuation = this.lose(parsedMessage.payload);
                if (continuation instanceof Promise) {
                    return new Promise((resolve, reject) => {
                        continuation.then(() => {
                            resolve(thunk());
                        }).catch(reject);
                    })
                } else {
                    return thunk();
                }
            }
            case Labels.win: {
                const thunk = () => {
                    return TerminalState.S17;
                }

                const continuation = this.win(parsedMessage.payload);
                if (continuation instanceof Promise) {
                    return new Promise((resolve, reject) => {
                        continuation.then(() => {
                            resolve(thunk());
                        }).catch(reject);
                    })
                } else {
                    return thunk();
                }
            }
            case Labels.givePoints: {
                const thunk = () => {
                    return SendState.S3;
                }

                const continuation = this.givePoints(parsedMessage.payload);
                if (continuation instanceof Promise) {
                    return new Promise((resolve, reject) => {
                        continuation.then(() => {
                            resolve(thunk());
                        }).catch(reject);
                    })
                } else {
                    return thunk();
                }
            }

        }
    }

    abstract lose(payload: Payloads.lose): MaybePromise<void>;
    abstract win(payload: Payloads.win): MaybePromise<void>;
    abstract givePoints(payload: Payloads.givePoints): MaybePromise<void>;

}