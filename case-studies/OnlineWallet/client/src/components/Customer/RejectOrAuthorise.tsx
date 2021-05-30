import React from 'react';
import { TextField, Button } from '@material-ui/core';
import S6 from '../../OnlineWallet/Customer/S6';
import { StateContext } from "../../StateContext";

export default class RejectOrAuthorise extends S6 {

    render() {
        const Reject = this.reject('onClick', ev => ({}));
        const Authorise = this.authorise('onClick', ev => ({}));

        return <div>
            <h2>S6: RejectOrAuthorise</h2>
            <h2>Amount due: &#163;{this.context.moneyDue}</h2>
            <Authorise><Button variant="contained">Authorise</Button></Authorise>
            <Reject><Button variant="contained">Reject</Button></Reject>
        </div>
    }
}
RejectOrAuthorise.contextType = StateContext;