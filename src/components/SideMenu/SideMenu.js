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
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

// ========== STYLE ========== //
import { makeStyles } from '@material-ui/core/styles';
import './SideMenu.css';

// ========== MUI ICONS ========== //
import AccountIcon from '@material-ui/icons/AccountCircle';
import ContactsIcon from '@material-ui/icons/Contacts'
import DashboardIcon from '@material-ui/icons/Dashboard';
import FolderIcon from '@material-ui/icons/Folder';
import HomeIcon from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import InfoIcon from '@material-ui/icons/Info';
import ListAltIcon from '@material-ui/icons/ListAlt'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import LogOutButton from '../LogOutButton/LogOutButton';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import ViewAgendaIcon from '@material-ui/icons/ViewAgenda';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
}));

function SideMenu(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        Phoenix
                    </Typography>
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
                        <ListItem component={Link} to="/jobOpportunity" button><ViewAgendaIcon className="icon" /> Job Opportunity </ListItem>
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
            {/* <main className={classes.content}>
                <div className={classes.toolbar} />
                
            </main> */}
        </div>
    );
}

const mapStateToProps = state => ({
    user: state.user,
});
export default connect(mapStateToProps)(SideMenu);