import React, { Component } from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Grid';
import './DashboardPage.css';
import FaceIcon from '@material-ui/icons/Face';
import AddIcon from '@material-ui/icons/Add';
import DashboardTable from '../DashboardTable/DashboardTable';

class DashboardPage extends Component {
  render() {
    //this gives us today's date in mm/dd/yyyy format
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    let taskDay = mm + '/' + dd + '/' + yyyy;
    return (
      <div>
        <h1>DashBoard</h1>
        <Grid container>
          <Grid item sm>
            <Paper style={{ padding: 40, marginTop: 20 }}>
              <h2>Today's Task<AddIcon className="dashAddIcon" /></h2>
              <div className="todayBox">
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
                <div className="overdueText">
                  {this.props.dayTask.map((tasks, i) => {
                    if (tasks.due_date > taskDay) {
                      return (
                        <ul>
                          <li>{tasks.task_name}</li>
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
              <h2>Job Requirements<AddIcon className="dashAddIcon" /></h2>
              <div className="requireBox">
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
          <h2>Job Pipeline<AddIcon className="dashAddIcon" /></h2>
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