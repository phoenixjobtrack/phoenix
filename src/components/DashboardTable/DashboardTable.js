import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import MuiVirtualizedTable from './MuiVirtualizedTable';
import {connect} from 'react-redux';


const sample = [
  ['Okta', 'Customer Service', 'Phone Screen', '06/05/19', 'Katie is calling at 9:30am'],
  ['Microsoft', 'System Analyst', 'Final', '06/06/19', 'Jeff will make the decision'],
  ['Ubisoft', 'Business analyst', 'Computer Engineer', '06/08/19', 'Bring tax documents'],
  ['Prime Academy', 'Outreach', 'In-person', '06/10/19', 'Meet in Minneapollis'],
  ['Sezzle', 'Test Analyst', 'HR Interview', '06/15/19', 'Followup with HR'],
];

function createData(id, company, position, stage, nexttouchpoint, notes) {
  return { id, company, position, stage, nexttouchpoint, notes};
}

const rows = [];

for (let i = 0; i < 50; i += 1) {
  const randomSelection = sample[Math.floor(Math.random() * sample.length)];
  rows.push(createData(i, ...randomSelection));
}

class DashboardTable extends Component {

componentDidMount() {
    this.props.dispatch({ type: 'FETCH_JOBS'})
}
  render(){
  return (
    <Paper style={{ height: 335, width: '100%' }}>
      <MuiVirtualizedTable
         rowCount={rows.length}
        rowGetter={({ index }) => rows[index]}
        columns={[
          {
            width: 250,
            label: 'Company',
            dataKey: 'company',
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
            dataKey: 'nexttouchpoint',
            numeric: true,
          },
          {
            width: 600,
            label: 'Notes',
            dataKey: 'notes',
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