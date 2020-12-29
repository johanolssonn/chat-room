import React, { useEffect, useRef } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  innerPaper: {
    minWidth: 300,
    maxHeight: 350,
    minHeight: 350,
    margin: 20,
    backgroundColor: "#29364f",
    overflow: "auto",
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

const MessageWindow = (props) => {
  const bottomRef = useRef();
  const classes = useStyles();

  const scrollToBottom = () => {
    bottomRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [props.messagesWithSenders]);

  return (
    <Paper className={classes.innerPaper} elevation={0}>
      <List>
        {props.messagesWithSenders.map((messageWithSender, i) => (
          <ListItem autoFocus={true} key={i}>
            <img className={classes.image} src={messageWithSender.image}></img>
            <ListItemText
              primary={
                <Typography className={classes.greyishBlueText}>
                  {messageWithSender.name}
                </Typography>
              }
              secondary={
                <Typography className={classes.whiteText}>
                  {messageWithSender.message ? messageWithSender.message : ""}{" "}
                </Typography>
              }
            />
          </ListItem>
        ))}
        <ListItem autoFocus={true}>
          <img className={classes.hiddenImage} src={""}></img>
          <ListItemText
            primary={""}
            secondary={
              <Typography className={classes.greyishBlueText}>
                {props.feedback}
              </Typography>
            }
          />
        </ListItem>
        <div ref={bottomRef}></div>
      </List>
    </Paper>
  );
};

export default MessageWindow;
