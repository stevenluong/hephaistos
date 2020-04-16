import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Common/Title';

export default function Liabilities(props) {
  //var cleanedNews = props.news;
  var sortedLiabilities = props.liabilities.sort((a,b)=>(new Date(b.datetime))-(new Date(a.datetime)))
  console.log(sortedLiabilities)
  return (
    <React.Fragment>
      <Title id="liabilities">Liabilities</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Value</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Rate</TableCell>
            <TableCell>Payment per month</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedLiabilities.map(l => (
            <TableRow key={l._key}>
                <TableCell>{l.name}</TableCell>
                <TableCell>{l.amount}</TableCell>
                <TableCell>{l.duration} years</TableCell>
                <TableCell>{l.rate}%</TableCell>
                <TableCell>{l.monthlyPayment}</TableCell>
                <TableCell>{l.start}</TableCell>
            </TableRow>
          ))}

        </TableBody>
      </Table>
    </React.Fragment>
  );
}
