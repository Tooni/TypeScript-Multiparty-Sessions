import React from "react";
import { CircularProgress, Typography, Container } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import SM2 from "../../Codenames/SM2/SM2";

import ReceiveCodeAndAgentNamesSvr from "./ReceiveCodeAndAgentNamesSvr";
import ReceivePickOrFinishedPickingFO1 from "./ReceivePickOrFinishedPickingFO1";
import SendClueFO2 from "./SendClueFO2";
import ReceivePickOrFinishedPickingFO2 from "./ReceivePickOrFinishedPickingFO2";
import ReceiveRevealSvr from "./ReceiveRevealSvr";
import ReceiveResultOrPointsSvr from "./ReceiveResultOrPointsSvr";
import Terminal from "./Terminal";
import ReceiveRevealSvr2 from "./ReceiveRevealSvr2";
import ReceiveResultOrPointsSvr2 from "./ReceiveResultOrPointsSvr2";

export default class SM2View extends React.Component {
    render() {
        const origin = process.env.REACT_APP_PROXY ?? window.location.origin;
        const endpoint = origin.replace(/^http/, 'ws');
        return (
            <SM2
                endpoint={endpoint}
                states={{
                    S0: ReceiveCodeAndAgentNamesSvr,
                    S1: ReceivePickOrFinishedPickingFO1, 
                    S5: SendClueFO2,
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