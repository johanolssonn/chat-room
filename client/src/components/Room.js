import Chat from "./chat/Chat";
import Details from "./Details";

import React, { useEffect, useState } from "react";
import { Divider, Grid, Paper, Tooltip } from "@material-ui/core";
import { withRouter, useHistory } from "react-router-dom";
import SocketClient from "../clients/socket-client";
import { makeStyles } from "@material-ui/core/styles";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles({
  paper: {
    marginTop: 150,
    backgroundColor: "#29364f",
  },
});

const Room = () => {
  const [activeChatters, setActiveChatters] = useState([]);
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    SocketClient.on("active", (data) => {
      setActiveChatters(data);
    });
  }, [activeChatters]);

  const onDisconnect = () => {
    SocketClient.disconnect();
    history.goBack();
  };

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item>
        <Paper className={classes.paper}>
          <Grid container direction="row">
            <Grid item>
              <Details activeChatters={activeChatters} />
            </Grid>
            <Grid item>
              <Divider orientation="vertical" />
            </Grid>
            <Grid item>
              <Chat />
            </Grid>
            <Grid item>
            <Tooltip title="Disconnect">
              <IconButton color="primary" onClick={() => onDisconnect()}>
                <CloseOutlinedIcon />
              </IconButton>
            </Tooltip>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default withRouter(Room);
