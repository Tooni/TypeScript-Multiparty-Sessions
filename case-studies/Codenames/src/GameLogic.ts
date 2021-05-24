import { POSSIBLE_CODENAMES, Teams, NUM_BLUE, NUM_BYSTANDER, NUM_CODENAMES, NUM_RED } from "./GameConstants";

// https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
function shuffleArray(a: Array<Teams>) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

// https://stackoverflow.com/questions/19269545/how-to-get-a-number-of-random-elements-from-an-array
// Not very random but good enough for this.
function getRandomCodenames(): Array<string> {
    return POSSIBLE_CODENAMES.sort(() => Math.random() - Math.random()).slice(0, NUM_CODENAMES)
}

function getCodenamesMap(): Map<string, Teams> {
    const reds = Array(NUM_RED).fill(Teams.Red);
    const blues = Array(NUM_BLUE).fill(Teams.Blue);
    const bystanders = Array(NUM_BYSTANDER).fill(Teams.InnocentBystander);
    let allAgents = reds.concat(blues).concat(bystanders);
    shuffleArray(allAgents);
    let allCodenames = getRandomCodenames();
    const codeNames = new Map<string, Teams>();
    for (let i = 0; i < NUM_CODENAMES; i++) {
        codeNames.set(allCodenames[i], allAgents[i]);
    }
    return codeNames;
}

type GameState = {
    numRedSeen: number;
    numBlueSeen: number;
    codenamesMap: Map<string, Teams>;
}
const GameStore = new Map<string, GameState>();

function initGame(gameId: string) {
    const codenamesMap = getCodenamesMap();
    const codenamesStr = Array.from(codenamesMap.keys()).join(",");
    const agentColoursStr = Array.from(codenamesMap.values()).join(",");

    GameStore.set(gameId, { numBlueSeen: 0, numRedSeen: 0, codenamesMap });
    return {
        codenamesStr, 
        agentColoursStr
    }
}

function makePick(gameId: string, team: Teams.Red | Teams.Blue, codename: string) {
    const { numRedSeen, numBlueSeen, codenamesMap } = GameStore.get(gameId)!;
    if (!codenamesMap.has(codename)) {
        console.log("Couldn't find codename! Program logic is wrong somewhere!")
    }
    const agentColour = codenamesMap.get(codename)!;
    let newNumRedSeen = numRedSeen
    let newNumBlueSeen = numBlueSeen
    if (agentColour === Teams.Red) {
        newNumRedSeen++;
    } else if (agentColour === Teams.Blue) {
        newNumBlueSeen++;
    }
    codenamesMap.delete(codename);
    GameStore.set(gameId, { numBlueSeen: newNumBlueSeen, numRedSeen: newNumRedSeen, codenamesMap });
    const gameFinished = (codenamesMap.size === 0) || (newNumBlueSeen === NUM_BLUE) || (newNumRedSeen === NUM_RED);
    const colourCorrect = (agentColour === team);
    const pickedOppositeColour = (team === Teams.Red) ? (agentColour === Teams.Blue) : (agentColour === Teams.Red);
    return {
        agentColour,
        gameFinished,
        colourCorrect,
        pickedOppositeColour
    }
}

function deleteGame(gameId: string) {
    GameStore.delete(gameId);
}

const statefulGameLogic = {
    initGame,
    makePick,
    deleteGame
};
export default statefulGameLogic;