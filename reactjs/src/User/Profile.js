import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import Title from '../Common/Title';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  }
}));

export default function Profile({user}) {
  const classes = useStyles();
  //console.log(fetch);
  return (

          <Paper className={classes.paper}>
            <Title>Profile</Title>
            <p>
            Email : {user.email}
            </p>
          </Paper>

  );
}
