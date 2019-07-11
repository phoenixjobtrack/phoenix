import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import NewTable from './NewTable';
import Box from '@material-ui/core/Box';


class JobPipelinePage_1 extends Component {

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_JOBS' })
    //just to get data to jobs reducer
    //this.props.dispatch({type:'FETCH_JOB_STAGES'})
  }

  render() {
    // Getting the value from the jobs reducer
    const rows = this.props.reduxState.jobs;

    return (
      <div>
        <h2><Box>Job Pipeline</Box></h2>
        <Grid container spacing={3}>
          <Grid item sm={9}>
            {/* <ButtonGroup
              variant="contained"
              color="primary"
              aria-label="Full-width contained primary button group"
            >
              <Button>ACTIVE</Button>
              <Button>CLOSED</Button>
              <Button>SHOW ALL</Button>
            </ButtonGroup> */}
          </Grid>
          <Grid item sm>
            <Button style={{ width: '90%', marginBottom: '20px' }} onClick={() => { this.props.history.push('/jobOpportunity'); }} variant="contained" color="primary">NEW OPPORTUNITY</Button>
          </Grid>
        </Grid>
        <NewTable />
      </div>

    );
  }
}

const mapStateToProps = reduxState => ({
  reduxState
});
export default connect(mapStateToProps)(JobPipelinePage_1);