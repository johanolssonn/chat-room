import React, { useState } from "react";
import { Button, TextField, Grid } from "@material-ui/core";
import SocketClient from "../../clients/socket-client";

import SendIcon from "@material-ui/icons/Send";
import { makeStyles } from "@material-ui/core/styles";

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
  const [isSendDisabled, setIsSendDisabled] = useState(true);
  const classes = useStyles();

  const onWriteMessage = (textInput) => {
    if (textInput.trim().length === 0) {
      setIsSendDisabled(true);
      SocketClient.stoppedTyping();
    } else {
      setIsSendDisabled(false);
      SocketClient.typing();
    }
    setCurrentMessage(textInput);
  };

  const onKeyDown = (event) => {
    if (event.key === 'Enter' && !isSendDisabled) {
      event.preventDefault();
      event.stopPropagation();
      onSend();
    }
  }

  const onSend = () => {
    SocketClient.send(currentMessage);
    setIsSendDisabled(true);
    setCurrentMessage("");
  };

  return (
    <Grid justify="center" container spacing={8}>
      <Grid item>
        <TextField
          onKeyDown={onKeyDown}
          placeholder="Message"
          onChange={(event) => onWriteMessage(event.target.value)}
          value={currentMessage}
          InputProps={{
            className: classes.input,
          }}
        />
      </Grid>
      <Grid item>
        <Button disabled={isSendDisabled} variant="contained" color="primary" onClick={() => onSend()}>
          <SendIcon />
        </Button>
      </Grid>
    </Grid>
  );
};

export default ChatActions;
