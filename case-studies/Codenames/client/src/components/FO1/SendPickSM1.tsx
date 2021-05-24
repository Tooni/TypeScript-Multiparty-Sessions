import React from 'react';
import { TextField, Button } from '@material-ui/core';
import S20 from '../../Codenames/FO1/S20';
import { MaybePromise } from '../../Codenames/FO1/Types';
import { BoardContext } from "../Board/CodenamesProvider";


export default class SendPickSM1 extends S20 {
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

    // todo: give display none styling?
    render() {
        const Pick = this.pick('onClick', ev => ({ codeName6: this.context.pickState }));

        return <div>
            {/*<h2>S20: SendPickSM1</h2>*/}
            <Pick><Button ref={this.buttonRef}>SendPickSM1</Button></Pick>
        </div>
    }
}
SendPickSM1.contextType = BoardContext;