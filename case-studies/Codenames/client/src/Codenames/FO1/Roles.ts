// Roles.ts

export enum Peers {
    Svr = "Svr", SM2 = "SM2", FO2 = "FO2", SM1 = "SM1",
};

export type All = Self | Peers;
export type Self = "FO1";

export type PeersToMapped<Value> = {
    [Role in Peers]: Value
};

// Aliases
export const Self: Self = "FO1";
export const Server: Peers = Peers.Svr;