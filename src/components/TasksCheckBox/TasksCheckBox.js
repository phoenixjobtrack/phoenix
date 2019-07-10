// ----- REACT ----- //
import React, { Component } from 'react';
import { connect } from 'react-redux';

// ----- MATERIAL UI ICONS ----- //
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlank from '@material-ui/icons/CheckBoxOutlineBlank';

class TasksCheckBox extends Component {

    render(props) {

        let checkBox;

        if (this.props.complete === true) {
            checkBox = <CheckBoxIcon />
        } else {
            checkBox = <CheckBoxOutlineBlank />
        }
        return (
            <div>{checkBox}</div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        tasks: reduxState.tasksReducer,
        reduxState
    }
}

export default connect(mapStateToProps)(TasksCheckBox);