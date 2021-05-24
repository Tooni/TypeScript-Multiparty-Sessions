import React from 'react';
import { TextField, Button } from '@material-ui/core';
import S0, { Payloads } from '../../Codenames/FO1/S0';
import { MaybePromise } from '../../Codenames/FO1/Types';
import { BoardContext } from "../Board/CodenamesProvider";
import Teams from "../Board/Teams";

export default class ReceiveCodenamesSvr extends S0 {
    codeNames(payload: Payloads.codeNames): MaybePromise<void> {
        const board = new Map<string, Teams>(this.context.boardState);
        const codeNames = payload.codeNames3.split(",");
        for (const codeName of codeNames) {
            board.set(codeName, Teams.Unknown);
        }
        this.context.updateBoard(board);
        this.context.updateClue("Waiting for Clue from Spymaster...");
    }

    render() {
        return <div>
            {/*<h2>S0: ReceiveCodenamesSvr</h2>*/}
        </div>
    }
}
ReceiveCodenamesSvr.contextType = BoardContext;