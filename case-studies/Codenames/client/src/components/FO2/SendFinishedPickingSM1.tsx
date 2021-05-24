import React from 'react';
import { TextField, Button } from '@material-ui/core';
import S11 from '../../Codenames/FO2/S11';
import { MaybePromise } from '../../Codenames/FO2/Types';


export default class SendFinishedPickingSM1 extends S11 {
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
            {/*<h2>S11: SendFinishedPickingSM1</h2>*/}
            <FinishPicking><Button ref={this.buttonRef}>FinishedPickingSM1</Button></FinishPicking>
        </div>
    }
}