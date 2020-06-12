import React, { Component } from 'react'
import { connect } from 'react-redux'

import RequirementItem from './RequirementItem'
import { Button, List, Typography } from '@material-ui/core'

class Requirements extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_REQUIREMENTS' })
  }

  render() {
    return (
      <div className='jobOppForm'>
        <Typography variant='h5' paragraph={true} align='left'>
          Important Job Attributes
        </Typography>
        <List>
          <Button variant='contained' color='primary'>
            Update Important Attributes
          </Button>
          {this.props.require.map((requirement, i) => {
            return (
              <RequirementItem
                key={requirement.id}
                requirement={requirement}
                i={i}
              />
            )
          })}
        </List>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  require: state.requirements,
})

export default connect(mapStateToProps)(Requirements)
