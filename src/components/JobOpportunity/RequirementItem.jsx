// ----- REACT ----- //
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

// ----- COMPONENTS ----- //
import Stages from './Stages'
import Tasks from './Tasks'

// ----- MATERIAL UI CORE ----- //
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

// ----- MATERIAL UI ICONS ----- //
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';






class RequirementItem extends Component {
    handleRequireChange = propertyName => (event) => {
        console.log('requireInfo', event.target.value, this.props.user);
        this.props.dispatch({
            type: 'UPDATE_REDUX_REQUIREMENT',
            payload: {
                key: this.props.i,
                requirement_id: this.props.user.id,
                prop: propertyName,
                value: event.target.value
            }
        })
    }
    
    componentDidMount(){
        this.props.dispatch({ type: 'FETCH_REQUIREMENTS' })
    }
    render(){
        return(
            <div className="oppGrid4">
                <Grid container>
                    <Grid item sm={4}>
                        <span> Requirement: {this.props.user.requirement} </span>
                    </Grid>
                    <Grid item sm={5}>
                        <Input
                            // style={{ width: 350 }}
                            placeholder="Offer Details"
                            onChange={this.handleRequireChange('requirement_offer')}
                            inputProps={{
                                'aria-label': 'Description',
                            }}
                        />
                    </Grid>
                    <Grid item sm={3}>
                        <FormControl component="fieldset" >
                            <FormLabel component="legend">Meets Requirement?</FormLabel>
                            <RadioGroup >
                                <FormControlLabel
                                    control={
                                        <Radio 
                                            onChange={this.handleRequireChange('requirement_met')} 
                                            value="true" 
                                        />
                                    }
                                    label="True"
                                />
                                <FormControlLabel
                                    control={
                                        <Radio 
                                            onChange={this.handleRequireChange('requirement_met')} 
                                            value="false" 
                                        />
                                    }
                                    label="False"
                                />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => ({
    currentJob: reduxState.currentJob

});

export default connect(mapStateToProps)(RequirementItem)