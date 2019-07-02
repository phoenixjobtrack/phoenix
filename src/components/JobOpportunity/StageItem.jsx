import React, {Component} from 'react'
import { connect } from 'react-redux';


import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import RemoveIcon from '@material-ui/icons/Remove';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';



class StageItem extends Component {

    state = {
        stage: {

            jobId: this.props.reduxState.jobs.length,
            stage: this.props.stage.stage,
            note: this.props.stage.note,
            date: this.props.stage.date
        },
    }

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
            <div>
                <Grid container>
                    <Grid item sm={2}>
                        <IconButton className="oppsSubBut" onClick={this.handleRemove}>
                            <RemoveIcon/>
                            {/* <RemoveIcon className="OppsRemoveIcon" noValidate style={{ paddingTop: 15, fontSize: 30 }} onClick={this.handleRemove}/>      */}
                        </IconButton>
                        <span style={{ fontSize: 20 }}>
                            Stage:
                            </span>
                    </Grid>
                    <Grid item sm={3}>
                        <FormControl >
                            <InputLabel>Choose Your Stage</InputLabel>
                            <Select
                                style={{ width: 235 }}
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
                        </FormControl>
                    </Grid>
                    <Grid item sm={2}>
                        <form noValidate style={{ paddingTop: 16 }}>
                            <TextField
                                id="date"
                                style={{ width: 150 }}
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
                    <Grid item sm={5}>
                        <Input
                            style={{ width: 300, paddingTop: 16 }}
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