import React from 'react';
import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Button from '@material-ui/core/Button';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

export default function Simulations(props) {
  var simulations = props.simulations;
  //var sortedAssets = props.assets.sort((a,b)=>(new Date(b.datetime))-(new Date(a.datetime)))
  //console.log(props.insuranceChecked);
  return (
    <React.Fragment>
      <Title>Simulations</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Amount</TableCell>
            <TableCell>Rate</TableCell>
            <TableCell>Duration</TableCell>
            {props.insuranceChecked && (<TableCell>Insurance Rate</TableCell>)}
            <TableCell>Monthly Payment {props.insuranceChecked && (<span>(Insurrance)</span>)}</TableCell>
            <TableCell>Total Cost {props.insuranceChecked && (<span>(Insurrance)</span>)}</TableCell>
            <TableCell>Ratio {props.insuranceChecked && (<span>(Insurrance)</span>)}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {simulations.map(s => (
            <React.Fragment>
            <TableRow key={s.guid}>
                <TableCell>{s.amount} {s.renegociate && (<span><br/>Remaining :- {s.renegociateAmount.toFixed(2)}</span>)}</TableCell>
                <TableCell>{s.rate}% {s.renegociate && (<span><br/>New - {s.renegociateRate}</span>)}</TableCell>
                <TableCell>{s.duration} y {s.renegociate && (<span><br/>Remaining - {s.renegociateDuration}</span>)}</TableCell>
                {props.insuranceChecked && (<TableCell>{s.insuranceRate}%</TableCell>)}
                <TableCell>{s.monthlyPayment.toFixed(0)}
                {props.insuranceChecked && (<span>(+ {s.insurranceOnlyMonthlyPayment.toFixed(0)} = {(s.monthlyPayment+s.insurranceOnlyMonthlyPayment).toFixed(0)}) </span>)}
                {s.renegociate && (<span><br/>Renegociate : {s.renegociateMonthlyPayment.toFixed(0)}</span>)}
                </TableCell>
                <TableCell>
                {s.totalCost.toFixed(0)}
                {props.insuranceChecked && (<span>(+ {s.insurranceOnlyTotalCost.toFixed(0)} = {(s.totalCost+s.insurranceOnlyTotalCost).toFixed(0)})</span>)}
                {s.renegociate && (<span><br/>Renegociate : {s.renegociateTotalCost.toFixed(0)}</span>)}
                </TableCell>
                <TableCell>
                {s.ratio.toFixed(0)}%
                {props.insuranceChecked && (<span>({s.withInsurranceRatio.toFixed(0)}%)</span>)}
                {s.renegociate && (<span><br/>Renegociate : {s.renegociateRatio.toFixed(0)}%</span>)}
                </TableCell>
            </TableRow>
            </React.Fragment>
          ))}

        </TableBody>
      </Table>
    </React.Fragment>
  );
}
