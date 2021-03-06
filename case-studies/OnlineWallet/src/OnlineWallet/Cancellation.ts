import { Role } from "./EFSM";

import { MaybePromise } from "./Utility";

export enum Receive {
    NORMAL = 1000,
    CLIENT_BROWSER_CLOSED = 1001,
    LOGICAL_ERROR = 4001,
};

export enum Emit {
    CLIENT_BROWSER_CLOSED = 4000,
    LOGICAL_ERROR = 4001,
    ROLE_OCCUPIED = 4002,
};

export const toChannel = (role: string, reason?: any) => ({
    role,
    reason: reason instanceof Error ? reason.message : reason,
});

export type Cancellation = (reason?: any) => void;

export type Handler<SessionID> = (sessionID: SessionID, role: Role.All, reason?: any) => MaybePromise<void>;