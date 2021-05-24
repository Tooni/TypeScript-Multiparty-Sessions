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
        clue: string;
        numAgents: number;
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
 * * __Sends to FO1, clue__(Payloads.clue)
 */
export default abstract class S1<ComponentState = {}> extends React.Component<Props, ComponentState> {
    protected clue: SendComponentFactory<Payloads.clue>;

    constructor(props: Props) {
        super(props);
        this.clue = props.factory<Payloads.clue>(
            Roles.Peers.FO1,
            'clue',
            ReceiveState.S3
        );

    }
}