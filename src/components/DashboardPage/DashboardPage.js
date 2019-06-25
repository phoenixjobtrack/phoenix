import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Grid';
import './DashboardPage.css';
import FaceIcon from '@material-ui/icons/Face';
import DashboardTable from '../DashboardTable/DashboardTable';

class DashboardPage extends Component {
render () {
    return (
      <div>
        <Grid container>
        <Grid item sm>
          <Paper style={{ padding: 40, marginTop: 20}}>
            <h1>Today's Task</h1>
              <div className="todayBox">
                    <ul className="boxText">
                        <li>Call Karen</li>
                        <li>Apply to 30 jobs by 7/20</li>
                        <li>Redo my resumes</li>
                        <li>Call Karen</li>
                        <li>Apply to 30 jobs by 7/20</li>
                        <li>Redo my resumes</li>
                        <li>Call Karen</li>
                        <li>Apply to 30 jobs by 7/20</li>
                        <li>Redo my resumes</li>
                        <li>Call Karen</li> 
                    </ul>
                </div>
          </Paper>
        </Grid>
        <Grid item sm>
          <Paper style={{ padding: 40, marginTop: 20 }}>
          <FaceIcon className="profileIcon" />
            <h1>Job Requirements</h1>
            <div className="requireBox">
                <ul className="boxText">
                    <li>6 weeks vacation</li>
                    <li>Work from home</li>
                    <li>75k anually</li>
                </ul>
            </div>
          </Paper>
        </Grid>
      </Grid>
      <DashboardTable />
    </div>


    )
}
}

export default DashboardPage;