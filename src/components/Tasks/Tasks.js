// ----- MASTER TASK VIEW ----- //
// All Tasks Funnel Into This Component

// ----- REACT ----- //
import React, { Component } from 'react';
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import { connect } from 'react-redux';



// ----- STYLES ----- //
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import arrayMove from 'array-move';


// ----- MATERIAL UI ----- // 
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


const OverdueTasks = overdueTasks => <Paper><Toolbar ><div>Overdue Tasks Go Here (Past Today's Date - Not Yet Marked As Complete)</div></Toolbar></Paper>

const TodayTasks = todayTasks => <Paper><Toolbar ><div>Today's Tasks Go Here</div></Toolbar></Paper>

const TomorrowTasks = tomorrowTasks => <Paper><Toolbar ><div>Tomorrow's Tasks Go Here</div></Toolbar></Paper>

const FutureTasks = tomorrowTasks => <Paper><Toolbar ><div>Future Tasks Go Here (Beyond Tomorrow)</div></Toolbar></Paper>

const HistoryTasks = historyTasks => <Paper><Toolbar ><div>Task History Goes Here (Past Today's Date - Marked As Complete)</div></Toolbar></Paper>

const SortableItem = sortableElement(({ value }) => <ListItem > {value}</ ListItem>);

const SortableContainer = sortableContainer(({ children }) => {
    return <List >{children}</ List>;
});

const theme = createMuiTheme({
    palette: {
        primary: { main: '#e61610' },
    },
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


class Tasks extends Component {
    state = {
        items: [
            'Corn 01',
            'Horn 02',
            'Bjorn 03',
            'Born 04',
            'Storn 05',
            'Florn 06',
            'Meorn 07',
            'Sorn 08',
            'Jorn 09',
            'Scorn 10',
        ],
    };


    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState(({ items }) => ({
            items: arrayMove(items, oldIndex, newIndex),
        }));
    };


    render() {
        const { items } = this.state;


        return (

            <div>
                <ThemeProvider theme={theme}>
                    <OverdueTasks />
                    <TodayTasks />
                    <TomorrowTasks />
                    <FutureTasks />
                    <HistoryTasks />
                    <SortableContainer onSortEnd={this.onSortEnd}>

                        {items.map((value, index) => (
                            <SortableItem key={`item-${index}`} index={index} value={value} />
                        ))}

                    </SortableContainer>
                </ThemeProvider>
            </div>
        );
    }
}

// class Tasks extends Component {
//     render() {
//         return (
//             <p>This is the Task View</p>
//         )
//     }
// }
const mapStateToProps = (reduxState) => {
    return {
        reduxState
    }
}

export default connect(mapStateToProps)(Tasks);
