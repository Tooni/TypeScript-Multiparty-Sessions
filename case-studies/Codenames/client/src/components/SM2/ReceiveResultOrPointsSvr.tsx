import React from 'react';
import { TextField, Button } from '@material-ui/core';
import S11, { Payloads } from '../../Codenames/SM2/S11';
import { MaybePromise } from '../../Codenames/SM2/Types';
import { BoardContext } from "../Board/CodenamesProvider";

export default class ReceiveResultOrPointsSvr extends S11 {
    lose(): MaybePromise<void> {
        this.context.incRedPoints(1);
        this.context.openModal();
    }

    win(): MaybePromise<void> {
        this.context.incBluePoints(1);
        this.context.openModal();
    }

    givePoints(payload: Payloads.givePoints): MaybePromise<void> {
        this.context.incRedPoints(payload.p13);
        this.context.incBluePoints(payload.p23);
    }

    render() {
        return <div>
            {/*<h2>S11: ReceiveResultOrPointsSvr</h2>*/}
        </div>
    }
}
ReceiveResultOrPointsSvr.contextType = BoardContext;