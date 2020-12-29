import React, { useState } from "react";
import { Button, TextField, Grid, Tooltip } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import SocketClient from "../../clients/socket-client";

import SendIcon from "@material-ui/icons/Send";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles({
  outerPaper: {
    minWidth: 600,
    minHeight: 450,
    maxHeight: 450,
    margin: 20,
    padding: 20,
    backgroundColor: "#29364f",
  },
  innerPaper: {
    minWidth: 300,
    maxHeight: 350,
    minHeight: 350,
    margin: 20,
    backgroundColor: "#29364f",
    overflow: "auto",
  },
  divider: {
    margin: 20,
  },
  input: {
    color: "white",
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 20,
    borderRadius: 50,
  },
  hiddenImage: {
    opacity: 0,
    width: 40,
    height: 0,
    marginRight: 20,
    borderRadius: 50,
  },
  whiteText: {
    color: "white",
  },
  greyishBlueText: {
    color: "#AABBFC",
  },
});

const ChatActions = () => {
  const [currentMessage, setCurrentMessage] = useState("");
  const classes = useStyles();
  const history = useHistory();

  const onWriteMessage = (textInput) => {
    if (textInput.length === 0) {
      SocketClient.stoppedTyping();
    } else {
      SocketClient.typing();
    }
    setCurrentMessage(textInput);
  };

  const onSend = () => {
    SocketClient.send(currentMessage);
    setCurrentMessage("");
  };

  const onDisconnect = () => {
    SocketClient.disconnect();
    history.goBack();
  };

  return (
    <Grid justify="center" container spacing={8}>
      <Grid item>
        <Tooltip title="Disconnect">
          <IconButton color="primary" onClick={() => onDisconnect()}>
            <CloseOutlinedIcon />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid item>
        <TextField
          placeholder="Message"
          onChange={(event) => onWriteMessage(event.target.value)}
          value={currentMessage}
          InputProps={{
            className: classes.input,
          }}
        />
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" onClick={() => onSend()}>
          <SendIcon />
        </Button>
      </Grid>
    </Grid>
  );
};

export default ChatActions;
