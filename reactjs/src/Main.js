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

import Profile from './Profile';
import Dashboard from './Dashboard';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import TripOriginIcon from '@material-ui/icons/TripOrigin';
import LayersIcon from '@material-ui/icons/Layers';
import BookmarkIcon from '@material-ui/icons/Bookmark';


function processNews(news){
  var processedNews = news;
  var seen = {}
  processedNews = news.filter((item)=> {return seen.hasOwnProperty(item.title)?false:(seen[item.title]=true)})
  return processedNews;
}

function getNews(cb){
  //var news = rows;
  //news.push({})
  //var start = new Date(currentDate);
  var start = new Date();
  start.setDate(start.getDate()-1);
  //start.setDate(currentDate.getDate()-1);
  start.setHours(0,0,0,0);
  //TODO GOOD
  var s = start.toISOString();
  console.log("s:"+s);
  var end = new Date();
  end.setHours(23,59,59,999);
  //TODO GOOD
  var e = end.toISOString();
  console.log("e:"+e);
  var q = "https://apollo-loopback.slapps.fr/api/News?filter[where][and][0][datetime][gt]="+s+"&filter[where][and][1][datetime][lt]="+e
  console.log(q)
  fetch(q)
      .then(result=>result.json())
      .then(titles=>{
          console.log(titles);
          //this.setState({titles:titles});
          var news = []
          titles.forEach(t =>{
            //console.log(t.source);
            if(["Challenges","JDG", "The Verge", "Korben", "LifeHacker"].indexOf(t.source)!==-1) //TODO - configure
              news.push(t)
          })
          news = processNews(news);
          //news = titles;
          cb(news);
      });
  //return news;
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
  const [news, setNews] = React.useState([])
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  console.log(authState.isAuthenticated);
  if (authState.isPending) {
    return <div>Loading...</div>;
  }
  if(!authState.isAuthenticated)
    return(
      <Redirect to={{ pathname: '/login' }}/>
    )
  if(!fetch){
    getNews(setNews);
    setFetch(true);
  }
  console.log(url)
  var content = null;
  if(url==="profile")
    content = <Profile/>
  if(url==="dashboard")
    content = <Dashboard news={news}/>

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
            Apollo - News aggregator
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
        <div>
          <RouterLink to='/'>
            <ListItem button>
              <ListItemIcon>
                <LayersIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </RouterLink>
          <ListItem button>
            <ListItemIcon>
              <BookmarkIcon />
            </ListItemIcon>
            <ListItemText primary="Topics" />
          </ListItem>
        </div>
        </List>
        <Divider />
        <List>
        <div>
          <ListSubheader inset>Settings</ListSubheader>
          <ListItem button>
            <ListItemIcon>
              <TripOriginIcon />
            </ListItemIcon>
            <ListItemText primary="Sources" />
          </ListItem>
          <RouterLink to='/profile'>
          <ListItem button>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          </RouterLink>
        </div>
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
