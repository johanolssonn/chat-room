import React, { useEffect, useState } from "react";
import { Divider, Grid, Paper } from "@material-ui/core";
import SocketClient from "../../clients/socket-client";
import { makeStyles } from "@material-ui/core/styles";
import MessageWindow from "./MessageWindow";
import ChatActions from "./ChatActions";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  outerPaper: {
    minWidth: 600,
    minHeight: 450,
    maxHeight: 450,
    margin: 20,
    padding: 20,
    backgroundColor: "#29364f",
  },
  divider: {
    margin: 20,
  },
});

const Chat = () => {
  const [messagesWithSenders, setMessagesWithSenders] = useState([]);
  const [feedback, setFeedback] = useState("");
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    window.onbeforeunload = () => {
      SocketClient.disconnect();
    };

    try {
      SocketClient.on("chat", (data) => {
        setMessagesWithSenders((messages) => messages.concat(data));
        setFeedback("");
      });

      SocketClient.on("typing", (data) => {
        setFeedback(`${data} is typing...`);
      });

      SocketClient.on("stoppedtyping", () => {
        setFeedback("");
      });

      SocketClient.on("join", (data) => {
        console.log("joined:", data.name);
        setMessagesWithSenders((messages) =>
          messages.concat({
            name: `${data.name} joined the room.`,
            image: data.image,
          })
        );
      });

      SocketClient.on("left", (data) => {
        setMessagesWithSenders((messages) =>
          messages.concat({
            name: `${data.name} left the room.`,
            image: data.image,
          })
        );
      });
    } catch {
      history.push('/join');
    }
  }, [history]);

  return (
    <Grid container direction="row" spacing={2}>
      <Paper className={classes.outerPaper} elevation={0}>
        <Grid item>
          <Grid container direction="column" spacing={3}></Grid>
        </Grid>
        <Grid item>
          <MessageWindow
            messagesWithSenders={messagesWithSenders}
            feedback={feedback}
          />
        </Grid>
        <Grid item>
          <Divider className={classes.divider} />
        </Grid>
        <Grid item>
          <ChatActions />
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Chat;
