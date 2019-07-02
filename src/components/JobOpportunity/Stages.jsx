import React, {Component} from 'react'
import { connect } from 'react-redux';

import StageItem from './StageItem'

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';


class Stages extends Component {
    state = {
        stages: [{
            jobId: 0,
            stage: '',
            note: '',
            date: ''
        }],
    }
    stageCounter = -1
    addStageInput() {
        this.stageCounter = this.stageCounter+1
        // this.setState({ stages: [...this.state.stages, {}] })
        this.props.dispatch({
            type: 'ADD_TO_REDUX_STAGE', payload: {
                key: this.stageCounter, stage: {
                    stage: '',
                    note: '',
                    date: ''
                }}})
    }

    fetchJobStages = () => {
        console.log('redux job stuff', this.props.reduxState.jobs)
        this.props.reduxState.jobs.map(job=>{
            console.log('fetchJobStages', job)
            if (2 === job.job_id){
                console.log('fetchJobStages: stage matches job', job.stage)
                this.stageCounter+=1
                console.log('stagecounter', this.stageCounter)
                this.props.dispatch({
                    type:'ADD_TO_REDUX_STAGE', payload: {
                        key: this.stageCounter, stage: {
                            stage: job.stage,
                            note: job.note,
                            date: job.date
                        }
                    }
                })
            }
        })
    }

    handleForceUpdate = () => {
        this.forceUpdate()
    }

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_INTERVIEW_STAGES'})
        // this.fetchJobStages()
        // this.props.dispatch({type:'FETCH_JOB_STAGES'})
        
        
    }

    render() {
        console.log('stages state', this.props.reduxState.currentStage, Object.entries(this.props.reduxState.currentStage))
        return(
            <div className="jobOppForm">
                <p className="jobOppsTitle">Stages of the Hiring Process</p>
                
                {Object.entries(this.props.reduxState.currentStage).map((stage) => {
                    console.log('stage from Redux', stage, stage[0])
                    return (
                        <ul>
                            <StageItem stage={stage} i={stage[0]} handleForceUpdate={this.handleForceUpdate}/>
                        </ul>
                        
                    )
                })}
                <IconButton onClick={(event) => this.addStageInput(event)}>
                    <AddIcon/>
                </IconButton>
                <p>Add Stage</p>
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