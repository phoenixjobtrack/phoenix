import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import JobPipelinePageTable from './JobPipelinePageTable';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

class JobPipelinePage extends Component {

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_JOBS'})
    //just to get data to jobs reducer
    //this.props.dispatch({type:'FETCH_JOB_STAGES'})
}

render(){
// Getting the value from the jobs reducer
const rows = this.props.reduxState.jobs;

  return (
      <div>
    <h1>Job Pipeline</h1>
          <Grid container spacing={3}>
            <Grid item sm={9}>
              <ButtonGroup
                  variant="contained"
                  color="primary"
                  aria-label="Full-width contained primary button group"
                >
                  <Button>ACTIVE</Button>
                  <Button>CLOSED</Button>
                  <Button>SHOW ALL</Button>
              </ButtonGroup>
            </Grid>
            <Grid item sm>
            <Button onClick={() => {this.props.history.push('/jobOpportunity');}} variant="contained" color="primary">NEW OPPORTUNITY</Button>
            </Grid>
          </Grid>
    <Paper style={{ height: 335, width: '100%' }}>
      <JobPipelinePageTable
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
          {
            width: 600,
            label: 'NextStage',
            dataKey: 'nextstage',
            //numeric: true,
          },
          {
            width: 200,
            label: 'Edit',
            dataKey: <button> edit </button>,
          },
        ]}

      />
    </Paper>
    </div>
  );
}
}

const mapStateToProps = reduxState => ({
  reduxState
});
export default connect(mapStateToProps)(JobPipelinePage);