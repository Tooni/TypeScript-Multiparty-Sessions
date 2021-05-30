// =============
// Set up server
// =============

import express from 'express';
import path from 'path';
import http from 'http';
import WebSocket from 'ws';

// ==================
// Implement protocol
// ==================

import { Session, Wallet } from './OnlineWallet';
import { State, Message, Factory } from './OnlineWallet/EFSM';
import DB from "./SessionManager";

const app = express();

// Serve client-side static files.
app.use(express.static(path.join(__dirname, 'client')));

// Create WebSocket server.
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const onlineWalletServerLogic = (sessionID: string) => {
    DB.initSession(sessionID);

    let shared = async(Next: typeof Factory.S2, payload1: Message.S0_login_payload) => {
        return Next({
            pin: (Next: typeof Factory.S3, payload2: Message.S2_pin_payload) => {
                DB.makeTry(sessionID);
                if (payload1.account === 100000 && payload2.pin === 1000) {
                    console.log('Login details correct!');
                    return Next.login_ok({}, (Next: typeof Factory.S5) => {
                        console.log('login_ok sent to customer')
                        return Next.login_ok({}, (Next: typeof Factory.S6) => {
                            console.log('login_ok sent to vendor')
                            DB.deleteSession(sessionID);
                            return Next({
                                authorise: Session.Terminal,
                                reject: Session.Terminal
                            });
                        });
                    })
                }
                const numTries = DB.getNumTries(sessionID);
                if (numTries <= 3) {
                    const msg = `Login details incorrect!  ${4 - numTries} attempts left.`;
                    console.log(msg);
                    return Next.login_retry({ msg }, rec);
                }
                const msg = 'Login details incorrect! You are out of attempts.';
                console.log(msg);
                return Next.login_denied({ msg }, Session.Terminal)
            }
        })
    };

    let rec = (Next: typeof Factory.S0): State.S0 => {
            return Next({
                login: shared
            });
        };

    const handleRequest = Session.Initial({
        login: shared
    });

    return handleRequest;
};

// ============
// Execute EFSM
// ============

new Wallet(
    wss,
    (sessionID, role, reason) => {
        // Simple cancellation handler
        console.error(`${sessionID}: ${role} cancelled session because: ${reason}`);
        DB.deleteSession(sessionID);
    },
    onlineWalletServerLogic
);

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});
