import React from 'react';
import { TextField, Button } from '@material-ui/core';
import S23, { Payloads } from '../../Codenames/FO2/S23';
import { MaybePromise } from '../../Codenames/FO1/Types';
import { BoardContext } from "../Board/CodenamesProvider";
import Teams from "../Board/Teams";

export default class ReceiveRevealSvr2 extends S23 {
    reveal(payload: Payloads.reveal): MaybePromise<void> {
        const currPick = this.context.pickState;
        const board = new Map<string, [Teams, boolean]>(this.context.boardState);
        board.set(currPick, [Number(payload.compromisedAgents5), false]);
        this.context.updateBoard(board);
        this.context.updatePick("");
    }

    render() {
        return <div>
            {/*<h2>S23: ReceiveRevealSvr2</h2>*/}
        </div>
    }
}
ReceiveRevealSvr2.contextType = BoardContext;