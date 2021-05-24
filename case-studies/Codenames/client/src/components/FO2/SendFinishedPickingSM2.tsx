import React from 'react';
import { TextField, Button } from '@material-ui/core';
import S10 from '../../Codenames/FO2/S10';
import { MaybePromise } from '../../Codenames/FO1/Types';


export default class SendFinishedPickingSM2 extends S10 {
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
            {/*<h2>S10: SendFinishedPickingSM2</h2>*/}
            <FinishPicking><Button ref={this.buttonRef}>FinishedPickingSM2</Button></FinishPicking>
        </div>
    }
}