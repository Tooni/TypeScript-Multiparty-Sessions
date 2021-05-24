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
    reveal = 'reveal',
}

export namespace Payloads {
    export interface reveal {
        compromisedAgents4: number;
    };
}

namespace Messages {
    export interface reveal {
        label: Labels.reveal;
        payload: Payloads.reveal;
    };
}

type Message = Messages.reveal

// ===============
// Component types
// ===============

type Props = {
    register: (role: Roles.Peers, handle: ReceiveHandler) => void
};

/**
 * __Receives from Svr.__ Possible messages:
 *
 * * __reveal__(Payloads.reveal)
 */
export default abstract class S10<ComponentState = {}> extends React.Component<Props, ComponentState> {

    componentDidMount() {
        this.props.register(Roles.Peers.Svr, this.handle.bind(this));
    }

    handle(message: any): MaybePromise<State> {
        const parsedMessage = JSON.parse(message) as Message;
        switch (parsedMessage.label) {
            case Labels.reveal: {
                const thunk = () => {
                    return ReceiveState.S11;
                }

                const continuation = this.reveal(parsedMessage.payload);
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

    abstract reveal(payload: Payloads.reveal): MaybePromise<void>;

}