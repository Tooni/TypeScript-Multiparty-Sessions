import React from 'react';
import './App.css';
import FO1View from "./components/FO1/FO1View";
import FO2View from './components/FO2/FO2View';
import SM1View from "./components/SM1/SM1View";
import SM2View from "./components/SM2/SM2View";
import { BoardContext } from "./components/Board/CodenamesProvider";
import Teams from "./components/Board/Teams";
import CodenamesBoard from "./components/Board/CodenamesBoard"
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import ResultsModal from "./components/Board/ResultModal"

import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";

enum Endpoint { FO1, FO2, SM1, SM2 };

type Context = {
    clearEndpoint: () => void,
};

export const Context = React.createContext<Context>({
    clearEndpoint: () => {},
});

const Provider: React.FunctionComponent<Context> = props => {
    return (
        <Context.Provider value={{
            clearEndpoint: props.clearEndpoint,
        }}>
            {props.children}
        </Context.Provider>
    );
}

const useStyles = makeStyles((theme) => ({
    clue: {
        padding: theme.spacing(2),
        textAlign: 'center',
        background: theme.palette.success.light,
        color: theme.palette.getContrastText(theme.palette.success.light),
        display: "inline-block",
        marginLeft: "auto",
        marginRight: "auto",
        "&:empty": {
            display: "none"
        }
    },
    toolbar1: {
        background: theme.palette.error.light,
        color: theme.palette.getContrastText(theme.palette.error.light),
    },
    toolbar2: {
        background: theme.palette.info.light,
        color: theme.palette.getContrastText(theme.palette.info.light),
    },
    toolbarDefault: {
        background: theme.palette.warning.light,
        color: theme.palette.getContrastText(theme.palette.warning.light),
    }
}));


function App() {
    const [endpoint, setEndpoint] = React.useState<Endpoint>();
    const [boardState, setBoardState] = React.useState<Map<string, [Teams, boolean]>>(new Map<string, [Teams, boolean]>());
    const [clueState, setClue] = React.useState<string>("");
    const [pickerState, setPicker] = React.useState<(choice: string, child: JSX.Element) => JSX.Element>(() => (choice: string, child: JSX.Element) => child);
    const [pickState, setPick] = React.useState<string>("");
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [redPoints, setRedPoints] = React.useState<number>(0);
    const [bluePoints, setBluePoints] = React.useState<number>(0);
    const [numPicksAllowed, setNumPicksAllowed] = React.useState<number>(0);
    const [madeAPick, setMadeAPick] = React.useState<boolean>(false);
    const [turnEnded, setEndTurn] = React.useState<boolean>(false);
    const [numCodenames, setNumCodenames] = React.useState<number>(25);

    const classes = useStyles();
    
    let title = "Codenames: ";
    let endpointStr = "";
    let endpointToolbarClassname = classes.toolbarDefault;
    switch (endpoint) {
      case Endpoint.FO1:
        endpointStr = "Field Operative 1";
        endpointToolbarClassname = classes.toolbar1;
        break;
      case Endpoint.FO2:
        endpointStr = "Field Operative 2";
        endpointToolbarClassname = classes.toolbar2;
        break;
      case Endpoint.SM1:
        endpointStr = "Spymaster 1";
        endpointToolbarClassname = classes.toolbar1;
        break;
      case Endpoint.SM2:
        endpointStr = "Spymaster 2";
        endpointToolbarClassname = classes.toolbar2;
        break;
      default:
        break;
    }
    title = title.concat(endpointStr)

    return (
        <Provider clearEndpoint={() => setEndpoint(undefined)}>
            <div className="App">
                <BoardContext.Provider value={{
                    boardState: boardState, 
                    updateBoard: setBoardState,
                    clueState: clueState,
                    updateClue: setClue,
                    pickerState: pickerState,
                    updatePicker: setPicker,
                    pickState: pickState,
                    updatePick: setPick,
                    openModal: () => setModalOpen(true),
                    modalIsOpen: modalOpen,
                    incRedPoints: (p: number) => setRedPoints(redPoints + p),
                    incBluePoints: (p: number) => setBluePoints(bluePoints + p),
                    redPoints: redPoints,
                    bluePoints: bluePoints,
                    turnEnded: turnEnded,
                    updateEndTurn: (b: boolean) => setEndTurn(b),
                    numPicksAllowed: numPicksAllowed,
                    updateNumPicksAllowed: setNumPicksAllowed,
                    madeAPick: madeAPick,
                    updateMadeAPick: setMadeAPick,
                    numCodenames: numCodenames,
                    updateNumCodenames: setNumCodenames
                }}>

                    <AppBar position='sticky'>
                        <Toolbar className={endpointToolbarClassname}>
                            <Typography variant='h6'>
                                {title}
                            </Typography>
                        </Toolbar>
                    </AppBar>

                    <div style={{ marginTop: '2rem', }}>
                        {endpoint === undefined &&
                        <div>
                            <Typography variant='h5'>Log in as</Typography>
                            <div>
                                {/* change this styling */}
                                <Button style={{
                                    marginLeft: '10px',
                                    marginRight: '10px',
                                }}variant='contained' onClick={() => setEndpoint(Endpoint.FO1)}>FO1</Button>
                                <Button style={{
                                    marginLeft: '10px',
                                    marginRight: '10px',
                                }}variant='contained' onClick={() => setEndpoint(Endpoint.SM1)}>SM1</Button>
                                <Button style={{
                                    marginLeft: '10px',
                                    marginRight: '10px',
                                }}variant='contained' onClick={() => setEndpoint(Endpoint.FO2)}>FO2</Button>
                                <Button style={{
                                    marginLeft: '10px',
                                    marginRight: '10px',
                                }}variant='contained' onClick={() => setEndpoint(Endpoint.SM2)}>SM2</Button>
                            </div>
                        </div>}
                    </div>
                    <BoardContext.Consumer>
                        {({ redPoints, bluePoints, modalIsOpen }) =>
                        endpoint !== undefined && <>
                            <Typography display="inline" variant="h4" color="secondary">{redPoints}</Typography> 
                            <Typography display="inline" variant="h4">&nbsp;&mdash;&nbsp;</Typography>
                            <Typography display="inline" variant="h4" color="primary">{bluePoints}</Typography>
                            <ResultsModal redPoints={redPoints} bluePoints={bluePoints} open={modalIsOpen}/>
                        </>}
                    </BoardContext.Consumer>
                    {endpoint === Endpoint.FO1 &&
                        <FO1View />}
                    {endpoint === Endpoint.FO2 &&
                        <FO2View />}
                    
                    <BoardContext.Consumer>
                        {({ numCodenames }) =>
                            <>{endpoint === Endpoint.SM1 &&
                            <SM1View />}
                            {endpoint === Endpoint.SM2 &&
                            <SM2View />}
                            </>}
                    </BoardContext.Consumer>

                    {(endpoint === Endpoint.FO1 || endpoint === Endpoint.FO2) &&
                    <BoardContext.Consumer>
                        {({ clueState, numPicksAllowed }) =>
                        <Paper className={classes.clue}>
                            {clueState}
                        </Paper>}
                    </BoardContext.Consumer>}
                    
                    {endpoint !== undefined && 
                    <BoardContext.Consumer>
                        {({ boardState, pickerState }) => {
                        return <CodenamesBoard 
                                    disabled={endpoint === Endpoint.SM1 || endpoint === Endpoint.SM2} 
                                    boardState={boardState} 
                                    picker={pickerState}/>
                        }}
                    </BoardContext.Consumer>}
                </BoardContext.Provider>
            </div>
        </Provider>
    );
}

export default App;
