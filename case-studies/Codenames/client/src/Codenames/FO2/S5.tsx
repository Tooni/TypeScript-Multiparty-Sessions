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
    clue = 'clue',
}

export namespace Payloads {
    export interface clue {
        clue2: string;
        numAgents2: number;
    };
}

namespace Messages {
    export interface clue {
        label: Labels.clue;
        payload: Payloads.clue;
    };
}

type Message = Messages.clue

// ===============
// Component types
// ===============

type Props = {
    register: (role: Roles.Peers, handle: ReceiveHandler) => void
};

/**
 * __Receives from SM2.__ Possible messages:
 *
 * * __clue__(Payloads.clue)
 */
export default abstract class S5<ComponentState = {}> extends React.Component<Props, ComponentState> {

    componentDidMount() {
        this.props.register(Roles.Peers.SM2, this.handle.bind(this));
    }

    handle(message: any): MaybePromise<State> {
        const parsedMessage = JSON.parse(message) as Message;
        switch (parsedMessage.label) {
            case Labels.clue: {
                const thunk = () => {
                    return SendState.S6;
                }

                const continuation = this.clue(parsedMessage.payload);
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

    abstract clue(payload: Payloads.clue): MaybePromise<void>;

}