import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Assets from './Assets';
import Liabilities from './Liabilities';
import Cashflow from './Cashflow';
import Tips from './Tips';

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

export default function Dashboard({user, assets,liabilities,addAsset, editAsset, removeAsset, addLiability, editLiability, removeLiability}) {
  const classes = useStyles();

  return (
    <React.Fragment>
    <Grid container direction="row" spacing={3}>
      <Grid item xs={12} md={12} lg={6}>
        <Paper className={classes.paper}>
          <Assets assets={assets} addAsset={addAsset} editAsset={editAsset} removeAsset={removeAsset}/>
        </Paper>
      </Grid>
      <Grid item xs={12} md={12} lg={6}>
        <Paper className={classes.paper}>
          <Liabilities liabilities={liabilities} addLiability={addLiability} editLiability={editLiability} removeLiability={removeLiability}/>
        </Paper>
      </Grid>
      <Grid item xs={12} md={12} lg={6}>
        <Paper className={classes.paper}>
          <Cashflow user={user} assets={assets} liabilities={liabilities}/>
        </Paper>
      </Grid>
      <Grid item xs={12} md={12} lg={6}>
        <Paper className={classes.paper}>
          <Tips/>
        </Paper>
      </Grid>
    </Grid>
    </React.Fragment>
  );
}
