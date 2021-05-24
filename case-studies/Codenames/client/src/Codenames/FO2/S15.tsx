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
    export interface pick {
        codeName4: string;
    };
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
 * * __Sends to Svr, pick__(Payloads.pick)
 */
export default abstract class S15<ComponentState = {}> extends React.Component<Props, ComponentState> {
    protected pick: SendComponentFactory<Payloads.pick>;

    constructor(props: Props) {
        super(props);
        this.pick = props.factory<Payloads.pick>(
            Roles.Peers.Svr,
            'pick',
            ReceiveState.S16
        );

    }
}