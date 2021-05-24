import React from "react";
import { CircularProgress, Typography, Container } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import SM1 from "../../Codenames/SM1/SM1";

import ReceiveCodeAndAgentNamesSvr from "./ReceiveCodeAndAgentNamesSvr";
import SendClueFO1 from "./SendClueFO1";
import ReceivePickOrFinishedPickingFO1 from "./ReceivePickOrFinishedPickingFO1";
import ReceivePickOrFinishedPickingFO2 from "./ReceivePickOrFinishedPickingFO2";
import ReceiveRevealSvr from "./ReceiveRevealSvr";
import ReceiveResultOrPointsSvr from "./ReceiveResultOrPointsSvr";
import ReceiveResultOrPointsSvr2 from "./ReceiveResultOrPointsSvr2";
import Terminal from "../FO1/Terminal";
import ReceiveRevealSvr2 from "./ReceiveRevealSvr2";

export default class SM1View extends React.Component {
    render() {
        const origin = process.env.REACT_APP_PROXY ?? window.location.origin;
        const endpoint = origin.replace(/^http/, 'ws');
        return (
            <SM1
                endpoint={endpoint}
                states={{
                    S0: ReceiveCodeAndAgentNamesSvr,
                    S1: SendClueFO1,
                    S3: ReceivePickOrFinishedPickingFO1,
                    S6: ReceivePickOrFinishedPickingFO2,
                    S10: ReceiveRevealSvr,
                    S11: ReceiveResultOrPointsSvr,
                    S14: Terminal,
                    S17: ReceiveRevealSvr2,
                    S18: ReceiveResultOrPointsSvr2
                }}
                waiting={
                <div>
                    <CircularProgress />
                    <Typography variant='h6'>Waiting for other players.</Typography>
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
            />
        );
    }
}