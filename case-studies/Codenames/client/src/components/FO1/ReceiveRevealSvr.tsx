import React from 'react';
import { TextField, Button } from '@material-ui/core';
import S13, { Payloads } from '../../Codenames/FO1/S13';
import { MaybePromise } from '../../Codenames/FO1/Types';
import { BoardContext } from "../Board/CodenamesProvider";
import Teams from "../Board/Teams";

export default class ReceiveRevealSvr extends S13 {
    reveal(payload: Payloads.reveal): MaybePromise<void> {
        const currPick = this.context.pickState;
        const board = new Map<string, Teams>(this.context.boardState);
        board.set(currPick, Number(payload.compromisedAgents3));
        this.context.updateBoard(board);
        this.context.updatePick("");
    }

    render() {
        return <div>
            {/*<h2>S13: ReceiveRevealSvr</h2>*/}
        </div>
    }
}
ReceiveRevealSvr.contextType = BoardContext;