import React from 'react';
import { TextField, Button } from '@material-ui/core';
import S11 from '../../OnlineWallet/Customer/S11';

export default class Reject extends S11 {

    render() {
        const Reject = this.reject('onClick', ev => ({}));

        return <div>
            <h2>S6: Reject</h2>
            <Reject><Button>Reject</Button></Reject>
        </div>
    }
}