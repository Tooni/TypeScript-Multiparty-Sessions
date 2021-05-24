import React from 'react';
import { TextField, Button } from '@material-ui/core';
import S13 from '../../Codenames/FO2/S13';
import { MaybePromise } from '../../Codenames/FO1/Types';
import { BoardContext } from "../Board/CodenamesProvider";

export default class SendPickSM2 extends S13 {
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
        const Pick = this.pick('onClick', ev => ({ codeName2: this.context.pickState }));

        return <div>
            {/*<h2>S21: SendPickSM1</h2>*/}
            <Pick><Button ref={this.buttonRef}>SendPickSM2</Button></Pick>
        </div>
    }
}
SendPickSM2.contextType = BoardContext;
