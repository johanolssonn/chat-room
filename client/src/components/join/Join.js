import React, { useState, useRef, useCallback } from "react";
import {
  Button,
  TextField,
  Grid,
  Card,
  Badge,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import SocketClient from "../../clients/socket-client";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import CheckIcon from "@material-ui/icons/Check";
import ConfirmPhotoDialog from "./ConfirmPhotoDialog";
import TakePhotoDialog from "./TakePhotoDialog";
import defaultProfileImage from '../../assets/profile.png';

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
  badge: {
    backgroundColor: "#00BC17",
    height: 20,
    width: 10,
  },
});

const Join = () => {
  const [name, setName] = useState("");
  const [takenImage, setTakenImage] = useState("");
  const [finalImage, setFinalImage] = useState(defaultProfileImage);
  const [hasTakenPhoto, setHasTakenPhoto] = useState(false);
  const [hasConfirmedPhoto, setHasConfirmedPhoto] = useState(false);
  const [isJoinDisabled, setIsJoinDisabled] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConfirmPhotoDialogOpen, setIsConfirmPhotoDialogOpen] = useState(
    false
  );
  const history = useHistory();
  const classes = useStyles();
  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    setHasTakenPhoto(true);
    const imageSrc = webcamRef.current.getScreenshot();
    setTakenImage(imageSrc);
  }, [webcamRef, setTakenImage]);

  const onJoinClick = () => {
    if (hasTakenPhoto && !hasConfirmedPhoto) {
      setIsConfirmPhotoDialogOpen(true);
    } else {
      SocketClient.connect(name, finalImage);
      history.push("/room");
    }
  };

  const onYesClick = () => {
    setIsConfirmPhotoDialogOpen(false);
    // TODO: should set finalImage and call a join function
    SocketClient.connect(name, takenImage);
    history.push("/room");
  };

  const onNoClick = () => {
    setIsConfirmPhotoDialogOpen(false);
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
    setFinalImage(defaultProfileImage);
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
                fontSize="default"
              />
            </Badge>
          </Grid>
          <TakePhotoDialog
            webcamRef={webcamRef}
            takenImage={takenImage}
            hasTakenPhoto={hasTakenPhoto}
            isDialogOpen={isDialogOpen}
            handleCapture={capture}
            handleUndo={undo}
            handleConfirmation={confirm}
            handleClose={() => setIsDialogOpen(false)}
          ></TakePhotoDialog>
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
            <ConfirmPhotoDialog
              isConfirmPhotoDialogOpen={isConfirmPhotoDialogOpen}
              image={takenImage}
              handleYesClick={onYesClick}
              handleNoClick={onNoClick}
            ></ConfirmPhotoDialog>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default Join;
