import React from 'react';
import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Button from '@material-ui/core/Button';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

export default function Assets(props) {
  //var cleanedNews = props.news;
  var sortedAssets = props.assets.sort((a,b)=>(new Date(b.datetime))-(new Date(a.datetime)))
  console.log(sortedAssets)
  return (
    <React.Fragment>
      <Title id="assets">Assets</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Value</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>ROI</TableCell>
            <TableCell>Income</TableCell>
            <TableCell>Cashflow</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedAssets.map(a => (
            <React.Fragment>
            <TableRow key={a.guid}>
                <TableCell>{a.name}</TableCell>
                <TableCell>{a.value}</TableCell>
                <TableCell>{a.type}</TableCell>
                <TableCell>{a.roi}%</TableCell>
                <TableCell>{a.income}</TableCell>
                <TableCell>{a.cashflow}</TableCell>
                <TableCell rowSpan={1} />
              </TableRow>
              <TableRow>
                  <TableCell><i>Loan</i> </TableCell>
                  <TableCell>{a.mortgage.amount}</TableCell>
                  <TableCell>{a.mortgage.duration} years</TableCell>
                  <TableCell>{a.mortgage.rate}%</TableCell>
                  <TableCell>{a.mortgage.monthlyPayment}</TableCell>
                  <TableCell>{a.mortgage.start}</TableCell>
              </TableRow>
              </React.Fragment>
          ))}

        </TableBody>
      </Table>
    </React.Fragment>
  );
}
