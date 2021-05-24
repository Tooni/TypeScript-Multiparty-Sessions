import React from 'react';
import { TextField, Button } from '@material-ui/core';
import S9 from '../../Codenames/FO2/S9';
import { MaybePromise } from '../../Codenames/FO2/Types';

export default class SendFinishedPickingFO1 extends S9 {
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
        const FinishPicking = this.finishedPicking('onClick', ev => ({}));

        return <div>
            {/*<h2>S9: SendFinishedPickingFO1</h2>*/}
            <FinishPicking><Button ref={this.buttonRef}>FinishedPickingFO1</Button></FinishPicking>
        </div>
    }
}