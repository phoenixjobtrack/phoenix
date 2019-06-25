// // ========== REACT ========== //
// import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// // ========== MATERIAL UI ========== //
// import Drawer from '@material-ui/core/Drawer';
// import List from '@material-ui/core/List';
// import Divider from '@material-ui/core/Divider';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import Button from '@material-ui/core/Button';



// // ========== STYLE ========== //
// import { makeStyles } from '@material-ui/core/styles';

// // ========== ICONS ========== //
// import IconButton from '@material-ui/core/IconButton';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import MenuIcon from '@material-ui/icons/Menu';
// import HomeIcon from '@material-ui/icons/Home';
// import FolderIcon from '@material-ui/icons/Folder';
// import DashboardIcon from '@material-ui/icons/Dashboard';
// import InfoIcon from '@material-ui/icons/Info';
// import AccountIcon from '@material-ui/icons/AccountCircle';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';



// const useStyles = makeStyles({
//     list: {
//         width: 240,
//     },

//     fullList: {
//         width: 'auto',

//     },
// });

// function SideMenu(props) {
//     const classes = useStyles();
//     const [state, setState] = React.useState({
//         left: true,
//     });

//     const toggleDrawer = (side, open) => event => {
//         if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
//             return;
//         }

//         setState({ ...state, [side]: open });
//     };

//     const sideList = side => (
//         <div
//             className={classes.list}
//             role="presentation"
//             onClick={toggleDrawer(side, false)}
//             onKeyDown={toggleDrawer(side, false)}
//         >
//             <List>
//                 {['Phoenix'].map((text, index) => (
//                     <ListItem button key={text}>
//                         <ListItemIcon>
//                             <MenuIcon />
//                         </ListItemIcon>
//                         <ListItemText primary={text} />
//                     </ListItem>
//                 ))}
//             </List>

//             <Divider />
//             <List>
//                 <ListItem component={Link} to="/home" button><HomeIcon className="icon" /> Home</ListItem>
//                 <ListItem component={Link} to="/names" button><FolderIcon className="icon" /> Saved Names</ListItem>
//                 <ListItem component={Link} to="/project" button><DashboardIcon className="icon" /> My Project</ListItem>
//                 <ListItem component={Link} to="/about" button><InfoIcon className="icon" /> About</ListItem>
//             </List>

//             <Divider />
//             <List>
//                 <ListItem component={Link} to="/home" button><AccountIcon className="icon" /> Logout</ListItem>
//             </List>
//         </div>
//     );


//     return (
//         <div>
//             <IconButton onClick={toggleDrawer('left', true)}><MenuIcon /></IconButton>
//             <Drawer 
//                 open={state.left} 
//                 onClose={toggleDrawer('left', false)}>
//                 {sideList('left')}
//             </Drawer>
//         </div>
//     );
// }

// const mapStateToProps = state => ({
//     user: state.user,
// });

// export default connect(mapStateToProps)(SideMenu);

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

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

function SideMenu() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        Permanent drawer
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
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
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