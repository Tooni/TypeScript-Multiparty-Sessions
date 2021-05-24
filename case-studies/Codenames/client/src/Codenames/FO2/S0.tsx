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
    codeNames = 'codeNames',
}

export namespace Payloads {
    export interface codeNames {
        codeNames1: string;
    };
}

namespace Messages {
    export interface codeNames {
        label: Labels.codeNames;
        payload: Payloads.codeNames;
    };
}

type Message = Messages.codeNames

// ===============
// Component types
// ===============

type Props = {
    register: (role: Roles.Peers, handle: ReceiveHandler) => void
};

/**
 * __Receives from Svr.__ Possible messages:
 *
 * * __codeNames__(Payloads.codeNames)
 */
export default abstract class S0<ComponentState = {}> extends React.Component<Props, ComponentState> {

    componentDidMount() {
        this.props.register(Roles.Peers.Svr, this.handle.bind(this));
    }

    handle(message: any): MaybePromise<State> {
        const parsedMessage = JSON.parse(message) as Message;
        switch (parsedMessage.label) {
            case Labels.codeNames: {
                const thunk = () => {
                    return ReceiveState.S1;
                }

                const continuation = this.codeNames(parsedMessage.payload);
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

    abstract codeNames(payload: Payloads.codeNames): MaybePromise<void>;

}