// ----- MASTER TASK VIEW ----- //
// All Tasks Funnel Into This Component

// ----- REACT ----- //
import React, { Component } from 'react';
import { connect } from 'react-redux';

// ----- COMPONENTS ----- //
import TasksFuture from '../TasksFuture/TasksFuture';
import TasksHistory from '../TasksHistory/TasksHistory';
import TasksLineItems from '../TasksLineItems/TasksLineItems';
import TasksOverdue from '../TasksOverdue/TasksOverdue';
import TasksTomorrow from '../TasksTomorrow/TasksTomorrow';

// ----- STYLES ----- //
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import './Tasks.css';


// ----- MATERIAL UI CORE ----- // 
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';


// ----- MATERIAL UI ICONS ----- //
import AddIcon from '@material-ui/icons/Add';


// ----- TASKS SECTIONS ----- //
const OverdueTasks = () => <Paper className="overdueTasks" ><Toolbar ><Typography backgroundColor="#939292" color="#939292">Overdue Tasks</Typography></Toolbar></Paper>
const TodayTasks = () => <Paper className="todayTasks"><Toolbar ><Typography>Today</Typography></Toolbar></Paper>
const TomorrowTasks = () => <Paper className="tomorrowTasks"><Toolbar ><Typography>Tomorrow</Typography></Toolbar></Paper>
const FutureTasks = () => <Paper className="futureTasks"><Toolbar ><Typography>Future Tasks</Typography></Toolbar></Paper>
const HistoryTasks = () => <Paper className="historyTasks"><Toolbar ><Typography>Task History</Typography></Toolbar></Paper>


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

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_TASKS' })
        this.props.dispatch({ type: 'FETCH_CONTACTS'})
        this.props.dispatch({ type: 'FETCH_JOBS'})
    }

    state = {
        task_name: '',
        due_date: null,
        contact_id: null,
        job_id: null,
    };

    // Click Handlers For Add Task
    handleClickAddTask = (event) => {
        if (this.state.task_name == '' || this.state.due_date == null) {
            console.log('Empty Input Values');
            alert("Please Fill In a Task & Due Date");
        }
        else {
            console.log('clickAddTask');
            this.props.dispatch({ type: 'ADD_TASK', payload: this.state });
        }
        this.clearInputs();
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

    clearInputs = () => {
        console.log('clearInputs')

        this.setState({
            task_name: '',
            due_date: 'mm/dd/yyyy',
            contact_id: null,
            job_id: null,
        })
    }

    // ----- RENDER ----- //
    render() {

        // ----- RETURN ----- //
        return (

            <div>
                <ThemeProvider theme={theme}>
                    {/* // ----- Add Task Input Form ----- // */}
                    <span >
                        <Paper variant="outlined">
                            <Toolbar >
                                <TextField
                                    value={this.state.task_name}
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
                                    value={this.state.due_date}
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
                                        size="medium"
                                        type="submit"
                                        variant="outlined"
                                    ><AddIcon />
                                    </IconButton>
                                </Tooltip>

                            </Toolbar >
                        </Paper>
                    </span>
                    <Divider />

                    {/* // ----- TASK DISPLAYS ----- // */}
                    <OverdueTasks className="overdueTasks" />
                    <TasksOverdue />
                    <Divider />
                    <TodayTasks />
                    <TasksLineItems />
                    <Divider />
                    <TomorrowTasks />
                    <TasksTomorrow />
                    <Divider />
                    <FutureTasks />
                    <TasksFuture />
                    <Divider />
                    <HistoryTasks />
                    <TasksHistory />
                    <Divider />
                </ThemeProvider>
            </div>
        ); // End Return
    } // End Render
} // End Class


const mapStateToProps = (reduxState) => {
    return {
        tasks: reduxState.tasksReducer,
        reduxState
    }
}

export default connect(mapStateToProps)(Tasks);
