import {
  Button,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  makeStyles,
  DialogContent,
  Divider,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  image: {
    width: 120,
    height: 120,
  },
  dialog: {
    color: "white",
    backgroundColor: "#29364f",
  },
});

const ConfirmPhotoDialog = (props) => {
  const classes = useStyles();

  return (
    <Dialog open={props.isConfirmPhotoDialogOpen}>
      <DialogTitle className={classes.dialog}>Confirm photo</DialogTitle>
      <DialogContent className={classes.dialog}>
        <Grid alignItems="left" container direction="column" spacing={2}>
          <Grid item>
            <Divider />
          </Grid>
          <Grid item>
            <Typography>
              You have an unconfirmed photo. Do you want to use it?
            </Typography>
          </Grid>
          <Grid item>
            <img className={classes.image} src={props.image}></img>
          </Grid>
          <Grid item>
            <Grid container direction="row">
              <Grid item>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={props.handleYesClick}
                >
                  Yes
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{ color: "white" }}
                  onClick={props.handleNoClick}
                >
                  No
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmPhotoDialog;
