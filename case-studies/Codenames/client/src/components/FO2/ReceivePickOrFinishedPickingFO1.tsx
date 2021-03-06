import React from 'react';
import { TextField, Button } from '@material-ui/core';
import S1, { Payloads } from '../../Codenames/FO2/S1';
import { MaybePromise } from '../../Codenames/FO2/Types';
import { BoardContext } from "../Board/CodenamesProvider";

export default class ReceivePickOrFinishedPickingFO1 extends S1 {
    componentDidMount() {
        super.componentDidMount()
        this.context.updateClue("Waiting for the opponents' turn...")
    }

    finishedPicking(): MaybePromise<void> {
        this.context.updatePick("");
    }

    pick(payload: Payloads.pick): MaybePromise<void> {
        this.context.updatePick(payload.codeName5);
    }

    render() {
        return <div>
            {/*<h2>S1: ReceivePickOrFinishedPickingFO1</h2>*/}
        </div>
    }
}
ReceivePickOrFinishedPickingFO1.contextType = BoardContext;