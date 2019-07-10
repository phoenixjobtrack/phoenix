// ========== REACT ========== //
// This componenet is not visible on the DOM.  
// It is hidden by the SideMenu component, which contains its own TopBar

import React from 'react';
import { connect } from 'react-redux';


// ========== MATERIAL UI CORE ========== //
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';


// ========== MATERIAL UI ICONS ========== //

const theme = createMuiTheme({
    
});

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        fontSize: 24,
    },
}));

function TopBar(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <ThemeProvider theme={theme}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h1" className={classes.title}>
                            Welcome {props.user.first_name}
                        </Typography>
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
        </div>
    );
}


const mapStateToProps = state => ({
    user: state.user,
});
export default connect(mapStateToProps)(TopBar);