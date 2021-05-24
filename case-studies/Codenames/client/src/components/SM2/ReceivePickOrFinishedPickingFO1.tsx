import React from 'react';
import { TextField, Button } from '@material-ui/core';
import S1, { Payloads } from '../../Codenames/SM2/S1';
import { MaybePromise } from '../../Codenames/SM2/Types';
import { BoardContext } from "../Board/CodenamesProvider";

type ComponentState = {
    picked: string;
};

export default class ReceivePickOrFinishedPickingFO1 extends S1<ComponentState> {
    state = {
        picked: ""
    };

    finishedPicking(): MaybePromise<void> {
        this.context.updatePick("");
    }

    pick(payload: Payloads.pick): MaybePromise<void> {
        this.context.updatePick(payload.codeName7);
    }

    render() {
        return <div>
            {/*<h2>S1: ReceivePickOrFinishedPickingFO1</h2>*/}
        </div>
    }
}
ReceivePickOrFinishedPickingFO1.contextType = BoardContext;