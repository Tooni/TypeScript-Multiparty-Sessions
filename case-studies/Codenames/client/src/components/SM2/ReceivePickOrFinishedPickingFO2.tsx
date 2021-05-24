import React from 'react';
import { TextField, Button } from '@material-ui/core';
import S6, { Payloads } from '../../Codenames/SM2/S6';
import { MaybePromise } from '../../Codenames/SM2/Types';
import { BoardContext } from "../Board/CodenamesProvider";

export default class ReceivePickOrFinishedPickingFO2 extends S6 {
    finishedPicking(): MaybePromise<void> {
        this.context.updatePick("");
    }

    pick(payload: Payloads.pick): MaybePromise<void> {
        this.context.updatePick(payload.codeName2);
    }

    render() {
        return <div>
            {/*<h2>S6: ReceivePickOrFinishedPickingFO2</h2>*/}
        </div>
    }
}
ReceivePickOrFinishedPickingFO2.contextType = BoardContext;