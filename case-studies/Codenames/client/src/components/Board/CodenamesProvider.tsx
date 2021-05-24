import React from 'react';
import CodenamesBoard from "./CodenamesBoard";
import Teams from "./Teams";

export const BoardContext = React.createContext({
    boardState: new Map<string, Teams>(),
    updateBoard: (boardState: Map<string, Teams>) => {},
    clueState: "",
    updateClue: (clue: string) => {},
    pickerState: (choice: string, child: JSX.Element): JSX.Element => child,
    updatePicker: (newPicker: (choice: string, child: JSX.Element) => JSX.Element) => {},
    pickState: "",
    updatePick: (newPick: string) => {},
    openModal: () => {},
    modalIsOpen: false,
    incRedPoints: (p: number) => {},
    incBluePoints: (p: number) => {},
    redPoints: 0,
    bluePoints: 0,
    turnEnded: false,
    updateEndTurn: (b: boolean) => {},
    numPicksAllowed: 0,
    updateNumPicksAllowed: (n: number) => {},
    madeAPick: false,
    updateMadeAPick: (b: boolean) => {},
});