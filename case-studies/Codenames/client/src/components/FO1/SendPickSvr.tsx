import React from 'react';
import { TextField, Button } from '@material-ui/core';
import S22 from '../../Codenames/FO1/S22';
import { MaybePromise } from '../../Codenames/FO1/Types';
import { BoardContext } from "../Board/CodenamesProvider";

export default class SendPickSvr extends S22 {
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
        const Pick = this.pick('onClick', ev => ({ codeName8: this.context.pickState }));

        return <div>
            {/*<h2>S22: SendPickSvr</h2>*/}
            <Pick><Button ref={this.buttonRef}>SendPickSvr</Button></Pick>
        </div>
    }
}
SendPickSvr.contextType = BoardContext;