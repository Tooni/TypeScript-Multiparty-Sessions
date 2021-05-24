// EFSM.ts

// ======
// States
// ======

export enum SendState {
    S13 = 'S13', S11 = 'S11', S9 = 'S9', S6 = 'S6', S15 = 'S15', S10 = 'S10', S14 = 'S14',
};

export enum ReceiveState {
    S24 = 'S24', S0 = 'S0', S1 = 'S1', S17 = 'S17', S5 = 'S5', S23 = 'S23', S16 = 'S16',
};

export enum TerminalState {
    S20 = 'S20',
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