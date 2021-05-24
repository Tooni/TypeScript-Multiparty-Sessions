// EFSM.ts

// ======
// States
// ======

export enum SendState {
    S8 = 'S8', S22 = 'S22', S21 = 'S21', S20 = 'S20', S7 = 'S7', S6 = 'S6', S3 = 'S3',
};

export enum ReceiveState {
    S0 = 'S0', S14 = 'S14', S1 = 'S1', S24 = 'S24', S9 = 'S9', S13 = 'S13', S23 = 'S23',
};

export enum TerminalState {
    S17 = 'S17',
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