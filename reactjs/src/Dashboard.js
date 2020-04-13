import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Assets from './Assets';


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({

  title: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 150,
  },
}));

export default function Dashboard({assets}) {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <React.Fragment>
    <Grid item xs={12} md={12} lg={12}>
      <Paper className={classes.paper}>
        <Assets assets={assets}/>
      </Paper>
    </Grid>
    </React.Fragment>
  );
}
