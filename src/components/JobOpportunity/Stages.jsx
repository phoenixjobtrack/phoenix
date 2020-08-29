import React, { Component } from 'react'
import { connect } from 'react-redux'

import StageItem from './StageItem'

import {
  List,
  ListItem,
  ListItemIcon,
  Typography,
  withStyles,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'

const styles = (theme) => ({
  addTip: {
    backgroundColor: theme.palette.primary.main,
  },
})

class Stages extends Component {
  stageCounter = Object.entries(this.props.reduxState.currentStage).length - 1
  addStageInput() {
    this.stageCounter = this.stageCounter + 1
    console.log('stageCounter', this.stageCounter)
    this.props.dispatch({
      type: 'ADD_TO_REDUX_STAGE',
      payload: {
        key: this.stageCounter,
        stage: {
          stage: '',
          note: '',
          date: '',
        },
      },
    })
  }

  handleForceUpdate = () => {
    this.forceUpdate()
  }

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_INTERVIEW_STAGES' })
  }

  render() {
    return (
      <div className='jobOppForm'>
        <List>
          <Typography variant='h5' paragraph={true} align='left'>
            Stages of the Hiring Process
          </Typography>
          {Object.entries(this.props.reduxState.currentStage).map((stage) => {
            return (
              <StageItem
                key={stage[0]}
                stage={stage}
                i={stage[0]}
                handleForceUpdate={this.handleForceUpdate}
              />
            )
          })}
          <ListItem>
            <ListItemIcon>
              <Tooltip className='addTip' title='Add Stage'>
                <IconButton
                  color='primary'
                  aria-label='Add Stage'
                  onClick={(event) => this.addStageInput(event)}
                >
                  <AddIcon color='primary' />
                </IconButton>
              </Tooltip>
            </ListItemIcon>
          </ListItem>
        </List>
      </div>
    )
  }
}

const mapStateToProps = (reduxState) => ({
  reduxState,
})

export default withStyles(styles)(connect(mapStateToProps)(Stages))
