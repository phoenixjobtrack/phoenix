import React, {Component} from 'react'
import { connect } from 'react-redux';


import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';


class Stages extends Component {
    state = {
        stages: [{}],
    }
    addStageInput() {
        this.setState({ stages: [...this.state.stages, ''] })
    }
    
    handleStageChange = propertyName => (event) => {
        console.log('stageInfo', event.target.value);
        this.setState({
            stages: {
                ...this.state,
                [propertyName]: event.target.value
            }
        });
    }

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_INTERVIEW_STAGES'})
    }

    render() {
        return(
            <div className="jobOppForm">
                <p className="jobOppsTitle">Stages of the Hiring Process</p>

                {this.state.stages.map((stage, index) => {
                    return (
                        <div>
                            <Grid container>
                                <Grid item sm={2}>
                                    <button className="oppsSubBut">
                                        <RemoveIcon className="OppsRemoveIcon" noValidate style={{ paddingTop: 15, fontSize: 30 }} />
                                        <span style={{ fontSize: 20 }}>
                                            Stages:
                                        </span>
                                    </button>
                                </Grid>
                                <Grid item sm={3}>
                                    <FormControl >
                                        <InputLabel htmlFor="age-simple">Choose Your Stage</InputLabel>
                                        <Select
                                            style={{ width: 235 }}
                                            onChange={this.handleStageChange('stage')}
                                            inputProps={{
                                                name: 'age',
                                                id: 'age-simple',
                                            }}
                                        >
                                            {this.props.reduxState.interviewStages.map((interviewStage,i)=>{
                                                return(
                                                    <MenuItem value={interviewStage.stage}>{interviewStage.stage}</MenuItem>
                                                )
                                            })}
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item sm={2}>
                                    <form noValidate style={{ paddingTop: 16 }}>
                                        <TextField
                                            id="date"
                                            style={{ width: 150 }}
                                            onChange={this.handleStageChange('date')}
                                            type="date"
                                            // defaultValue="2017-05-24"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </form>
                                </Grid>
                                <Grid item sm={5}>
                                    <Input
                                        style={{ width: 300, paddingTop: 16 }}
                                        onChange={this.handleStageChange('notes')}
                                        placeholder="Notes"
                                        inputProps={{
                                            'aria-label': 'Description',
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </div>
                    )
                })}
                <p><AddIcon onClick={(event) => this.addStageInput(event)} />Add Stage</p>
                <div className="oppStageView">
                    <p>Current Stage:</p>
                    <p>Next Stage:</p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});

export default connect(mapStateToProps)(Stages)