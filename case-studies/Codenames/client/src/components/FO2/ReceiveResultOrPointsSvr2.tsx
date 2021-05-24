import React from 'react';
import { TextField, Button } from '@material-ui/core';
import S24, { Payloads } from '../../Codenames/FO2/S24';
import { MaybePromise } from '../../Codenames/FO1/Types';
import { BoardContext } from "../Board/CodenamesProvider";

export default class ReceiveResultOrPointsSvr2 extends S24 {
    lose(): MaybePromise<void> {
        this.context.incRedPoints(1);
        this.context.openModal();
    }

    win(): MaybePromise<void> {
        this.context.incBluePoints(1);
        this.context.openModal();
    }

    givePoints(payload: Payloads.givePoints): MaybePromise<void> {
        this.context.incRedPoints(payload.p16);
        this.context.incBluePoints(payload.p26);
    }

    render() {
        return <div>
            {/*<h2>S24: ReceiveResultOrPointsSvr2</h2>*/}
        </div>
    }
}
ReceiveResultOrPointsSvr2.contextType = BoardContext