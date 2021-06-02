import React from 'react';
import { TextField, Button } from '@material-ui/core';
import S10, { Payloads } from '../../Codenames/SM2/S10';
import { MaybePromise } from '../../Codenames/SM2/Types';
import { BoardContext } from "../Board/CodenamesProvider";
import Teams from "../Board/Teams";

export default class ReceiveRevealSvr extends S10 {
    reveal(payload: Payloads.reveal): MaybePromise<void> {
        const currPick = this.context.pickState;
        const board = new Map<string, [Teams, boolean]>(this.context.boardState);
        board.set(currPick, [payload.compromisedAgents2, true]);
        this.context.updateBoard(board);
        this.context.updatePick("");
        this.context.updateNumCodenames(this.context.numCodenames - 1);
    }

    render() {
        return <div>
            {/*<h2>S10: ReceiveRevealSvr</h2>*/}
        </div>
    }
}
ReceiveRevealSvr.contextType = BoardContext;