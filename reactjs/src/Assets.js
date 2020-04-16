import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Common/Title';

export default function Assets(props) {
  //var cleanedNews = props.news;
  var sortedAssets = props.assets.sort((a,b)=>(new Date(b.datetime))-(new Date(a.datetime)))
  sortedAssets.forEach(a => {
    a.roi = (a.income*12/a.value * 100).toFixed(2)
  })
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
            <TableCell>Income</TableCell>
            <TableCell>ROI</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedAssets.map(a => (
            <TableRow key={a._key}>
                <TableCell>{a.name}</TableCell>
                <TableCell>{a.value}</TableCell>
                <TableCell>{a.type}</TableCell>
                <TableCell>{a.income}</TableCell>
                <TableCell>{a.roi}%</TableCell>
              </TableRow>
          ))}

        </TableBody>
      </Table>
    </React.Fragment>
  );
}
