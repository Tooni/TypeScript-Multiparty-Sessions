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
    pick = 'pick',
    finishedPicking = 'finishedPicking',
}

export namespace Payloads {
    export interface pick {
        codeName5: string;
    };
}

namespace Messages {
    export interface pick {
        label: Labels.pick;
        payload: Payloads.pick;
    };
    export interface finishedPicking {
        label: Labels.finishedPicking;

    };
}

type Message = Messages.pick | Messages.finishedPicking

// ===============
// Component types
// ===============

type Props = {
    register: (role: Roles.Peers, handle: ReceiveHandler) => void
};

/**
 * __Receives from FO1.__ Possible messages:
 *
 * * __pick__(Payloads.pick)
 * * __finishedPicking__(Payloads.finishedPicking)
 */
export default abstract class S1<ComponentState = {}> extends React.Component<Props, ComponentState> {

    componentDidMount() {
        this.props.register(Roles.Peers.FO1, this.handle.bind(this));
    }

    handle(message: any): MaybePromise<State> {
        const parsedMessage = JSON.parse(message) as Message;
        switch (parsedMessage.label) {
            case Labels.pick: {
                const thunk = () => {
                    return ReceiveState.S23;
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
            case Labels.finishedPicking: {
                const thunk = () => {
                    return ReceiveState.S5;
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

        }
    }

    abstract pick(payload: Payloads.pick): MaybePromise<void>;
    abstract finishedPicking(): MaybePromise<void>;

}