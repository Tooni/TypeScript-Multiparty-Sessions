import React from 'react';
import { TextField, Button } from '@material-ui/core';
import S14, { Payloads } from '../../Codenames/FO1/S14';
import { MaybePromise } from '../../Codenames/FO1/Types';
import { BoardContext } from "../Board/CodenamesProvider";

export default class ReceiveResultOrPointsSvr extends S14 {
    lose(payload: Payloads.lose): MaybePromise<void> {
        this.context.incBluePoints(1);
        this.context.openModal();
    }

    win(payload: Payloads.win): MaybePromise<void> {
        this.context.incRedPoints(1);
        this.context.openModal();
    }

    givePoints(payload: Payloads.givePoints): MaybePromise<void> {
        this.context.incRedPoints(payload.p12);
        this.context.incBluePoints(payload.p22);
    }

    render() {
        return <div>
            {/*<h2>S14: ReceiveResultOrPointsSvr</h2>*/}
        </div>;
    }
}
ReceiveResultOrPointsSvr.contextType = BoardContext;