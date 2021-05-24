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
    finishedPicking = 'finishedPicking',
    pick = 'pick',
}

export namespace Payloads {
    export interface pick {
        codeName1: string;
    };
}

namespace Messages {
    export interface finishedPicking {
        label: Labels.finishedPicking;

    };
    export interface pick {
        label: Labels.pick;
        payload: Payloads.pick;
    };
}

type Message = Messages.finishedPicking | Messages.pick

// ===============
// Component types
// ===============

type Props = {
    register: (role: Roles.Peers, handle: ReceiveHandler) => void
};

/**
 * __Receives from FO2.__ Possible messages:
 *
 * * __finishedPicking__(Payloads.finishedPicking)
 * * __pick__(Payloads.pick)
 */
export default abstract class S9<ComponentState = {}> extends React.Component<Props, ComponentState> {

    componentDidMount() {
        this.props.register(Roles.Peers.FO2, this.handle.bind(this));
    }

    handle(message: any): MaybePromise<State> {
        const parsedMessage = JSON.parse(message) as Message;
        switch (parsedMessage.label) {
            case Labels.finishedPicking: {
                const thunk = () => {
                    return ReceiveState.S1;
                }

                const continuation = this.finishedPicking();
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
            case Labels.pick: {
                const thunk = () => {
                    return ReceiveState.S13;
                }

                const continuation = this.pick(parsedMessage.payload);
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

    abstract finishedPicking(): MaybePromise<void>;
    abstract pick(payload: Payloads.pick): MaybePromise<void>;

}