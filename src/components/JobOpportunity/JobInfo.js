import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import './JobOpportunity.css';




class JobInfo extends Component {

    state = {
        jobs : {
        company : '',
        position : '',
        posting_url : '',
        deadline : '',
        salary : '',
        benefits : '',
        travel : '',
        notes : '',
        }
}
    handleJobChange = propertyName => (event) => {
        console.log('jobInfo', event.target.value);
        this.setState({
            jobs: {
                ...this.state,
                [propertyName]: event.target.value
            }
        });
    }
render () {
    return(
        // <p>job here</p>
        //  {/* Employment Information */}

        <div className="jobOppForm">
        <p className="jobOppsTitle">Employment Information</p>
        <div className="oppGrid1">
            <Grid container>
                <Grid item sm={3}>
                    <p>Company: </p>
                    <p>Position: </p>
                    <p>Posting URL: </p>
                    <p>Deadline: </p>
                </Grid>
                <Grid item sm={3}>
                <Input
                            placeholder="Company"
                            value={this.state.company}
                            onChange={this.handleJobChange('company')}
                            inputProps={{
                                'aria-label': 'Description',
                            }}
                        />
                <Input
                            placeholder="Position"
                            value={this.state.position}
                            onChange={this.handleJobChange('position')}
                            inputProps={{
                                'aria-label': 'Description',
                            }}
                        />
                <Input
                            placeholder="Posting URL"
                            value={this.state.posting_url}
                            onChange={this.handleJobChange('posting_url')}
                            inputProps={{
                                'aria-label': 'Description',
                            }}
                        />
                        <br />
                <TextField
                            id="date"
                            style={{ width: 150 }}
                            type="date"
                            value={this.state.deadline}
                            onChange={this.handleJobChange('deadline')}
                            // defaultValue="2017-05-24"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                </Grid>
                <Grid item sm={3}>
                    <p> Salary:
           
                    </p>
                    <p> Benefits:
          
                    </p>
                    <br />
                    <p> Travel:
        
                    </p>
                </Grid>
                <Grid item sm={3}>
                <Input
                            placeholder="Salary"
                            value={this.state.salary}
                            onChange={this.handleJobChange('salary')}
                            inputProps={{
                                'aria-label': 'Description',
                            }}
                        />
                <TextField
                            id="outlined-multiline-flexible"
                            label="Benefits"
                            value={this.state.benefits}
                            onChange={this.handleJobChange('benefits')}
                            multiline
                            rowsMax="15"
                            margin="normal"
                            variant="outlined"
                        />
                <Input
                            placeholder="Travel"
                            value={this.state.travel}
                            onChange={this.handleJobChange('travel')}
                            inputProps={{
                                'aria-label': 'Description',
                            }}
                        />
                </Grid>
            </Grid>
            <p>Notes:</p>
            <TextField
                id="outlined-multiline-flexible"
                label="Notes"
                value={this.state.notes}
                onChange={this.handleJobChange('notes')}
                multiline
                rowsMax="15"
                margin="normal"
                variant="outlined"
            />
        </div>
    </div>

    )
}
}

export default JobInfo;