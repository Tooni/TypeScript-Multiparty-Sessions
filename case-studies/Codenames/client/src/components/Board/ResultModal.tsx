import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal'; 

type ResultsModalProps = {
    open: boolean;
    redPoints: number;
    bluePoints: number;
}

const useStyles = makeStyles((theme) => ({
    paper: {
        width: 400,
        position: "absolute",
        float: "left",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function ResultsModal(props: ResultsModalProps) {
    const classes = useStyles();
    const redPoints = props.redPoints;
    const bluePoints = props.bluePoints;

    const body = (
      <div className={classes.paper}>
        <h2>{redPoints >= bluePoints ? "Red" : "Blue"}{" Wins!"}</h2>
        <p>
          Red scored: {redPoints}
        </p>
        <p>
          Blue scored: {bluePoints}
        </p>
      </div>
    );
  
    return (
        <div>
        <Modal open={props.open}>
          {body}
        </Modal>
      </div>
    );
  }