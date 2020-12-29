import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Grid,
  Typography,
} from "@material-ui/core";
import "./style/Details.css";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  whiteText: {
    color: "white",
  },
});

const Details = (props) => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item>
        <List>
          {props.activeChatters.map((activeChatter, i) => (
            <ListItem autoFocus={true} key={i}>
              <ListItemText
                style={{ marginRight: 5 }}
                primary={
                  <Typography className={classes.whiteText}>
                    {activeChatter}
                  </Typography>
                }
              />
              <span className="circle" />
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};

export default Details;
