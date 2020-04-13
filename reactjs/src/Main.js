import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { useOktaAuth } from '@okta/okta-react';
import { Link as RouterLink, Redirect } from 'react-router-dom';

import Profile from './User/Profile';
import Dashboard from './Dashboard';
import Simulator from './Simulator';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import TripOriginIcon from '@material-ui/icons/TripOrigin';
import LayersIcon from '@material-ui/icons/Layers';
import TimelineIcon from '@material-ui/icons/Timeline';


function getAssetsWithMortgage(cb){
  var assets = [];
  //Asset 1
  var a = {
    name : "P13",
    value: 310100,
    type: "Flat",
    income: 1200
  }
  var m = {
    amount : 279712.21,
    duration : 25,
    rate : 1.75,
    startDate : new Date("03/01/2018")
  }
  m.monthlyPayment = 1200; //TODO
  a.roi = (a.income*12/a.value*100).toFixed(2);
  a.mortgage = m;
  a.cashflow = a.income - m.monthlyPayment;
  assets.push(a);
  //Asset 2
  var a = {
    name : "P19",
    value: 175000,
    type: "Flat",
    income: 900
  }
  var m = {
    amount : 170778.74,
    duration : 24,
    rate : 1.55,
    startDate : new Date("29/09/2018")
  }
  m.monthlyPayment = 750; //TODO
  a.roi = (a.income*12/a.value*100).toFixed(2);
  a.mortgage = m;
  a.cashflow = a.income - m.monthlyPayment;
  assets.push(a);
  cb(assets);
}


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://steven-luong.com/">
        Steven Luong
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  fixedHeight: {
    height: 150,
  },
}));

export default function Main({url}) {
  const { authState, authService } = useOktaAuth();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [fetch, setFetch] = React.useState(false)
  const [assets, setAssets] = React.useState([])
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  //console.log(authState.isAuthenticated);
  if (authState.isPending) {
    return <div>Loading...</div>;
  }
  if(!authState.isAuthenticated)
    return(
      <Redirect to={{ pathname: '/login' }}/>
    )
  if(!fetch){
    getAssetsWithMortgage(setAssets);
    setFetch(true);
  }
  //console.log(url)
  var content = null;
  if(url==="profile")
    content = <Profile/>
  if(url==="dashboard")
    content = <Dashboard assets={assets}/>
  if(url==="simulator")
    content = <Simulator assets={assets}/>

  //console.log(fetch);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Hephaistos - Assets Management
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button component={RouterLink} to="/">
            <ListItemIcon>
              <LayersIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={RouterLink} to="/simulator">
            <ListItemIcon>
              <TimelineIcon />
            </ListItemIcon>
            <ListItemText primary="Simulator" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button component={RouterLink} to="/profile">
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
        </List>
        <Divider />
        <List>
        <div>
          <ListItem button onClick={() => {authService.logout()}}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Log out" />
          </ListItem>
        </div>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {content}
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
