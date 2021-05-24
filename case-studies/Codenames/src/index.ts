// =============
// Set up server
// =============


import WebSocket from "ws";
import DB from "./GameLogic";
import { Teams } from "./GameConstants";
import express from "express";
import path from "path";
import http from "http";
import { Session, Svr } from "./Codenames/Svr"
import { Handler, State, Factory, Message } from './Codenames/Svr/EFSM';
import { MaybePromise } from "./Codenames/Svr/Utility"

const app = express();

// Serve client-side static files.
app.use(express.static(path.join(__dirname, "client")));

// Create WebSocket server.
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });


const gameManager = (gameId: string) => {
    const { codenamesStr, agentColoursStr } = DB.initGame(gameId);
    
    // todo: once convinced game works, clean this up by removing the 'typeof Factory.SX' annotations

    const Loop1 = (Next: typeof Factory.S4) => Next({
        finishedPicking: Loop2,
        pick: PickLoop1
    });

    const Loop2 = (Next: typeof Factory.S8) => Next({
        finishedPicking: Loop1,
        pick: PickLoop2
    });
    
    const PickLoop1 = (Next: typeof Factory.S31, payload: Message.S4_pick_payload) => {
        const codename = payload.codeName8;
        console.log(`FO1 picked '${codename}'`);
        const { agentColour, gameFinished, colourCorrect, pickedOppositeColour } = DB.makePick(gameId, Teams.Red, codename)
        return Next.reveal({compromisedAgents5: agentColour}, (Next: typeof Factory.S32) =>
                Next.reveal({compromisedAgents6: agentColour}, (Next: typeof Factory.S33) =>
                Next.reveal({compromisedAgents7: agentColour}, (Next: typeof Factory.S34) =>
                Next.reveal({compromisedAgents8: agentColour}, (Next: typeof Factory.S35) => {
                    if (gameFinished) {
                        return colourCorrect
                            ? Next.win({ignore6: null}, (Next: typeof Factory.S45) =>
                                Next.win({}, (Next: typeof Factory.S46) =>
                                Next.lose({}, (Next: typeof Factory.S47) =>
                                Next.lose({}, Session.Terminal))))
                            : Next.lose({ignore5: null}, (Next: typeof Factory.S41) =>
                                Next.lose({}, (Next: typeof Factory.S42) =>
                                Next.win({}, (Next: typeof Factory.S43) =>
                                Next.win({}, Session.Terminal))));
                    } else {
                        const fo1Points = Number(colourCorrect);
                        const fo2Points = Number(pickedOppositeColour);
                        return Next.givePoints({p15: fo1Points, p25: fo2Points}, (Next: typeof Factory.S37) =>
                                Next.givePoints({p16: fo1Points, p26: fo2Points}, (Next: typeof Factory.S38) =>
                                Next.givePoints({p17: fo1Points, p27: fo2Points}, (Next: typeof Factory.S39) =>
                                Next.givePoints({p18: fo1Points, p28: fo2Points}, Loop1))));
                    }
        }))));
    };
    
    const PickLoop2 = (Next: typeof Factory.S12, payload: Message.S8_pick_payload) => {
        const codename = payload.codeName4;
        console.log(`FO2 picked '${codename}'`);
        const { agentColour, gameFinished, colourCorrect, pickedOppositeColour } = DB.makePick(gameId, Teams.Blue, codename)
        return Next.reveal({compromisedAgents1: agentColour}, (Next: typeof Factory.S13) =>
                Next.reveal({compromisedAgents2: agentColour}, (Next: typeof Factory.S14) =>
                Next.reveal({compromisedAgents3: agentColour}, (Next: typeof Factory.S15) =>
                Next.reveal({compromisedAgents4: agentColour}, (Next: typeof Factory.S16) => {
                    if (gameFinished) {
                        return colourCorrect
                            ? Next.lose({ignore3: null}, (Next: typeof Factory.S41) =>
                                Next.lose({}, (Next: typeof Factory.S42) =>
                                Next.win({}, (Next: typeof Factory.S43) =>
                                Next.win({}, Session.Terminal))))
                            : Next.win({ignore4: null}, (Next: typeof Factory.S45) =>
                                Next.win({}, (Next: typeof Factory.S46) =>
                                Next.lose({}, (Next: typeof Factory.S47) =>
                                Next.lose({}, Session.Terminal))))
                    } else {
                        const fo1Points = Number(pickedOppositeColour);
                        const fo2Points = Number(colourCorrect);
                        return Next.givePoints({p11: fo1Points, p21: fo2Points}, (Next: typeof Factory.S18) =>
                                Next.givePoints({p12: fo1Points, p22: fo2Points}, (Next: typeof Factory.S19) =>
                                Next.givePoints({p13: fo1Points, p23: fo2Points}, (Next: typeof Factory.S20) =>
                                Next.givePoints({p14: fo1Points, p24: fo2Points}, Loop2))));
                    }
        }))));
    };

    return Session.Initial.codeNames({codeNames1: codenamesStr}, (Next: typeof Factory.S1) => 
        Next.codeAndAgentNames({codeNames2: codenamesStr, agentColours1: agentColoursStr}, (Next: typeof Factory.S2) => 
            Next.codeNames({codeNames3: codenamesStr}, (Next: typeof Factory.S3) => 
                Next.codeAndAgentNames({codeNames4: codenamesStr, agentColours2: agentColoursStr}, Loop1))));
}

// ============
// Execute EFSM
// ============

new Svr(
    wss,
    (sessionID: any, role: any, reason: any) => {
        // Simple cancellation handler
        console.error(`${sessionID}: ${role} cancelled session because of ${reason}`);
        DB.deleteGame(sessionID);
    },
    gameManager,
);

const PORT = process.env.PORT ?? 8080;
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});