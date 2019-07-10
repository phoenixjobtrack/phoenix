import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import MuiVirtualizedTable from './MuiVirtualizedTable';
import {connect} from 'react-redux';
import moment from 'moment'

import {withStyles} from '@material-ui/core'

const styles = theme => ({
  header: {
    backgroundColor: theme.palette.primary.main,
    color: 'white'
  }
});
class DashboardTable extends Component {

  componentDidMount() {
     this.props.dispatch({ type: 'FETCH_JOBS'})
}

render(){
// Getting the value from the jobs reducer

  return (
    <Paper style={{ width: '100%' }}>
      <table>
        <thead className={this.props.classes.header}>
          <tr>
            <th>COMPANY</th>
            <th>POSITION</th>
            <th>STAGE</th>
            <th>NEXT ACTIVITY DATE</th>
            <th>NOTES</th>
          </tr>
        </thead>
        <tbody>

          {this.props.reduxState.jobs.map(job => {
            return (
              <tr key={job.id}>
                <td >{job.company_name}</td>
                <td>{job.position}</td>
                <td>{job.currentStage}</td>
                <td>{job.nextStageDate && moment(job.nextStageDate).format('MM-DD-YYYY')}</td>
                <td>{job.notes}</td>


              </tr>
            )
          })}
        </tbody>
      </table>
    </Paper>
  );
}
}

const mapStateToProps = reduxState => ({
  reduxState
});
export default withStyles(styles)(connect(mapStateToProps)(DashboardTable));