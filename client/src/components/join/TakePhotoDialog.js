import React from "react";
import {
  Button,
  Grid,
  Dialog,
  DialogTitle,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import Webcam from "react-webcam";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckIcon from "@material-ui/icons/Check";
import UndoIcon from "@material-ui/icons/Undo";

const useStyles = makeStyles({
  dialog: {
    color: "white",
    backgroundColor: "#29364f",
    overflow: "hidden",
  },
  icon: {
    color: "white",
  },
  checkIcon: {
    color: "green",
  },
  undoIcon: {
    color: "red",
  },
});

const TakePhotoDialog = (props) => {
  const classes = useStyles();
  return (
    <Dialog
      aria-labelledby="simple-dialog-title"
      open={props.isDialogOpen}
      onClose={props.handleClose}
    >
      <DialogTitle className={classes.dialog}>Take profile picture</DialogTitle>
      <Grid className={classes.dialog} container direction="column">
        <Grid item>
          {props.hasTakenPhoto ? (
            <img src={props.takenImage} />
          ) : (
            <Webcam
              audio={false}
              ref={props.webcamRef}
              screenshotFormat="image/jpeg"
            />
          )}
        </Grid>
        <Grid style={{ margin: 8 }} container direction="row">
          <Grid item>
            <Button onClick={props.handleClose}>
              {<CancelIcon className={classes.icon} />}
            </Button>
          </Grid>
          {props.hasTakenPhoto ? (
            <Grid item>
              <Button onClick={props.handleConfirmation}>
                {<CheckIcon className={classes.checkIcon} />}
              </Button>
              <Button onClick={props.handleUndo}>
                {<UndoIcon className={classes.undoIcon} />}
              </Button>
            </Grid>
          ) : (
            <Grid item>
              <Button
                color="primary"
                variant="contained"
                onClick={props.handleCapture}
              >
                {<PhotoCameraIcon className={classes.icon} />}
              </Button>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default TakePhotoDialog;
