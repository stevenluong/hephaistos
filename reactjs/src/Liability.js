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

export default function Liability({liability, addLiability, setLiability, editLiability, removeLiability, action, setAction, open, setOpen}) {
  //console.log(asset);
  //console.log(open);
  //console.log(action);

  const classes = useStyles();
  const handleOpen = () => {
    setAction("new");
    setLiability({name:"",amount:"", rate:"", monthlyPayment:"", start:"", duration:""});
    setOpen(true);
  };
  //setOpen(editOpen);
  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    setOpen(false);
    if(action=="new")
      addLiability(liability)
    else {
      editLiability(liability)
    }
  };
  const handleRemove = () => {
    setOpen(false);
    removeLiability(liability)
  };

  //console.log(asset);
  const handleNameChange = (e) => {
    setLiability({...liability, name:e.target.value});
  };
  const handleAmountChange = (e) => {
    setLiability({...liability, amount:e.target.value});
  };
  const handleDurationChange = (e) => {
    setLiability({...liability, duration:e.target.value});
  };
  const handlePaymentChange = (e) => {
    setLiability({...liability, monthlyPayment:e.target.value});
  };
  const handleStartChange = (e) => {
    setLiability({...liability, start:e.target.value});
  };
  const handleRateChange = (e) => {
    setLiability({...liability, rate:e.target.value});
  };

  //console.log(sortedAssets)
  return (
    <React.Fragment>
    <Button
    variant="outlined"
    color="secondary"
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
            <Title>{action=="new"?"New Liability":"Edit"}</Title>
            <br/>
            <TextField
                id="name"
                label="Name"
                variant="outlined"
                onChange={handleNameChange}
                value={liability.name}
              />
            <br/>
            <TextField
                id="amount"
                label="Amount"
                variant="outlined"
                onChange={handleAmountChange}
                value={liability.amount}
              />
            <br/>
            <TextField
                id="duration"
                label="Duration - Years"
                variant="outlined"
                onChange={handleDurationChange}
                value={liability.duration}
              />
            <br/>
            <TextField
                id="rate"
                label="Rate - %"
                variant="outlined"
                onChange={handleRateChange}
                value={liability.rate}
              />
            <br/>
            <TextField
                id="payment"
                label="Payment/m"
                variant="outlined"
                onChange={handlePaymentChange}
                value={liability.monthlyPayment}
              />
              <br/>
              <TextField
                  id="start"
                  label="Start - DD/MM/YYYYY"
                  variant="outlined"
                  onChange={handleStartChange}
                  value={liability.start}
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
