// ----- TASKS MENU ITEMS ----- //
// Menu items from TaskLineItems drop down menu //

// ----- REACT ----- //
import React, { Component } from 'react';
import { connect } from 'react-redux';

// ----- COMPONENTS ----- //


// ----- MATERIAL UI CORE ----- //
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Tooltip from '@material-ui/core/Tooltip';

// ----- MATERIAL UI ICONS ----- //
import MoreVertIcon from '@material-ui/icons/MoreVert';

class TasksMoreDropdown extends Component {
    render() {
        return (
            <div className="moreMenu">
                <PopupState variant="popover" popupId="popup-menu">
                    {popupState => (
                        <React.Fragment>
                            <Tooltip title="More">
                                <IconButton variant="contained" {...bindTrigger(popupState)} >
                                    <MoreVertIcon />
                                </ IconButton>
                            </Tooltip>
                            <Menu {...bindMenu(popupState)}>
                                <MenuItem
                                    onClick={popupState.close}
                                    onClose={() => this.addNoteToTask}
                                >Add Note</MenuItem>
                                <MenuItem onClick={popupState.close}>Add To Contact</MenuItem>
                                <MenuItem onClick={popupState.close}>Add To Job</MenuItem>
                            </Menu>
                        </React.Fragment>
                    )}
                </PopupState>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        tasks: reduxState.tasksReducer,
        reduxState
    }
}

export default connect(mapStateToProps)(TasksMoreDropdown);