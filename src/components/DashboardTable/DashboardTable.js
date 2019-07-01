import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import MuiVirtualizedTable from './MuiVirtualizedTable';
import {connect} from 'react-redux';

class DashboardTable extends Component {

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_JOBS'})
}

render(){
// Getting the value from the jobs reducer
const rows = this.props.reduxState.jobs;

  return (
    <Paper style={{ height: 335, width: '100%' }}>
      <MuiVirtualizedTable
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
            dataKey: 'stage',
            //numeric: true,
          },
          {
            width: 250,
            label: 'Next Activity Date',
            dataKey: 'date',
            numeric: true,
          },
          {
            width: 600,
            label: 'Notes',
            dataKey: 'note',
            //numeric: true,
          },
        ]}
      />
    </Paper>
  );
}
}

const mapStateToProps = reduxState => ({
  reduxState
});
export default connect(mapStateToProps)(DashboardTable);