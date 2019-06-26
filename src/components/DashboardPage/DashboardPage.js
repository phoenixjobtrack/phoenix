import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Grid';
import './DashboardPage.css';
import FaceIcon from '@material-ui/icons/Face';
import AddIcon from '@material-ui/icons/Add';
import DashboardTable from '../DashboardTable/DashboardTable';

class DashboardPage extends Component {
render () {
    return (
      <div>
        <h1>DashBoard</h1>
        <Grid container>
        <Grid item sm>
          <Paper style={{ padding: 40, marginTop: 20}}>
            <h2>Today's Task<AddIcon className="dashAddIcon" /></h2>
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
          <FaceIcon className="dashIcon" />
            <h2>Job Requirements<AddIcon className="dashAddIcon" /></h2>
            <div className="requireBox">
                <ul className="boxText">
                    <li>6 weeks vacation</li>
                    <li>Work from home</li>
                    <li>75k annually</li>
                </ul>
            </div>
          </Paper>
        </Grid>
      </Grid>
      <div className ="piplineBox">
        <h2>Job Pipeline<AddIcon className="dashAddIcon" /></h2>
        <DashboardTable />
      </div>
    </div>
    )
}
}

export default DashboardPage;