import React from 'react';
import { TextField, Button } from '@material-ui/core';
import S14 from '../../Codenames/FO2/S14';
import { MaybePromise } from '../../Codenames/FO1/Types';
import { BoardContext } from "../Board/CodenamesProvider";

export default class SendPickSM1 extends S14 {
    buttonRef: React.RefObject<HTMLButtonElement>;

    constructor(props: any) {
        super(props);

        this.buttonRef = React.createRef();
    }

    componentDidMount() {
        if (this.buttonRef.current !== null) {
            this.buttonRef.current.click();
        }
    }

    render() {
        const Pick = this.pick('onClick', ev => ({ codeName3: this.context.pickState }));

        return <div>
            {/*<h2>S14: SendPickSM1</h2>*/}
            <Pick><Button ref={this.buttonRef}>SendPickSM1</Button></Pick>
        </div>
    }
}
SendPickSM1.contextType = BoardContext;
