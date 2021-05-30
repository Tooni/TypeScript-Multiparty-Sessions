import React from "react";
import { CircularProgress, Typography, Container } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import Customer from "../../OnlineWallet/Customer/Customer";
import LoginAccount from "./LoginAccount";
import LoginPin from "./LoginPin";
import LoginResult from "./LoginResult";
import PaymentRequest from "./PaymentRequest";
import RejectOrAuthorise from "./RejectOrAuthorise";
import Pay from "./Pay";
import Terminal from "./Terminal";
import Reject from "./Reject";

export default class CustomerView extends React.Component {
    render() {
        const origin = process.env.REACT_APP_PROXY ?? window.location.origin;
        const endpoint = origin.replace(/^http/, 'ws');
        return <Customer
                endpoint={endpoint}
                states={{
                    S0: LoginAccount,
                    S2: LoginPin,
                    S3: LoginResult,
                    S5: PaymentRequest,
                    S6: RejectOrAuthorise,
                    S8: Pay,
                    S9: Terminal,
                    S11: Reject
                }}
                waiting={
                <div>
                    <CircularProgress />
                    <Typography variant='h6'>Shouldn't show this!</Typography>
                </div>
                }
                connectFailed={
                <Container>
                    <Alert severity='error'>Cannot Connect</Alert>   
                </Container>
                }
                cancellation={(role, reason) => {
                    return (  
                    <Container>
                        <Alert severity='error'>{role} cancelled session: {reason}</Alert>
                    </Container>
                    );
                }}
            />;
    }
}