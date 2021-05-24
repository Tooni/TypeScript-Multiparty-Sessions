import React from 'react';
import { TextField, Button } from '@material-ui/core';
import S16, { Payloads } from '../../Codenames/FO2/S16';
import { MaybePromise } from '../../Codenames/FO1/Types';
import { BoardContext } from "../Board/CodenamesProvider";
import Teams from "../Board/Teams";

export default class ReceiveRevealSvr extends S16 {
    reveal(payload: Payloads.reveal): MaybePromise<void> {
        const currPick = this.context.pickState;
        const board = new Map<string, Teams>(this.context.boardState);
        board.set(currPick, Number(payload.compromisedAgents1));
        this.context.updateBoard(board);
        this.context.updatePick("");
    }

    render() {
        return <div>
            {/*<h2>S16: ReceiveRevealSvr</h2>*/}
        </div>
    }
}
ReceiveRevealSvr.contextType = BoardContext;