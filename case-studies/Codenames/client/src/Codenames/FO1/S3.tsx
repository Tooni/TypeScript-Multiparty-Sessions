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
        codeName5: string;
    };
    export interface finishedPicking {
        ignore1: null;
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
 * * __Sends to FO2, pick__(Payloads.pick)
 * * __Sends to Svr, finishedPicking__(Payloads.finishedPicking)
 */
export default abstract class S3<ComponentState = {}> extends React.Component<Props, ComponentState> {
    protected pick: SendComponentFactory<Payloads.pick>;
    protected finishedPicking: SendComponentFactory<Payloads.finishedPicking>;

    constructor(props: Props) {
        super(props);
        this.pick = props.factory<Payloads.pick>(
            Roles.Peers.FO2,
            'pick',
            SendState.S20
        );
        this.finishedPicking = props.factory<Payloads.finishedPicking>(
            Roles.Peers.Svr,
            'finishedPicking',
            SendState.S6
        );

    }
}