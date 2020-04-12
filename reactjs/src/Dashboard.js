import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Keywords from './Keywords';
import Day from './Day';
import News from './News';


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

export default function Dashboard({news}) {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <React.Fragment>
    <Grid container direction="row" spacing={3}>
      <Grid item xs={7} md={12} lg={9}>
        <Paper className={classes.paper}>
          <Keywords news={news}/>
        </Paper>
      </Grid>
      <Grid item xs={5} md={12} lg={3}>
        <Paper className={fixedHeightPaper}>
          <Day />
        </Paper>
      </Grid>
    </Grid>
    <br/>
    <Grid item xs={12} md={12} lg={12}>
      <Paper className={classes.paper}>
        <News news={news}/>
      </Paper>
    </Grid>
    </React.Fragment>
  );
}
