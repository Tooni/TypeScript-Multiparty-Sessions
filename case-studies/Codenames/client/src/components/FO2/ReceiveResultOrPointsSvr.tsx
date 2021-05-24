import React from 'react';
import { TextField, Button } from '@material-ui/core';
import S17, { Payloads } from '../../Codenames/FO2/S17';
import { MaybePromise } from '../../Codenames/FO1/Types';
import { BoardContext } from "../Board/CodenamesProvider";

export default class ReceiveResultOrPointsSvr extends S17 {
    lose(): MaybePromise<void> {
        this.context.incRedPoints(1);
        this.context.openModal();
    }

    win(): MaybePromise<void> {
        this.context.incBluePoints(1);
        this.context.openModal();
    }

    givePoints(payload: Payloads.givePoints): MaybePromise<void> {
        if (payload.p24 === 0 || this.context.numPicksAllowed === 0) { // if they got it wrong, or ran out of picks, end
            this.context.updateEndTurn(true);
        }
        this.context.incBluePoints(payload.p24);
        this.context.incRedPoints(payload.p14);
    }

    render() {
        return <div>
            {/*<h2>S17: ReceiveResultOrPointsSvr</h2>*/}
        </div>
    }
}
ReceiveResultOrPointsSvr.contextType = BoardContext