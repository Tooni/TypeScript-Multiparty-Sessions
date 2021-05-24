// EFSM.ts

// ======
// States
// ======

export enum SendState {
    S1 = 'S1',
};

export enum ReceiveState {
    S10 = 'S10', S3 = 'S3', S11 = 'S11', S0 = 'S0', S17 = 'S17', S6 = 'S6', S18 = 'S18',
};

export enum TerminalState {
    S14 = 'S14',
};

export type State = ReceiveState | SendState | TerminalState;

// ===========
// Type Guards
// ===========

export function isReceiveState(state: State): state is ReceiveState {
    return (Object.values(ReceiveState) as Array<State>).includes(state)
}

export function isSendState(state: State): state is SendState {
    return (Object.values(SendState) as Array<State>).includes(state)
}

export function isTerminalState(state: State): state is TerminalState {
    return (Object.values(TerminalState) as Array<State>).includes(state)
}