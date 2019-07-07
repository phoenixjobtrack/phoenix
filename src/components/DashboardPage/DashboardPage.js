import React, { Component } from 'react';
import { connect } from 'react-redux';
// ----- DEPENDENCIES ----- //
import swal from 'sweetalert'

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Grid';
import './DashboardPage.css';
import './AddTaskDialog.jsx';
import AddIcon from '@material-ui/icons/Add';
import DashboardTable from '../DashboardTable/DashboardTable';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';



class DashboardPage extends Component {
  componentDidMount() {
    //temporary.  replace once Viji's query works
    this.props.dispatch({ type: 'FETCH_JOBS' })
  }

  // Triggers Popup to add new Employment Requirement when + is clicked
  addRequirement() {
    console.log('in addRequirement');
    swal({
      text: 'Add New Employment Requirement',
      content: "input",
      button: {
        text: "add",
        closeModal: false,
      },
    })
      .then(requirement => {
        if (!requirement) throw null;
        this.props.dispatch({ type: 'ADD_NEW_REQUIREMENT', payload: { requirement: `${requirement}` } })
      })
      .then(results => {
        swal("New Requirement Added", {
          icon: "success",
        });
      })
  } // End addRequirement

  // Triggers Popup to add new Employment Requirement when + is clicked
  addTask() { }


  render() {
    //this gives us today's date in mm/dd/yyyy format
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    let taskDay = mm + '/' + dd + '/' + yyyy;
    return (
      <div>
        <h1>Dashboard</h1>
        <Grid container>
          <Grid item sm>
            <Paper style={{ padding: 40, marginTop: 20 }}>

              <h2>
                Today's Tasks
                <IconButton>
                  <AddIcon
                    className="dashAddIcon"
                    onClick={() => this.props.history.push('/tasks')}
                    style={{ top: 0, marginRight: 5, width: 20, height: 20 }}
                  />
                </IconButton>
              </h2>
              <div className="todayBox">

                <div className="todayLabel">
                  <p>{taskDay}</p>
                </div>
                <div className="todayText">
                  {this.props.dayTask.map((tasks, i) => {
                    if (tasks.due_date === taskDay) {
                      return (
                        <ul>
                          <li>{tasks.task_name}</li>
                        </ul>
                      )
                    }
                  })}
                </div>
                <div className="todayLabel">
                  <p className="overdueLabel">Overdue</p>
                </div>
                <div className="overdueText">

                  {this.props.dayTask.map((tasks, i) => {
                    if (tasks.due_date < taskDay) {
                      return (
                        <ul>
                          <li className="overdueLabel">{tasks.task_name}</li>
                        </ul>
                      )
                    }
                  })}
                </div>
              </div>
            </Paper>
          </Grid>
          <Grid item sm>
            <Paper >
              <div className="logoBox">
                <img className="logo" src="/images/logo3.png" alt="phoenix logo" />
              </div>
              <Box ><h2>
                Job Requirements
                <IconButton>
                  <AddIcon
                    className="dashAddIcon"
                    onClick={this.addRequirement}
                    style={{ top: 0, marginRight: 5, width: 20, height: 20 }}
                  />
                </IconButton>
              </h2></Box>

              <div className="requireBox">
                <div className="todayLabel">
                  <p>Priorities</p>
                </div>
                <div className="requireText">

                  {this.props.require.map((user, i) => {
                    return (
                      <ul className="boxText">
                        <li>{user.requirement}</li>
                      </ul>
                    )

                  })}
                </div>
              </div>
            </Paper>
          </Grid>
        </Grid>
        <div className="pipelineBox">
          <h2>
            Job Pipeline
            <IconButton>
              <AddIcon
                className="dashAddIcon"
                onClick={() => this.props.history.push('/jobOpportunity')}
                style={{ top: 0, marginRight: 5, width: 20, height: 20 }}
              />
            </IconButton>
          </h2>
          <DashboardTable />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (reduxState) => {
  return {
    dayTask: reduxState.tasks,
    require: reduxState.requirements
  }
}

export default connect(mapStateToProps)(DashboardPage);