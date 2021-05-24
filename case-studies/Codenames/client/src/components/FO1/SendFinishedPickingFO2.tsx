import React from 'react';
import { TextField, Button } from '@material-ui/core';
import S6 from '../../Codenames/FO1/S6';
import { MaybePromise } from '../../Codenames/FO1/Types';


export default class SendFinishedPickingFO2 extends S6 {
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
            {/*<h2>S6: SendFinishedPickingFO2</h2>*/}
            <FinishPicking><Button ref={this.buttonRef}>FinishedPickingFO2</Button></FinishPicking>
        </div>
    }
}