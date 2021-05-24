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
    codeAndAgentNames = 'codeAndAgentNames',
}

export namespace Payloads {
    export interface codeAndAgentNames {
        codeNames2: string;
        agentColours1: string;
    };
}

namespace Messages {
    export interface codeAndAgentNames {
        label: Labels.codeAndAgentNames;
        payload: Payloads.codeAndAgentNames;
    };
}

type Message = Messages.codeAndAgentNames

// ===============
// Component types
// ===============

type Props = {
    register: (role: Roles.Peers, handle: ReceiveHandler) => void
};

/**
 * __Receives from Svr.__ Possible messages:
 *
 * * __codeAndAgentNames__(Payloads.codeAndAgentNames)
 */
export default abstract class S0<ComponentState = {}> extends React.Component<Props, ComponentState> {

    componentDidMount() {
        this.props.register(Roles.Peers.Svr, this.handle.bind(this));
    }

    handle(message: any): MaybePromise<State> {
        const parsedMessage = JSON.parse(message) as Message;
        switch (parsedMessage.label) {
            case Labels.codeAndAgentNames: {
                const thunk = () => {
                    return ReceiveState.S1;
                }

                const continuation = this.codeAndAgentNames(parsedMessage.payload);
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

    abstract codeAndAgentNames(payload: Payloads.codeAndAgentNames): MaybePromise<void>;

}