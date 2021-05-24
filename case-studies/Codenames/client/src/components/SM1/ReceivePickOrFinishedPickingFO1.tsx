import React from 'react';
import S3, { Payloads } from '../../Codenames/SM1/S3';
import { MaybePromise } from '../../Codenames/SM1/Types';
import { BoardContext } from "../Board/CodenamesProvider";

export default class ReceivePickOrFinishedPickingFO1 extends S3 {
    finishedPicking(): MaybePromise<void> {
        this.context.updatePick("");
    }

    pick(payload: Payloads.pick): MaybePromise<void> {
        this.context.updatePick(payload.codeName6);
    }

    render() {
        return <div>
            {/*<h2>S3: ReceivePickOrFinishedPickingFO1</h2>*/}
        </div>
    }
}
ReceivePickOrFinishedPickingFO1.contextType = BoardContext;