import React, {Component} from 'react'
import { connect } from 'react-redux';


import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import RemoveIcon from '@material-ui/icons/Remove';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';



class StageItem extends Component {

    handleStageChange = (propertyName) => (event) => {
        console.log('stageInfo', event.target.value, propertyName);
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
        console.log('in handleRemove', this.props.i)
        this.props.dispatch({
            type: 'REMOVE_STAGE_FROM_REDUX',
            payload: this.props.i
        })
        //call function in parent component that forces parent to rerender
        this.props.handleForceUpdate()
    }

    render(){
        console.log('value', this.props.i)
        return(
            <div >
                <Grid container>
                    <Grid item xs={1}>
                        <IconButton className="oppsSubBut" onClick={this.handleRemove}>
                            <RemoveIcon />
                        </IconButton>
                        {/* <span>
                            Stage:
                        </span> */}
                        
                    </Grid>
                    <Grid item xs={4}>
                        <InputLabel>Choose Your Stage</InputLabel>
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
                                    <MenuItem value={interviewStage.stage} primaryText={interviewStage.stage}>{interviewStage.stage}</MenuItem>
                                )
                            })}
                        </Select>
                    </Grid>
                    <Grid xs={3}>
                        <form noValidate >
                            <InputLabel>Date</InputLabel>
                            <TextField
                                id="date"
                                // style={{ width: 150 }}
                                onChange={this.handleStageChange('date')}
                                type="date"
                                value={this.props.reduxState.currentStage[this.props.i].date}
                                // defaultValue="2017-05-24"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </form>
                    </Grid>
                    <Grid xs={4}>
                        <InputLabel>Notes</InputLabel>
                        <Input
                            // style={{ paddingTop: 16 }}
                            onChange={this.handleStageChange('note')}
                            value={this.props.reduxState.currentStage[this.props.i].note}
                            placeholder="Notes"
                            inputProps={{
                                'aria-label': 'Description',
                            }}
                        />
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState
});

export default connect(mapStateToProps)(StageItem)