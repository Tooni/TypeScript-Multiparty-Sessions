// Roles.ts

export enum Peers {
    Svr = "Svr", FO1 = "FO1", SM1 = "SM1", SM2 = "SM2",
};

export type All = Self | Peers;
export type Self = "FO2";

export type PeersToMapped<Value> = {
    [Role in Peers]: Value
};

// Aliases
export const Self: Self = "FO2";
export const Server: Peers = Peers.Svr;