// Roles.ts

export enum Peers {
    Svr = "Svr", FO2 = "FO2", FO1 = "FO1", SM1 = "SM1",
};

export type All = Self | Peers;
export type Self = "SM2";

export type PeersToMapped<Value> = {
    [Role in Peers]: Value
};

// Aliases
export const Self: Self = "SM2";
export const Server: Peers = Peers.Svr;