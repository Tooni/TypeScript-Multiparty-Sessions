import React from 'react';
import { TextField, Button } from '@material-ui/core';
import S8 from '../../OnlineWallet/Customer/S8';
import { StateContext } from "../../StateContext";

export default class Pay extends S8 {

    render() {
        const Pay = this.pay('onClick', ev => ({payment: this.context.moneyDue}));

        return <div>
            <h2>S8: Pay</h2>
            <h2>Make payment of &#163;{this.context.moneyDue}</h2>
            <Pay><Button variant="contained">Pay</Button></Pay>
        </div>
    }
}
Pay.contextType = StateContext;