import React from 'react';
import { TextField, Button } from '@material-ui/core';
import S5, { Payloads } from '../../Codenames/FO2/S5';
import { MaybePromise } from '../../Codenames/FO1/Types';
import { BoardContext } from "../Board/CodenamesProvider";

export default class ReceiveClueSM2 extends S5 {
    componentDidMount() {
        super.componentDidMount()
        this.context.updateClue("Waiting for Clue from Spymaster...");
    }

    clue(payload: Payloads.clue): MaybePromise<void> {
        this.context.updateClue(`CLUE: ${payload.clue2}, ${payload.numAgents2}`);
        // Operative can do one more pick than the number given.
        this.context.updateNumPicksAllowed(payload.numAgents2 + 1);
        this.context.updateMadeAPick(false);
    }

    render() {
        return <div>
            {/*<h2>S5: ReceiveClueSM2</h2>*/}
        </div>
    }
}
ReceiveClueSM2.contextType = BoardContext;