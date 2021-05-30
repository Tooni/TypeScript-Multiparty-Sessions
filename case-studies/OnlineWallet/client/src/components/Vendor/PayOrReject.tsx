import React from 'react';
import { TextField, Button } from '@material-ui/core';
import S4, { Payloads } from '../../OnlineWallet/Vendor/S4';
import { MaybePromise } from '../../OnlineWallet/Vendor/Types';

export default class PayOrReject extends S4 {
    // todo: put this into context
    pay(payload: Payloads.pay): MaybePromise<void> {
        console.log('pay')
        console.log(payload)
    }

    reject(): MaybePromise<void> {
        console.log('reject')
    }

    render() {
        return <div>
            <h2>S4: PayOrReject</h2>
        </div>
    }
}