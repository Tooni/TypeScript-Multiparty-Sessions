import React from 'react';
import { TextField, Button } from '@material-ui/core';
import S24, { Payloads } from '../../Codenames/FO1/S24';
import { MaybePromise } from '../../Codenames/FO1/Types';
import { BoardContext } from "../Board/CodenamesProvider";

export default class ReceiveResultOrPointsSvr2 extends S24 {
    lose(payload: Payloads.lose): MaybePromise<void> {
        this.context.incBluePoints(1);
        this.context.openModal();
    }

    win(payload: Payloads.win): MaybePromise<void> {
        this.context.incRedPoints(1);
        this.context.openModal();
    }

    givePoints(payload: Payloads.givePoints): MaybePromise<void> {
        if (payload.p18 === 0 || this.context.numPicksAllowed === 0) { // if they got it wrong, or ran out of picks, end
            this.context.updateEndTurn(true);
        }
        this.context.incRedPoints(payload.p18);
        this.context.incBluePoints(payload.p28);
    }

    render() {
        return <div>
            {/*<h2>S24: ReceiveResultOrPointsSvr2</h2>*/}
        </div>
    }
}
ReceiveResultOrPointsSvr2.contextType = BoardContext;