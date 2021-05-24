import React from "react";
import { CircularProgress, Typography, Container } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import FO1 from "../../Codenames/FO1/FO1";
import ReceiveCodenamesSvr from "./ReceiveCodenamesSvr";
import ReceiveClueSM1 from "./ReceiveClueSM1";
import SendPickOrFinishedPickingSvrFO2 from "./SendPickOrFinishedPickingSvrFO2";
import SendFinishedPickingFO2 from "./SendFinishedPickingFO2";
import SendFinishedPickingSM1 from "./SendFinishedPickingSM1";
import SendFinishedPickingSM2 from "./SendFinishedPickingSM2";
import ReceivePickOrFinishedPickingFO2 from "./ReceivePickOrFinishedPickingFO2";
import ReceiveRevealSvr from "./ReceiveRevealSvr";
import ReceiveRevealSvr2 from "./ReceiveRevealSvr2";
import ReceiveResultOrPointsSvr from "./ReceiveResultOrPointsSvr";
import ReceiveResultOrPointsSvr2 from "./ReceiveResultOrPointsSvr2";
import Terminal from "./Terminal";
import SendPickSM1 from "./SendPickSM1";
import SendPickSvr from "./SendPickSvr";
import SendPickSM2 from "./SendPickSM2";

export default class FO1View extends React.Component {
    render() {
        const origin = process.env.REACT_APP_PROXY ?? window.location.origin;
        const endpoint = origin.replace(/^http/, 'ws');
        return (
            <FO1
                endpoint={endpoint}
                states={{
                    S0: ReceiveCodenamesSvr,
                    S1: ReceiveClueSM1,
                    S3: SendPickOrFinishedPickingSvrFO2,
                    S6: SendFinishedPickingFO2,
                    S7: SendFinishedPickingSM1,
                    S8: SendFinishedPickingSM2,
                    S9: ReceivePickOrFinishedPickingFO2,
                    S13: ReceiveRevealSvr,
                    S14: ReceiveResultOrPointsSvr, 
                    S17: Terminal,
                    S20: SendPickSM1,
                    S21: SendPickSM2,
                    S22: SendPickSvr,
                    S23: ReceiveRevealSvr2,
                    S24: ReceiveResultOrPointsSvr2
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