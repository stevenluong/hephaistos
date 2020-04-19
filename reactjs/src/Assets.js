import React from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Title from './Common/Title';
import Asset from './Asset';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

export default function Assets({assets, addAsset, editAsset, removeAsset}) {
  //console.log(assets);
  var sortedAssets = assets.sort((a,b)=>(new Date(b.datetime))-(new Date(a.datetime)))
  sortedAssets.forEach(a => {
    a.roi = (a.income*12/a.value * 100).toFixed(2)
  })
  const [asset, setAsset] = React.useState({name:"",value:"", type:"", income:""})
  const [action, setAction] = React.useState("new")
  const [open, setOpen] = React.useState(false);
  //const [asset, setAsset] = React.useState({})

  const handleEdit = (asset) => {
    console.log(asset);
    setAction("edit");
    setAsset(asset);
    setOpen(true);
  };

  //console.log(sortedAssets)
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
            <TableCell padding="checkbox"> </TableCell>
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
                <TableCell padding="checkbox">
                  <IconButton aria-label="edit" onClick={() => handleEdit(a)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
          ))}

        </TableBody>
      </Table>
    <Asset asset={asset} addAsset={addAsset} editAsset={editAsset} removeAsset={removeAsset} setAction={setAction} action={action} setOpen={setOpen} open={open} setAsset={setAsset}/>
    </React.Fragment>
  );
}
