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
import { withStyles } from '@material-ui/core/styles';

// ----- MATERIAL UI CORE ----- // 
import Box from '@material-ui/core/Box';
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
const OverdueTasks = () => <Paper className="overdueTasks" ><Toolbar ><Typography variant="h6">Overdue Tasks</Typography></Toolbar></Paper>
const TodayTasks = () => <Paper className="todayTasks"><Toolbar ><Typography variant="h6">Today</Typography></Toolbar></Paper>
const TomorrowTasks = () => <Paper className="tomorrowTasks"><Toolbar ><Typography variant="h6">Tomorrow</Typography></Toolbar></Paper>
const FutureTasks = () => <Paper className="futureTasks"><Toolbar ><Typography variant="h6">Future Tasks</Typography></Toolbar></Paper>
const HistoryTasks = () => <Paper className="historyTasks"><Toolbar ><Typography variant="h6">Task History</Typography></Toolbar></Paper>

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

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_TASKS' })
        this.props.dispatch({ type: 'FETCH_CONTACTS'})
        this.props.dispatch({ type: 'FETCH_JOB_TASKS'})
        this.props.dispatch({type: 'FETCH_CURRENT_JOB'})
    }

    state = {
        task_name: '',
        due_date: null,
        contact_id: null,
        job_id: null,
        demoMode: false,
        complete: false
    };

    // Click Handlers For Add Task
    handleClickAddTask = (event) => {
        if (this.state.task_name == '' || this.state.due_date == null) {
            alert("Please Fill In a Task & Due Date");
        }
        else {
            this.props.dispatch({ type: 'ADD_TASK', payload: this.state });
        }
        this.clearInputs();
    } // end handleClickAddTask

    handleDateSelect = (event) => {
        this.setState({
            ...this.state,
            due_date: event.target.value,
        })
    }; // end handleDateSelect

    // Change of Add Task Input Text Field
    handleTaskChange = (event) => {
        this.setState({
            ...this.state,
            task_name: event.target.value,
        })
    }; // end handleTaskChange

    clearInputs = () => {
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
                <h2>Tasks</h2>
                    {/* // ----- Add Task Input Form ----- // */}
                    <span >
                        <Paper style={{ paddingBottom: 10, marginBottom: 20}}
                            variant="outlined">
                            <Toolbar className={this.props.classes.root}>
                                <TextField
                                    style={{ minWidth: 400 }}
                                    value={this.state.task_name}
                                    id="add-new-task"
                                    label="Add New Task"
                                    margin="normal"
                                    onChange={this.handleTaskChange}
                                    placeholder="Describe This Task (ex: Send Email to CJ)"
                                    position="Relative"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    style={{width: 600, paddingRight: 5}}
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

                    {/* // ----- TASK DISPLAYS ----- // */}
                    <OverdueTasks />
                    <TasksOverdue />
                   
                    <TodayTasks />
                    <TasksLineItems />
                 
                    <TomorrowTasks />
                    <TasksTomorrow />
                    
                    <FutureTasks />
                    <TasksFuture />
                  
                    <HistoryTasks />
                    <TasksHistory />
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

export default withStyles()(connect(mapStateToProps)(Tasks));
