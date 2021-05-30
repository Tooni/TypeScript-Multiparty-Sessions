import React from 'react';
import { TextField, Button } from '@material-ui/core';
import S3, { Payloads } from '../../OnlineWallet/Customer/S3';
import { MaybePromise } from '../../OnlineWallet/Customer/Types';
import { StateContext } from '../../StateContext';

export default class LoginResult extends S3 {
    login_retry(payload: Payloads.login_retry): MaybePromise<void> {
        this.context.setLoginInfo(payload.msg);
    }

    login_ok(): MaybePromise<void> {
        this.context.setLoginInfo("Successfully logged in.");
    }

    login_denied(payload: Payloads.login_denied): MaybePromise<void> {
        this.context.setLoginInfo(payload.msg);
    }

    render() {
        return <div>
            <h2>S3: LoginResult</h2>
        </div>
    }
}
LoginResult.contextType = StateContext;