import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Teams from "./Teams";
import { BoardContext } from "./CodenamesProvider";

interface CodenamesBoardProps {
    boardState: Map<string, Teams>;
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
      color: "rgba(0,0,0,0.6)"
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
      color: "rgba(0,0,0,0.6)"
    }
  },
}));

export default function CodenamesBoard(props: CodenamesBoardProps) {
  const classes = useStyles();

  const codenameMap = props.boardState;
  let itemList = new Array<React.ReactElement>();
  codenameMap.forEach((agentColour: Teams, codename: string) => { 
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
    const button = <Button disabled={props.disabled} fullWidth className={bgColour}>{codename}</Button>;
    itemList.push(<td>{props.picker(codename, button)}</td>)
  });

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