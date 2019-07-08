// ========== REACT ========== //
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// ========== MATERIAL UI CORE ========== //
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

// ========== STYLE ========== //
import { makeStyles } from '@material-ui/core/styles';
import Purple from '@material-ui/core/colors/purple';
import PhoenixLogo from '../logo3icon.png';
import './SideMenu.css';

// ========== MUI ICONS ========== //
import AccountIcon from '@material-ui/icons/AccountCircle';
import AddIcon from '@material-ui/icons/Add';
import ContactsIcon from '@material-ui/icons/Contacts'
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import ListAltIcon from '@material-ui/icons/ListAlt'
import ViewAgendaIcon from '@material-ui/icons/ViewAgenda';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        backgroundColor: Purple,
        color: Purple,
        
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        backgroundColor: Purple,
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: Purple,
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
        backgroundColor: Purple,
    },
}));

function SideMenu(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar} backgroundColor={Purple}>
                <Toolbar>
                    <Typography variant="h6" noWrap className="pageTitle">
                        Phoenix 
                    </Typography>
                    <img src={PhoenixLogo} className="App-logo" alt="logo" width="50" />
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <div className={classes.toolbar} />

                <Divider />                    
                    <List>
                        <ListItem component={Link} to="/dashboard" button><HomeIcon className="icon" /> Home</ListItem>
                        <ListItem component={Link} to="/tasks" button><ListAltIcon className="icon" /> Tasks</ListItem>
                        <ListItem component={Link} to="/jobpipeline" button><ViewAgendaIcon className="icon" /> Job Pipeline</ListItem>
                        <ListItem component={Link} to="/jobOpportunity" button>
                            <AddIcon 
                                className="icon" 
                            /> 
                            Job Opportunity 
                        </ListItem>
                        <ListItem component={Link} to="/contact" button><ContactsIcon className="icon" /> Contacts</ListItem>
                        <ListItem component={Link} to="/profile" button><AccountIcon className="icon" /> Profile</ListItem>
                    </List>
                <Divider />
                <List>
                    <ListItem
                        onClick={() => props.dispatch({ type: 'LOGOUT' })}
                        button
                        >
                        <InfoIcon className="icon" />
                        Logout
                    </ListItem>
                </List>
                <Divider />
            </Drawer>
        </div>
    );
}

const mapStateToProps = state => ({
    user: state.user,
});
export default connect(mapStateToProps)(SideMenu);