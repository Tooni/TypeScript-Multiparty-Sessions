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
 * * __Sends to FO2, finishedPicking__({})
 */
export default abstract class S6<ComponentState = {}> extends React.Component<Props, ComponentState> {
    protected finishedPicking: SendComponentFactory<{}>;

    constructor(props: Props) {
        super(props);
        this.finishedPicking = props.factory<{}>(
            Roles.Peers.FO2,
            'finishedPicking',
            SendState.S7
        );

    }
}