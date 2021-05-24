import React from 'react';
import { TextField, Button } from '@material-ui/core';
import S9, { Payloads } from '../../Codenames/FO1/S9';
import { MaybePromise } from '../../Codenames/FO1/Types';
import { BoardContext } from "../Board/CodenamesProvider";

export default class ReceivePickOrFinishedPickingFO2 extends S9 {
    componentDidMount() {
        super.componentDidMount()
        this.context.updateClue("Waiting for the opponents' turn...")
    }

    finishedPicking(): MaybePromise<void> {
        this.context.updatePick("");
    }

    pick(payload: Payloads.pick): MaybePromise<void> {
        this.context.updatePick(payload.codeName1)
    }

    render() {
        return <div>
            {/*<h2>S9: ReceivePickOrFinishedPickingFO2</h2>*/}
        </div>
    }
}
ReceivePickOrFinishedPickingFO2.contextType = BoardContext;