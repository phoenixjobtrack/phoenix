import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import MuiVirtualizedTable from './MuiVirtualizedTable';
import {connect} from 'react-redux';
import moment from 'moment'

import {withStyles} from '@material-ui/core'

import NewTable from './NewTable'


const styles = theme => ({
  header: {
    backgroundColor: '#2196f3',
    color: 'white'
  }


});
class DashboardTable extends Component {

  componentDidMount() {
     this.props.dispatch({ type: 'FETCH_JOBS'})
}

render(){
// Getting the value from the jobs reducer
const rows = this.props.reduxState.jobs;

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
              //  <p>{event.id}</p>
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
      {/* <NewTable/> */}
      {/* <MuiVirtualizedTable
         rowCount={rows.length}
        rowGetter={({ index }) => rows[index]}
        columns={[
          {
            width: 250,
            label: 'Company',
            dataKey: 'company_name',
          },
          {
            width: 250,
            label: 'Position',
            dataKey: 'position',
            //numeric: true,
          },
          {
            width: 300,
            label: 'Stage',
            dataKey: 'currentStage',
            //numeric: true,
          },
          {
            width: 250,
            label: 'Next Activity Date',
            dataKey: 'nextStageDate',
            numeric: true,
          },
          {
            width: 600,
            label: 'Notes',
            dataKey: 'nextStageNote',
            //numeric: true,
          },
        ]}
      /> */}
    </Paper>
  );
}
}

const mapStateToProps = reduxState => ({
  reduxState
});
export default withStyles(styles)(connect(mapStateToProps)(DashboardTable));