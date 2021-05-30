import React from 'react';
import { TextField, Button } from '@material-ui/core';
import S5, { Payloads } from '../../OnlineWallet/Customer/S5';
import { MaybePromise } from '../../OnlineWallet/Customer/Types';
import { StateContext } from "../../StateContext";

export default class PaymentRequest extends S5 {
    request(payload: Payloads.request): MaybePromise<void> {
        this.context.setMoneyDue(payload.bill);
    }

    render() {
        return <div>
            <h2>S5: PaymentRequest</h2>
        </div>
    }
}
PaymentRequest.contextType = StateContext;