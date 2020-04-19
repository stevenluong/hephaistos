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

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

export default function Asset({asset, addAsset, setAsset, editAsset, removeAsset, action, setAction, open, setOpen}) {
  //console.log(asset);
  //console.log(open);
  //console.log(action);

  const classes = useStyles();
  const handleOpen = () => {
    setAction("new");
    setAsset({name:"",value:"", type:"", income:""});
    setOpen(true);
  };
  //setOpen(editOpen);
  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    setOpen(false);
    if(action=="new")
      addAsset(asset)
    else {
      editAsset(asset)
    }
  };
  const handleRemove = () => {
    setOpen(false);
    removeAsset(asset)
  };

  //console.log(asset);
  const handleNameChange = (e) => {
    setAsset({...asset, name:e.target.value});
  };
  const handleValueChange = (e) => {
    setAsset({...asset, value:e.target.value});
  };
  const handleTypeChange = (e) => {
    setAsset({...asset, type:e.target.value});
  };
  const handleIncomeChange = (e) => {
    setAsset({...asset, income:e.target.value});
  };
  const handleAddressChange = (e) => {
    setAsset({...asset, address:e.target.value});
  };
  const handleTenantChange = (e) => {
    setAsset({...asset, tenant:e.target.value});
  };

  //console.log(sortedAssets)
  return (
    <React.Fragment>
    <Button
    variant="outlined"
    color="primary"
    startIcon={<AddIcon/>}
    onClick = {handleOpen}
  >
    New
  </Button>
    <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Title>{action=="new"?"New Asset":"Edit"}</Title>
            <br/>
            <TextField
                id="name"
                label="Name*"
                variant="outlined"
                onChange={handleNameChange}
                value={asset.name}
              />
            <br/>
            <TextField
                id="value*"
                label="Value"
                variant="outlined"
                onChange={handleValueChange}
                value={asset.value}
              />
            <br/>
            <TextField
                id="type*"
                label="Type"
                variant="outlined"
                onChange={handleTypeChange}
                value={asset.type}
              />
            <br/>
            <TextField
                id="income*"
                label="Income"
                variant="outlined"
                onChange={handleIncomeChange}
                value={asset.income}
              />
            <br/>
            <TextField
                id="address"
                label="Address"
                variant="outlined"
                onChange={handleAddressChange}
                value={asset.address}
              />
            <br/>
            <TextField
                id="tenant"
                label="Tenant"
                variant="outlined"
                onChange={handleTenantChange}
                value={asset.tenant}
              />
            <br/>
              <Button
              variant="contained"
              color="primary"
              onClick = {handleAdd}
            >
              {action=="new"? "Add" : "Edit"}

          </Button>

          {action=="edit" && (
          <React.Fragment>
            <br/>
            <Button
          variant="contained"
          color="secondary"
          onClick = {handleRemove}
          >
            Remove
          </Button>
          </React.Fragment>
        )}

          </div>
        </Fade>
      </Modal>
    </React.Fragment>
  );
}
