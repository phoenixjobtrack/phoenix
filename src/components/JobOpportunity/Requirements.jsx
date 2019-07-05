import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

import Stages from './Stages'
import Tasks from './Tasks'
import RequirementItem from './RequirementItem'

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

class Requirements extends Component {

    state = {
        job_requirements: {},
    }

    
    render(){
        return(
            <div className="jobOppForm">
                <p className="jobOppsTitle">Employment Requirements</p>
                <Grid container>
                    <Grid item sm={8}></Grid>
                    <Grid item sm={4}>
                        <button>Update Personal Requirements</button>
                    </Grid>
                </Grid>
                {this.props.require.map((user, i) => {
                    return (
                        <ul>
                            <RequirementItem user={user} i={i}/>
                        </ul>
                        
                    )
                })}

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    require: state.requirements

});

export default connect(mapStateToProps)(Requirements)