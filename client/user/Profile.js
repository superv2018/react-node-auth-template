import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  List,
  Divider,
  Paper,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Edit, Person } from "@material-ui/icons";
import { Link } from "react-router-dom";

import DeleteUser from "./DeleteUser";
import { read } from "./api-user";
import auth from "../auth/auth-helper";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    margin: "auto",
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
  },
  title: {
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(2)}px`,
    color: theme.palette.protectedTitle,
  },
}));

const Profile = ({ match }) => {
  const [user, setUser] = useState("");
  const [redirectToSignin, setRedirectToSignin] = useState(false);

  const init = (userId) => {
    const jwt = auth.isAuthenticated();
    read(
      {
        userId: userId,
      },
      { t: jwt.token }
    ).then((data) => {
      if (data.error) setRedirectToSignin(true);
      else setUser(data);
    });
  };

  useEffect(() => {
    init(match.params.userId);
  }, [match.params.userId]);

  const classes = useStyles();

  const redirect = redirectToSignin;

  if (redirect) {
    return <Redirect to="/signin" />;
  }

  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          Profile
        </Typography>
        <List dense>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <Person />
              </Avatar>
            </ListItemAvatar>
            {/** dispay edit and delete if its users profile **/}
            <ListItemText primary={user.name} secondary={user.email} />{" "}
            {auth.isAuthenticated().user &&
              auth.isAuthenticated().user._id == user._id && (
                <ListItemSecondaryAction>
                  <Link to={"/user/edit/" + user._id}>
                    <IconButton>
                      <Edit />
                    </IconButton>
                  </Link>
                  <DeleteUser userId={user._id} />
                </ListItemSecondaryAction>
              )}
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary={"Joined: " + new Date(user.created).toDateString()}
            />
          </ListItem>
        </List>
      </Paper>
    </div>
  );
};

export default Profile;
