import React from 'react';
import { TextField, Button } from '@material-ui/core';
import S18, { Payloads } from '../../Codenames/SM2/S18';
import { MaybePromise } from '../../Codenames/SM2/Types';
import { BoardContext } from "../Board/CodenamesProvider";

export default class ReceiveResultOrPointsSvr2 extends S18 {
    lose(): MaybePromise<void> {
        this.context.incRedPoints(1);
        this.context.openModal();
    }

    win(): MaybePromise<void> {
        this.context.incBluePoints(1);
        this.context.openModal();
    }

    givePoints(payload: Payloads.givePoints): MaybePromise<void> {
        this.context.incRedPoints(payload.p15);
        this.context.incBluePoints(payload.p25);
    }

    render() {
        return <div>
            {/*<h2>S18: ReceiveResultOrPointsSvr2</h2>*/}
        </div>
    }
}
ReceiveResultOrPointsSvr2.contextType = BoardContext;