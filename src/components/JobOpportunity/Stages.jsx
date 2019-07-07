import React, {Component} from 'react'
import { connect } from 'react-redux';

import StageItem from './StageItem'
import { InputLabel, Typography, TextField, Box, withStyles, Icon, List, ListItem, ListItemIcon } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';



class Stages extends Component {
    stageCounter = Object.entries(this.props.reduxState.currentStage).length-1
    addStageInput() {
        this.stageCounter = this.stageCounter+1
        console.log('stageCounter', this.stageCounter)
        // this.setState({ stages: [...this.state.stages, {}] })
        this.props.dispatch({
            type: 'ADD_TO_REDUX_STAGE', 
            payload: {
                key: this.stageCounter, 
                stage: {
                    stage: '',
                    note: '',
                    date: ''
                }
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
                <Typography variant='h5' paragraph="true" align="left">Stages of the Hiring Process</Typography>
                
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