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
    addStageInput() {
        this.setState({ stages: [...this.state.stages, {}] })
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
        console.log('stages state', this.state)
        return(
            <div className="jobOppForm">
                <p className="jobOppsTitle">Stages of the Hiring Process</p>

                {this.state.stages.map((stage, i) => {
                    return (
                        <ul>
                            <StageItem stage={stage} i={i}/>
                        </ul>
                        
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