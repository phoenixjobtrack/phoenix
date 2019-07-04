import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

import Stages from './Stages'
import Tasks from './Tasks'

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

class RequirementItem extends Component {
    handleRequireChange = propertyName => (event) => {
        console.log('requireInfo', event.target.value);
        this.props.dispatch({
            type: 'UPDATE_REDUX_REQUIREMENT',
            payload: {
                key: this.props.i,
                prop: propertyName,
                value: event.target.value
            }
        })
        // this.setState({
        //     job_requirements: {
        //         ...this.state,
        //         [propertyName]: event.target.value
        //     }
        // });
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
                            <FormGroup >
                                <FormControlLabel
                                    control={
                                        <Checkbox onChange={this.handleRequireChange('requirement_met')} value="true" />
                                    }
                                    label="True"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox onChange={this.handleRequireChange('requirement_met')} value="false" />
                                    }
                                    label="False"
                                />
                            </FormGroup>
                        </FormControl>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default connect()(RequirementItem)