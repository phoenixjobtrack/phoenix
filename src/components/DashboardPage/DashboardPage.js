import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import './DashboardPage.css';
import FaceIcon from '@material-ui/icons/Face';
import DashboardTable from '../DashboardTable/DashboardTable';

class DashboardPage extends Component {
render () {
    return (
        <div>

        <Grid container>
        <Grid item sm>
          <Paper style={{ padding: 40, marginTop: 20, marginLeft: 100 }}>
            <h2>Today's Task</h2>
              <Card className="todayBox">
                    <CardActionArea>
                        <CardMedia>
                            
                        </CardMedia>
                    </CardActionArea>
                </Card>
          </Paper>
        </Grid>
        <Grid item sm>
          <Paper style={{ padding: 40, marginTop: 20 }}>
          <FaceIcon className="profileIcon" />
            <h2>Job Requirements</h2>
            
            <Card className="requireBox">
                    <CardActionArea>
                        <CardMedia>
                            
                        </CardMedia>
                    </CardActionArea>
                </Card>
          </Paper>
        </Grid>
      </Grid>
      </div>

//         <p>WELCOME TO DASHBOARD</p>
//         <DashboardTable />
//         </div>


    )
}
}

export default DashboardPage;