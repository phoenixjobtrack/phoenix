import React, {Component} from 'react'
import { connect } from 'react-redux';
import moment from 'moment';

import TextField from '@material-ui/core/TextField';
import RemoveIcon from '@material-ui/icons/Remove';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {List, ListItem, ListItemIcon} from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip';



class StageItem extends Component {

    handleStageChange = (propertyName) => (event) => {
        //send stage object to redux
        this.props.dispatch({ 
            type: 'UPDATE_REDUX_STAGE', 
            payload: { 
                key: this.props.i, 
                prop: propertyName, 
                value: event.target.value 
            }
        })
    }
    handleRemove = () => {
        this.props.dispatch({
            type: 'REMOVE_STAGE_FROM_REDUX',
            payload: this.props.i
        })
        //call function in parent component that forces parent to re-render
        this.props.handleForceUpdate()
    }

    render(){
        console.log('value', this.props.i)
        return(
            <ListItem >
                <ListItemIcon>
                    <Tooltip title="Remove Stage">
                        <IconButton className="oppsSubBut" onClick={this.handleRemove} color="secondary">
                            <RemoveIcon/>
                        </IconButton> 
                    </Tooltip>         
                </ListItemIcon>  
                <List>
                    <ListItem>
                        <InputLabel>Choose Your Stage</InputLabel>
                    </ListItem>
                    <ListItem>
                        <Select
                            style={{ minWidth: 230 }}
                            onChange={this.handleStageChange('stage')}
                            value={this.props.reduxState.currentStage[this.props.i].stage}
                            inputProps={{
                                name: 'stage',
                                id: 'stage-simple',
                            }}
                        >
                            {this.props.reduxState.interviewStages.map((interviewStage) => {
                                return (
                                    <MenuItem value={interviewStage.stage}>{interviewStage.stage}</MenuItem>
                                )
                            })}
                        </Select> 
                    </ListItem>
                </List>
                <List>
                    <ListItem>
                        <InputLabel>Date</InputLabel>
                    </ListItem>
                    <ListItem style={{ width: 175 }}>
                        <TextField
                            style={{ width: '100%' }}
                            id="date"
                            onChange={this.handleStageChange('date')}
                            type="date"
                            value={moment(this.props.reduxState.currentStage[this.props.i].date).format('YYYY-MM-DD')}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </ListItem>
                </List>
                <List style={{ width: 300 }}>
                    <ListItem>
                        <InputLabel>Notes</InputLabel>
                    </ListItem>
                    <ListItem >
                        <TextField
                            style={{ width: '100%'}}
                            onChange={this.handleStageChange('note')}
                            value={this.props.reduxState.currentStage[this.props.i].note}
                            inputProps={{
                                'aria-label': 'Description',
                            }}
                        />
                    </ListItem>
                </List>
            </ListItem>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});

export default connect(mapStateToProps)(StageItem)