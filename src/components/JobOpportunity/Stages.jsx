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
    stageCounter = 0
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
    
    handleStageChange = (propertyName, stage, i) => (event) => {
        console.log('stageInfo', event.target.value, propertyName, stage,i, this.state.stages[i]);
        // this.setState({
        //     ...this.state,
        //     stages: {
        //         ...this.state.stages,
        //         [propertyName]: event.target.value
        //     }
        // });
    }

    

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_INTERVIEW_STAGES'})
    }

    render() {
        // console.log('stages state', this.props.reduxState.currentStage, Object.entries(this.props.reduxState.currentStage))
        return(
            <div className="jobOppForm">
                <p className="jobOppsTitle">Stages of the Hiring Process</p>
                
                {Object.entries(this.props.reduxState.currentStage).map((stage, i) => {
                    return (
                        <ul>
                            <StageItem stage={stage} i={i}/>
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