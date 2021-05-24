import React from "react";
import { CircularProgress, Typography, Container } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import FO2 from "../../Codenames/FO2/FO2";
import ReceiveCodenamesSvr from "./ReceiveCodenamesSvr";
import ReceivePickOrFinishedPickingFO1 from "./ReceivePickOrFinishedPickingFO1";
import ReceiveClueSM2 from "./ReceiveClueSM2";
import SendPickOrFinishedPickingSvrFO1 from "./SendPickOrFinishedPickingSvrFO1";
import SendFinishedPickingFO1 from "./SendFinishedPickingFO1";
import SendFinishedPickingSM2 from "./SendFinishedPickingSM2";
import SendFinishedPickingSM1 from "./SendFinishedPickingSM1";
import SendPickSM2 from "./SendPickSM2";
import SendPickSM1 from "./SendPickSM1";
import SendPickSvr from "./SendPickSvr";
import ReceiveRevealSvr from "./ReceiveRevealSvr";
import ReceiveRevealSvr2 from "./ReceiveRevealSvr2";
import ReceiveResultOrPointsSvr from "./ReceiveResultOrPointsSvr";
import ReceiveResultOrPointsSvr2 from "./ReceiveResultOrPointsSvr2";
import Terminal from "./Terminal";

export default class FO2View extends React.Component {
    render() {
        const origin = process.env.REACT_APP_PROXY ?? window.location.origin;
        const endpoint = origin.replace(/^http/, 'ws');
        return (
            <FO2
                endpoint={endpoint}
                states={{
                    S0: ReceiveCodenamesSvr,
                    S1: ReceivePickOrFinishedPickingFO1,
                    S5: ReceiveClueSM2,
                    S6: SendPickOrFinishedPickingSvrFO1,
                    S9: SendFinishedPickingFO1,
                    S10: SendFinishedPickingSM2,
                    S11: SendFinishedPickingSM1,
                    S13: SendPickSM2,
                    S14: SendPickSM1,
                    S15: SendPickSvr,
                    S16: ReceiveRevealSvr,
                    S17: ReceiveResultOrPointsSvr,
                    S20: Terminal,
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