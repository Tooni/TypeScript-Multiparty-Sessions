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
    login_retry = 'login_retry',
    login_ok = 'login_ok',
    login_denied = 'login_denied',
}

export namespace Payloads {
    export interface login_retry {
        msg: string;
    };
    export interface login_denied {
        msg: string;
    };
}

namespace Messages {
    export interface login_retry {
        label: Labels.login_retry;
        payload: Payloads.login_retry;
    };
    export interface login_ok {
        label: Labels.login_ok;

    };
    export interface login_denied {
        label: Labels.login_denied;
        payload: Payloads.login_denied;
    };
}

type Message = Messages.login_retry | Messages.login_ok | Messages.login_denied

// ===============
// Component types
// ===============

type Props = {
    register: (role: Roles.Peers, handle: ReceiveHandler) => void
};

/**
 * __Receives from Wallet.__ Possible messages:
 *
 * * __login_retry__(Payloads.login_retry)
 * * __login_ok__(Payloads.login_ok)
 * * __login_denied__(Payloads.login_denied)
 */
export default abstract class S3<ComponentState = {}> extends React.Component<Props, ComponentState> {

    componentDidMount() {
        this.props.register(Roles.Peers.Wallet, this.handle.bind(this));
    }

    handle(message: any): MaybePromise<State> {
        const parsedMessage = JSON.parse(message) as Message;
        switch (parsedMessage.label) {
            case Labels.login_retry: {
                const thunk = () => {
                    return SendState.S0;
                }

                const continuation = this.login_retry(parsedMessage.payload);
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
            case Labels.login_ok: {
                const thunk = () => {
                    return ReceiveState.S5;
                }

                const continuation = this.login_ok();
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
            case Labels.login_denied: {
                const thunk = () => {
                    return TerminalState.S9;
                }

                const continuation = this.login_denied(parsedMessage.payload);
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

    abstract login_retry(payload: Payloads.login_retry): MaybePromise<void>;
    abstract login_ok(): MaybePromise<void>;
    abstract login_denied(payload: Payloads.login_denied): MaybePromise<void>;

}