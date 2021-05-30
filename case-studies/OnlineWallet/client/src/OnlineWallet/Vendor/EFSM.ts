// EFSM.ts

// ======
// States
// ======

export enum SendState {
    S3 = 'S3',
};

export enum ReceiveState {
    S0 = 'S0', S4 = 'S4',
};

export enum TerminalState {
    S6 = 'S6',
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