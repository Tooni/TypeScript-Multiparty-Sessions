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
    export interface clue {
        clue2: string;
        numAgents2: number;
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
 * * __Sends to FO2, clue__(Payloads.clue)
 */
export default abstract class S5<ComponentState = {}> extends React.Component<Props, ComponentState> {
    protected clue: SendComponentFactory<Payloads.clue>;

    constructor(props: Props) {
        super(props);
        this.clue = props.factory<Payloads.clue>(
            Roles.Peers.FO2,
            'clue',
            ReceiveState.S6
        );

    }
}