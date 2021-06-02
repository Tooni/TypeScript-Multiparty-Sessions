import React from 'react';
import { TextField, Button } from '@material-ui/core';
import S0, { Payloads } from '../../Codenames/SM1/S0';
import { MaybePromise } from '../../Codenames/SM1/Types';
import { BoardContext } from "../Board/CodenamesProvider";
import Teams from "../Board/Teams";

export default class ReceiveCodeAndAgentNamesSvr extends S0 {
    codeAndAgentNames(payload: Payloads.codeAndAgentNames): MaybePromise<void> {
        const board = new Map<string, [Teams, boolean]>(this.context.boardState);
        const codeNames = payload.codeNames4.split(",");
        const agentColours = payload.agentColours2.split(",");
        for (let i = 0; i < codeNames.length; i++) {
            board.set(codeNames[i], [Number(agentColours[i]), false]);
        }
        this.context.updateBoard(board);
    }

    render() {
        return <div>
            {/*<h2>S0: ReceiveCodeAndAgentNamesSvr</h2>*/}
        </div>
    }
}
ReceiveCodeAndAgentNamesSvr.contextType = BoardContext;