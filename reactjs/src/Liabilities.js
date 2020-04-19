import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Common/Title';

import Liability from './Liability';

import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

export default function Liabilities({liabilities, addLiability, editLiability, removeLiability}) {
  //var cleanedNews = props.news;
  var sortedLiabilities = liabilities;//.sort((a,b)=>(new Date(b.datetime))-(new Date(a.datetime)))
  //console.log(sortedLiabilities)

  const [liability, setLiability] = React.useState({name:"",value:"", type:"", income:""})
  const [action, setAction] = React.useState("new")
  const [open, setOpen] = React.useState(false);
  //const [asset, setAsset] = React.useState({})

  const handleEdit = (asset) => {
    console.log(asset);
    setAction("edit");
    setLiability(asset);
    setOpen(true);
  };

  return (
    <React.Fragment>
      <Title id="liabilities">Liabilities</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Duration</TableCell>
            <TableCell>Rate</TableCell>
            <TableCell>Pay/m</TableCell>
            <TableCell padding="checkbox"> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedLiabilities.map(l => (
            <TableRow key={l._key}>
                <TableCell>{l.name}</TableCell>
                <TableCell>{l.amount}</TableCell>
                <TableCell>{l.duration}y</TableCell>
                <TableCell>{l.rate}%</TableCell>
                <TableCell>{l.monthlyPayment}</TableCell>
                <TableCell padding="checkbox">
                  <IconButton aria-label="edit" onClick={() => handleEdit(l)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Liability liability={liability} addLiability={addLiability} editLiability={editLiability} removeLiability={removeLiability} setAction={setAction} action={action} setOpen={setOpen} open={open} setLiability={setLiability}/>
    </React.Fragment>
  );
}
