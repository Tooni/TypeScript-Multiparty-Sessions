import React from 'react';
import { TextField, Button } from '@material-ui/core';
import S3 from '../../Codenames/FO1/S3';
import { MaybePromise } from '../../Codenames/FO1/Types';
import { BoardContext } from "../Board/CodenamesProvider";
import Teams from '../Board/Teams';

export default class SendPickOrFinishedPickingSvrFO2 extends S3 {
    buttonRef: React.RefObject<HTMLButtonElement>;

    constructor(props: any) {
        super(props);

        this.buttonRef = React.createRef();
    }

    componentDidMount() {
        if (this.context.turnEnded && this.buttonRef.current !== null) {
            this.context.updateEndTurn(false);
            this.buttonRef.current.click();
            return;
        }
        const currentBoard = this.context.boardState;
        const picker = (choice: string, child: JSX.Element): JSX.Element => {
            const PickerElement = (props: any) => {
                const Picker = this.pick('onClick', _ => {
                    this.context.updatePick(choice);
                    this.context.updatePicker(() => (choice: string, child: JSX.Element) => child);
                    this.context.updateNumPicksAllowed(this.context.numPicksAllowed - 1);
                    this.context.updateMadeAPick(true);
                    return { codeName5: props.choice };
                });
                if (currentBoard.get(choice) === Teams.Unknown) {
                    return <Picker>{props.children}</Picker>
                }
                return <>{props.children}</>
            }
            return React.createElement(PickerElement, { choice: choice }, child)
        };
        this.context.updatePicker(() => picker);
    }

    render() {
        const FinishedPickingSvr = this.finishedPicking('onClick', _ => {
            this.context.updatePicker(() => (choice: string, child: JSX.Element) => child)
            return { ignore1: null };
        });

        return <div style={{ marginBottom: "12px" }}>
            {/*<h2>S3: SendPickOrFinishedPickingSvrFO2</h2>*/}
            {this.context.madeAPick &&
              <FinishedPickingSvr><Button ref={this.buttonRef} variant="contained">Finished Picking</Button></FinishedPickingSvr>}
        </div>
    }
}
SendPickOrFinishedPickingSvrFO2.contextType = BoardContext;