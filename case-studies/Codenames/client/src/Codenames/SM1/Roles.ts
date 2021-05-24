// Roles.ts

export enum Peers {
    FO1 = "FO1", Svr = "Svr", SM2 = "SM2", FO2 = "FO2",
};

export type All = Self | Peers;
export type Self = "SM1";

export type PeersToMapped<Value> = {
    [Role in Peers]: Value
};

// Aliases
export const Self: Self = "SM1";
export const Server: Peers = Peers.Svr;