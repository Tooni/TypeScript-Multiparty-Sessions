import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Teams from "./Teams";

interface CodenamesBoardProps {
    boardState: Map<string, [Teams, boolean]>;
    picker: (choice: string, child: JSX.Element) => JSX.Element;
    disabled: boolean;
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    default: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    blue: {
        padding: theme.spacing(2),
        textAlign: 'center',
        background: theme.palette.info.light,
        color: theme.palette.getContrastText(theme.palette.info.light),
        "&:disabled": {
            color: "rgba(0,0,0,0.8)"
        }
    },
    red: {
        padding: theme.spacing(2),
        textAlign: 'center',
        background: theme.palette.error.light,
        color: theme.palette.getContrastText(theme.palette.error.light),
        "&:disabled": {
            color: "rgba(0,0,0,0.8)"
        }
    },
    bystander: {
        padding: theme.spacing(2),
        textAlign: 'center',
        background: theme.palette.warning.light,
        color: theme.palette.getContrastText(theme.palette.warning.light),
        "&:disabled": {
            color: "rgba(0,0,0,0.8)"
        }
    },
    picked: {
        textDecorationLine: "line-through",
        textDecorationThickness: "2px"
    }
}));

export default function CodenamesBoard(props: CodenamesBoardProps) {
    const classes = useStyles();

    const codenameMap = props.boardState;
    let itemList = new Array<React.ReactElement>();
    codenameMap.forEach(([agentColour, picked]: [Teams, boolean], codename: string) => {
        console.log(picked)
        let bgColour = classes.default;
        switch (agentColour) {
            case Teams.Red:
                bgColour = classes.red;
                break;
            case Teams.Blue:
                bgColour = classes.blue;
                break;
            case Teams.InnocentBystander:
                bgColour = classes.bystander;
                break;
            case Teams.Unknown:
                bgColour = classes.default;
                break;
            default:
                bgColour = classes.default;
                break;
        }
        const button = <Button className={bgColour + ` ${picked ? classes.picked : ""}`} disabled={props.disabled} fullWidth>{codename}</Button>;
        itemList.push(<td>{props.picker(codename, button)}</td>)
    });
    console.log('\n')

    return (
        <div className={classes.root}>
            <table style={{ marginLeft: "auto", marginRight: "auto", borderSpacing: "16px" }}>
                <tbody>
                    {[...Array(5)].map((_, i) =>
                        <tr>
                            {itemList.slice(i * 5, (i + 1) * 5)}
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}