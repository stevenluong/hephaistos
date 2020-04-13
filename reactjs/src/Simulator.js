import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

import Inputs from './Inputs';
import Simulations from './Simulations';


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

function monthDiff(d1, d2) {
  console.log(d1);
  console.log(d2);
  var months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth() + 1;
  months += d2.getMonth();
  return months <= 0 ? 0 : months;
}
function parseDate(s){
  var d = s.split('/');
  return new Date(d[2],d[1]-1,d[0]);
}
function calcMonthlyPayment(P,r,N){
  if(r == 0)
    return P/N;
  else {
    return r*P/(1-Math.pow(1+r,-N));
  }
}
function simulate(s){
  //console.log(s)
  //https://en.wikipedia.org/wiki/Mortgage_calculator
  var P = s.amount;
  var r = s.rate / 100 / 12;
  var N = (s.duration + 1) * 12;
  var iR = s.insuranceRate / 100 /12;

  s.monthlyPayment = calcMonthlyPayment(P,r,N);

  s.totalCost = s.monthlyPayment*N-P;
  s.insurranceOnlyMonthlyPayment = P * iR;
  s.insurranceOnlyTotalCost = s.insurranceOnlyMonthlyPayment*N;
  s.ratio = s.totalCost/s.amount * 100;
  s.withInsurranceRatio = (s.insurranceOnlyTotalCost + s.totalCost) / P * 100

  if(!s.renegociate)
    return s;
  //console.log(s.startDate);
  var n = monthDiff(parseDate(s.startDate), new Date())
  //console.log(remainingN);
  //console.log(Math.pow(1+r,remainingN)*P)
  s.renegociateAmount = Math.pow(1+r,n)*P- (Math.pow(1+r,n)-1)/r*s.monthlyPayment;
  console.log(s.renegociateAmount)

  s.renegociateDuration = N - n;
  console.log(s.renegociateRate)
  s.renegociateMonthlyPayment = calcMonthlyPayment(s.renegociateAmount,s.renegociateRate/100/12,s.renegociateDuration);
  s.renegociateTotalCost = s.renegociateMonthlyPayment*s.renegociateDuration- s.renegociateAmount;
  s.renegociateRatio = s.renegociateTotalCost/s.renegociateAmount*100;
  s.renegociateDuration = s.renegociateDuration / 12;
  console.log(s)
  return s;
}
export default function Simulator({assets}) {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [insuranceChecked, setInsuranceChecked] = React.useState(true)
  const [renegociateChecked, setRenegociateChecked] = React.useState(false)
  //TODO - Connect to Assets
  var s = {
    //guid : 0,
    amount : 279712.21,
    rate: 1.75,
    duration: 25,
    insuranceRate: 0.36,
    startDate : "05/02/2018"
  }
  var s2 = {
    //guid : 0,
    amount : 170778.74,
    rate: 1.55,
    duration: 288/12,
    insuranceRate: 0.49
  }
  const [simulations, setSimulations] = React.useState([simulate(s),simulate(s2)])
  //console.log(simulations);
  return (
    <React.Fragment>
    <Grid container direction="row" spacing={3}>
      <Grid item xs={12} md={12} lg={3}>
        <Paper className={classes.paper}>
          <Inputs simulations={simulations} insuranceChecked={insuranceChecked} renegociateChecked={renegociateChecked} addSimulation={(s)=>setSimulations([...simulations,simulate(s)])} toggleInsurance={(b)=>setInsuranceChecked(b)} toggleRenegociate={(b)=>setRenegociateChecked(b)}/>
        </Paper>

      </Grid>
      <Grid item xs={12} md={12} lg={9}>
        <Paper className={classes.paper}>
          <Simulations simulations={simulations} insuranceChecked={insuranceChecked} renegociateChecked={renegociateChecked}/>
        </Paper>
        <br/>
        <Paper className={classes.paper}>
          Rates (fixed) as of 13/04/2020:
          <Table>
          <TableHead>
            <TableRow>
              <TableCell>Years</TableCell>
              <TableCell>France</TableCell>
              <TableCell>Australia</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Source</TableCell>
              <TableCell><Link href="https://www.meilleurtaux.com/credit-immobilier/barometre-des-taux.html" color="primary">
                Meilleur Taux
              </Link></TableCell>
              <TableCell><Link href="https://www.bankrate.com/mortgage.aspx" color="primary">
                Bankrate
              </Link></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          <TableRow>
            <TableCell>25 y</TableCell>
            <TableCell>1.59 %</TableCell>
            <TableCell> %</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>20 y</TableCell>
            <TableCell>1.32 %</TableCell>
            <TableCell>3.8 %</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>15 y</TableCell>
            <TableCell>1.14 %</TableCell>
            <TableCell>3.34 %</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>10 y</TableCell>
            <TableCell>0.96 %</TableCell>
            <TableCell> %</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>5 y</TableCell>
            <TableCell>0.82 %</TableCell>
            <TableCell> %</TableCell>
          </TableRow>
          </TableBody>
          </Table>
        </Paper>
      </Grid>
    </Grid>
    </React.Fragment>
  );
}
