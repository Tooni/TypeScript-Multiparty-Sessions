import React from 'react';
import { TextField, Button } from '@material-ui/core';
import S15 from '../../Codenames/FO2/S15';
import { MaybePromise } from '../../Codenames/FO1/Types';
import { BoardContext } from "../Board/CodenamesProvider";

export default class SendPickSvr extends S15 {
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
        const Pick = this.pick('onClick', ev => ({ codeName4: this.context.pickState }));

        return <div>
            {/*<h2>S15: SendPickSvr</h2>*/}
            <Pick><Button ref={this.buttonRef}>SendPickSvr</Button></Pick>
        </div>
    }
}
SendPickSvr.contextType = BoardContext;