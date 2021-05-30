// EFSM.ts

// ======
// States
// ======

export enum SendState {
    S2 = 'S2', S11 = 'S11', S0 = 'S0', S6 = 'S6', S8 = 'S8',
};

export enum ReceiveState {
    S3 = 'S3', S5 = 'S5',
};

export enum TerminalState {
    S9 = 'S9',
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