import React from 'react';
import { TextField, Button } from '@material-ui/core';
import S1, { Payloads } from '../../Codenames/FO1/S1';
import { MaybePromise } from '../../Codenames/FO1/Types';
import { BoardContext } from "../Board/CodenamesProvider";

export default class ReceiveClueSM1 extends S1 {
    componentDidMount() {
        super.componentDidMount()
        this.context.updateClue("Waiting for Clue from Spymaster...");
    }

    clue(payload: Payloads.clue): MaybePromise<void> {
        this.context.updateClue(`CLUE: ${payload.clue}, ${payload.numAgents}`);
        // Operative can do one more pick than the number given.
        this.context.updateNumPicksAllowed(payload.numAgents + 1);
        this.context.updateMadeAPick(false);
    }

    render() {
        return <div>
            {/*<h2>S1: ReceiveClueSM1</h2>*/}
        </div>
    }
}
ReceiveClueSM1.contextType = BoardContext;