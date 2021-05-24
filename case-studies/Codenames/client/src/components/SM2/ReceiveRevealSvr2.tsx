import React from 'react';
import { TextField, Button } from '@material-ui/core';
import S17, { Payloads } from '../../Codenames/SM2/S17';
import { MaybePromise } from '../../Codenames/SM2/Types';
import { BoardContext } from "../Board/CodenamesProvider";
import Teams from "../Board/Teams";

export default class ReceiveRevealSvr extends S17 {
    reveal(payload: Payloads.reveal): MaybePromise<void> {
        const currPick = this.context.pickState;
        const board = new Map<string, Teams>(this.context.boardState);
        board.set(currPick, Number(payload.compromisedAgents6));
        this.context.updateBoard(board);
        this.context.updatePick("");
    }

    render() {
        return <div>
            {/*<h2>S17: ReceiveRevealSvr</h2>*/}
        </div>
    }
}
ReceiveRevealSvr.contextType = BoardContext;