import React from 'react';
import { TextField, Button } from '@material-ui/core';
import S21 from '../../Codenames/FO1/S21';
import { MaybePromise } from '../../Codenames/FO1/Types';
import { BoardContext } from "../Board/CodenamesProvider";

export default class SendPickSM2 extends S21 {
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
        const Pick = this.pick('onClick', ev => ({ codeName7: this.context.pickState }));

        return <div>
            {/*<h2>S21: SendPickSM2</h2>*/}
            <Pick><Button ref={this.buttonRef}>SendPickSM2</Button></Pick>
        </div>
    }
}
SendPickSM2.contextType = BoardContext;