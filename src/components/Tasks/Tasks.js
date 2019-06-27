// ----- MASTER TASK VIEW ----- //
// All Tasks Funnel Into This Component

// ----- REACT ----- //
import React, { Component } from 'react';
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import { connect } from 'react-redux';


// ----- STYLES ----- //
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import arrayMove from 'array-move';


// ----- MATERIAL UI CORE ----- // 
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';


// ----- MATERIAL UI ICONS ----- //
import AddIcon from '@material-ui/icons/Add';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import ClearIcon from '@material-ui/icons/Clear';
import MoreVertIcon from '@material-ui/icons/MoreVert';


// ----- TASKS SECTIONS ----- //
const OverdueTasks = overdueTasks => <Paper><Toolbar ><Typography>Overdue Tasks Go Here (Past Today's Date - Not Yet Marked As Complete)</Typography></Toolbar></Paper>
const TodayTasks = todayTasks => <Paper><Toolbar ><Typography>Today</Typography></Toolbar></Paper>
const TomorrowTasks = tomorrowTasks => <Paper><Toolbar ><Typography>Tomorrow</Typography></Toolbar></Paper>
const FutureTasks = tomorrowTasks => <Paper><Toolbar ><Typography>Future Tasks Go Here (Beyond Tomorrow)</Typography></Toolbar></Paper>
const HistoryTasks = historyTasks => <Paper><Toolbar ><Typography>Task History Goes Here (Past Today's Date - Marked As Complete)</Typography></Toolbar></Paper>

// Just to make things look nice until they're cleaned up
const DatePlaceholder = datePlaceholder => <div>7/8/2019</div>


// Click Handlers For List Items
const handleClickCheckBox = () => {
    console.log('clickCheckBox');
} // end handleClickCheckBox

const handleClickMore = () => {
    console.log('clickMore');
} // end handleClickMore

const handleClickRemove = () => {
    console.log('clickRemove');
} // end handleClickRemove

// ----- LIST REORDER & ANIMATION ----- //
const SortableItem = sortableElement(({ taskName, dueDate }) =>
    <Paper>
        <ListItem >
            <Tooltip title="More">
                <IconButton
                    onClick={() => handleClickMore()}
                    size="small"
                    >
                    <MoreVertIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Mark Complete">
                <IconButton
                    onClick={() => handleClickCheckBox()}
                    size="small"
                    >
                <CheckBoxIcon />
                </IconButton>
            </Tooltip>
            <ListItemText>
                {taskName}
            </ListItemText>
                {dueDate}
            <Tooltip title="Delete">
                <IconButton
                    onClick={() => handleClickRemove()}
                    size="small"
                >
                    <ClearIcon
                        onClick={() => handleClickRemove()} 
                    />
                </IconButton>
            </Tooltip>
        </ ListItem>
    </Paper>);

const SortableContainer = sortableContainer(({ children }) => {
    return <List >{children}</ List>;
});

// ----- MUI THEME ----- //
const theme = createMuiTheme({
    spacing: 8,
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

// ----- CLASS ----- //
class Tasks extends Component {
    state = {
        task_name: '',
        due_date: null,
        contact_id: null,
        job_id: null,
        items: [
            'Corn 01',
            'Horn 02',
            'Bjorn 03',
            'Born 04',
            'Storn 05',
            'Florn 06',
            'Meorn 07',
        ],
    };


    // Click Handlers For Add Task
    handleClickAddTask = (event) => {
        // if (this.state.task_name !== '' && this.state.due_date !== null) {
        //     (alert= "Yo";)
        // }
        // else 
        console.log('clickAddTask');
        this.props.dispatch({ type: 'ADD_TASK', payload: this.state });
    } // end handleClickAddTask

    handleDateSelect = (event) => {
        console.log('dateChange', event.target.value);
        this.setState({
            ...this.state,
            due_date: event.target.value,
        })
    }; // end handleDateSelect

    // Change of Add Task Input Text Field
    handleTaskChange = (event) => {
        console.log('taskChange', event.target.value);
        this.setState({
            ...this.state,
            task_name: event.target.value,
        })
    }; // end handleTaskChange

    

    // ----- LIST REORDER & ANIMATION ----- //
    onSortStart = ({node}) => {
        console.log('onSortStart node', {node});
        if (!this.props.reduxState.tasks) {
            let taskList = this.props.reduxState.tasks;
            console.log('onSortStart taskList', taskList);
            let newItemsArray = []
            taskList.map((task, i) => {
                newItemsArray = [...this.state.items, task.task_name]
                this.setState({
                    ...this.state,
                    items: newItemsArray,
                })
            });
        }
    }; // end onSortStart

    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState(({ items }) => ({
            items: arrayMove(items, oldIndex, newIndex),
        }));
    }; // end onSortEnd

    // ----- RENDER ----- //
    render() {
        const items = this.props.reduxState.tasks || [];
        console.log('state', this.state);
        console.log('render items', items);

        // ----- RETURN ----- //
        return (

            <div>
                <ThemeProvider theme={theme}>
                    <span >
                        <Paper><Toolbar >
                            <TextField
                                id="add-new-task"
                                label="Add New Task"
                                margin="normal"
                                onChange={this.handleTaskChange}
                                placeholder="Send Email To CJ"
                                position="Relative"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                            />
                            <TextField
                                id="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                label="Due Date"
                                margin="normal"
                                onChange={this.handleDateSelect}
                                position="Relative"
                                type="date"
                                variant="outlined"
                            />
                            <Tooltip title="Add Task">
                                <IconButton
                                    label="Submit"
                                    margin="normal"
                                    onClick={() => this.handleClickAddTask()}
                                    type="submit"
                                    variant="outlined"
                                ><AddIcon />
                                </IconButton>
                            </Tooltip>

                        </Toolbar ></Paper>
                    </span>
                    <Divider />
                    <OverdueTasks />
                    <SortableContainer onSortEnd={this.onSortEnd}>

                        {items.map((task, index) => (
                            <SortableItem 
                                key={`item-${index}`} 
                                index={index} 
                                taskName={task.task_name} 
                                dueDate={task.due_date} 
                            />
                        ))}

                    </SortableContainer>
                    <Divider />
                    <TodayTasks />
                    {/* <SortableContainer onSortEnd={this.onSortEnd}>

                        {items.map((value, index) => (
                            <SortableItem key={`item-${index}`} index={index} value={value} />
                        ))}

                    </SortableContainer> */}
                    <Divider />
                    <TomorrowTasks />
                    {/* <SortableContainer onSortEnd={this.onSortEnd}>

                        {items.map((value, index) => (
                            <SortableItem key={`item-${index}`} index={index} value={value} />
                        ))}

                    </SortableContainer> */}
                    <Divider />
                    <FutureTasks />
                    {/* <SortableContainer onSortEnd={this.onSortEnd}>

                        {items.map((value, index) => (
                            <SortableItem key={`item-${index}`} index={index} value={value} />
                        ))}

                    </SortableContainer> */}
                    <Divider />
                    <HistoryTasks />
                    {/* <SortableContainer onSortEnd={this.onSortEnd}>

                        {items.map((value, index) => (
                            <SortableItem key={`item-${index}`} index={index} value={value} />
                        ))}

                    </SortableContainer> */}
                    <Divider />
                </ThemeProvider>
            </div>
        );
    }
}


const mapStateToProps = (reduxState) => {
    return {
        tasks: reduxState.tasksReducer,
        reduxState
    }
}

export default connect(mapStateToProps)(Tasks);
