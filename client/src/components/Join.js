import React, { useState, useRef, useCallback } from "react";
import {
  Button,
  TextField,
  Grid,
  Card,
  Dialog,
  DialogTitle,
  Badge,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import SocketClient from "../clients/socket-client";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import Webcam from "react-webcam";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckIcon from "@material-ui/icons/Check";
import UndoIcon from "@material-ui/icons/Undo";

const DEFAULT_IMAGE_LINK =
  "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png";

const useStyles = makeStyles({
  card: {
    maxWidth: 300,
    margin: 20,
    marginTop: 150,
    padding: 80,
    backgroundColor: "#29364f",
  },
  input: {
    color: "white",
  },
  addImage: {
    color: "white",
  },
  whiteText: {
    color: "white",
  },
  dialog: {
    color: "white",
    backgroundColor: "#29364f",
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
  badge: {
    backgroundColor: "#00BC17",
    height: 20,
    width: 10,
  },
});

const Join = () => {
  const [name, setName] = useState("");
  const [takenImage, setTakenImage] = useState("");
  const [finalImage, setFinalImage] = useState(DEFAULT_IMAGE_LINK);
  const [hasTakenPhoto, setHasTakenPhoto] = useState(false);
  const [hasConfirmedPhoto, setHasConfirmedPhoto] = useState(false);
  const [isJoinDisabled, setIsJoinDisabled] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const history = useHistory();
  const classes = useStyles();
  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    setHasTakenPhoto(true);
    const imageSrc = webcamRef.current.getScreenshot();
    setTakenImage(imageSrc);
  }, [webcamRef, setTakenImage]);

  const onJoinClick = () => {
    SocketClient.connect(name, finalImage);
    history.push("/room");
  };

  const onChangeText = (event) => {
    setName(event.target.value);
    setIsJoinDisabled(false);
  };

  const onAddImage = () => {
    setIsDialogOpen(true);
  };

  const confirm = () => {
    setFinalImage(takenImage);
    setHasConfirmedPhoto(true);
    setIsDialogOpen(false);
  };

  const undo = () => {
    setFinalImage(DEFAULT_IMAGE_LINK);
    setHasConfirmedPhoto(false);
    setHasTakenPhoto(false);
  };

  return (
    <Grid container direction="row" justify="center">
      <Card className={classes.card}>
        <Grid container spacing={10} direction="column">
          <Grid item>
            <Typography
              className={classes.whiteText}
              variant="h5"
              component="h2"
              gutterBottom
            >
              Who's joining?
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              placeholder="Name"
              onChange={onChangeText}
              InputProps={{
                className: classes.input,
              }}
            />
          </Grid>
          <Grid item>
            <Badge
              classes={{ badge: classes.badge }}
              invisible={!hasConfirmedPhoto}
              badgeContent={<CheckIcon fontSize="small" />}
              color="primary"
              variant="standard"
            >
              <AddAPhotoIcon
                onClick={onAddImage}
                className={classes.addImage}
                fontSize="medium"
              />
            </Badge>
          </Grid>
          <Dialog aria-labelledby="simple-dialog-title" open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
            <DialogTitle className={classes.dialog} id="simple-dialog-title">
              Take profile picture
            </DialogTitle>
            <Grid className={classes.dialog} container direction="column">
              <Grid item>
                {hasTakenPhoto ? (
                  <img src={takenImage} />
                ) : (
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                  />
                )}
              </Grid>
              <Grid style={{ margin: 8 }} container direction="row">
                <Grid item>
                  <Button onClick={() => setIsDialogOpen(false)}>
                    {<CancelIcon className={classes.icon} />}
                  </Button>
                </Grid>
                {hasTakenPhoto ? (
                  <Grid item>
                    <Button onClick={confirm}>
                      {<CheckIcon className={classes.checkIcon} />}
                    </Button>
                    <Button onClick={undo}>
                      {<UndoIcon className={classes.undoIcon} />}
                    </Button>
                  </Grid>
                ) : (
                  <Grid item>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={capture}
                    >
                      {<PhotoCameraIcon className={classes.icon} />}
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Dialog>
          <Grid item>
            <Button
              size="small"
              disabled={isJoinDisabled}
              onClick={onJoinClick}
              variant="contained"
              color="primary"
            >
              Join
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default Join;
