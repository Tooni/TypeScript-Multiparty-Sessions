import React from 'react';

import * as Roles from './Roles';

import {
    ReceiveState,
    SendState,
    TerminalState
} from './EFSM';

import {
    SendComponentFactory,
    SendComponentFactoryFactory
} from './Session';



// ==================
// Message structures
// ==================

namespace Payloads {
}

// ===============
// Component types
// ===============

type Props = {
    factory: SendComponentFactoryFactory
}

/**
 * __Send state: Possible messages:
 *
 * * __Sends to Wallet, reject__({})
 * * __Sends to Wallet, authorise__({})
 */
export default abstract class S6<ComponentState = {}> extends React.Component<Props, ComponentState> {
    protected reject: SendComponentFactory<{}>;
    protected authorise: SendComponentFactory<{}>;

    constructor(props: Props) {
        super(props);
        this.reject = props.factory<{}>(
            Roles.Peers.Wallet,
            'reject',
            SendState.S11
        );
        this.authorise = props.factory<{}>(
            Roles.Peers.Wallet,
            'authorise',
            SendState.S8
        );

    }
}