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
        codeName3: string;
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
 * * __Sends to SM1, pick__(Payloads.pick)
 */
export default abstract class S14<ComponentState = {}> extends React.Component<Props, ComponentState> {
    protected pick: SendComponentFactory<Payloads.pick>;

    constructor(props: Props) {
        super(props);
        this.pick = props.factory<Payloads.pick>(
            Roles.Peers.SM1,
            'pick',
            SendState.S15
        );

    }
}