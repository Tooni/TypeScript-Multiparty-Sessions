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
    win = 'win',
    lose = 'lose',
    givePoints = 'givePoints',
}

export namespace Payloads {
    export interface givePoints {
        p13: number;
        p23: number;
    };
}

namespace Messages {
    export interface win {
        label: Labels.win;

    };
    export interface lose {
        label: Labels.lose;

    };
    export interface givePoints {
        label: Labels.givePoints;
        payload: Payloads.givePoints;
    };
}

type Message = Messages.win | Messages.lose | Messages.givePoints

// ===============
// Component types
// ===============

type Props = {
    register: (role: Roles.Peers, handle: ReceiveHandler) => void
};

/**
 * __Receives from Svr.__ Possible messages:
 *
 * * __win__(Payloads.win)
 * * __lose__(Payloads.lose)
 * * __givePoints__(Payloads.givePoints)
 */
export default abstract class S11<ComponentState = {}> extends React.Component<Props, ComponentState> {

    componentDidMount() {
        this.props.register(Roles.Peers.Svr, this.handle.bind(this));
    }

    handle(message: any): MaybePromise<State> {
        const parsedMessage = JSON.parse(message) as Message;
        switch (parsedMessage.label) {
            case Labels.win: {
                const thunk = () => {
                    return TerminalState.S14;
                }

                const continuation = this.win();
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
            case Labels.lose: {
                const thunk = () => {
                    return TerminalState.S14;
                }

                const continuation = this.lose();
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
                    return ReceiveState.S6;
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

    abstract win(): MaybePromise<void>;
    abstract lose(): MaybePromise<void>;
    abstract givePoints(payload: Payloads.givePoints): MaybePromise<void>;

}