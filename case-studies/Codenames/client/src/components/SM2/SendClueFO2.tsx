import React from 'react';
import { TextField, Button, Box, Container } from '@material-ui/core';
import S5 from '../../Codenames/SM2/S5';
import { BoardContext } from "../Board/CodenamesProvider";

type ComponentState = {
    pick: string;
    numAgents: number;
    valid: boolean;
};

export default class SendClueFO2 extends S5<ComponentState> {
    state = {
        pick: "",
        numAgents: 1,
        valid: false
    };

    render() {
        const Clue = this.clue('onClick', ev => ({ clue2: this.state.pick, numAgents2: this.state.numAgents }));

        const numCodenames = this.context.numCodenames;

        return <div>
            {/*<h2>S5: SendClueFO2</h2>*/}
            <Container maxWidth="sm">
            <TextField
                variant="outlined"
                label="Clue"
                id="pick" 
                type="string"
                autoFocus
                error={!this.state.valid}
                value={this.state.pick}
                onChange={(ev: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                    const newText = ev.target.value;
                    this.setState({ pick: ev.target.value, valid: newText !== "" });
                }}>
            </TextField>
            <TextField
                id="numAgents"
                variant="outlined"
                label="#"
                type="number"
                InputProps={{ inputProps: { min: 1, max: numCodenames } }}
                value={this.state.numAgents}
                onChange={(ev: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => 
                    this.setState({ numAgents: Number(ev.target.value) })}>
            </TextField>
            <Box m="1" style={{ marginTop: "12px" }}>
                <Clue>
                    <Button disabled={!this.state.valid} variant="outlined" size="large" style={{ backgroundColor: "#81c784" }}>
                        Send Clue
                    </Button>
                </Clue>
            </Box>
            </Container>
        </div>
    }
}
SendClueFO2.contextType = BoardContext;