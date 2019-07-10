// ----- TASKS MENU ITEMS ----- //
// Menu items from TaskLineItems drop down menu //
// Child of TasksLineItemsContent

// ----- REACT ----- //
import React, { Component } from 'react';
import { connect } from 'react-redux';

// ----- DEPENDENCIES ----- //
import swal from 'sweetalert';

// ----- MATERIAL UI CORE ----- //
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Tooltip from '@material-ui/core/Tooltip';

// ----- MATERIAL UI ICONS ----- //
import MoreVertIcon from '@material-ui/icons/MoreVert';

class TasksMoreDropdown extends Component {

    addNoteToTask(popupState) {
        
        popupState();
        swal({
            text: 'Add note to task',
            content: "input",
            button: {
                text: "add",
                closeModal: false,
            },
        })
            .then(note => {
                if (!note) throw null;
                this.props.dispatch({ type: 'ADD_TASK_NOTE', payload: { id: this.props.id, note: `${note}`}})
            })
            .then(results => {
                swal("Note Added", {
                    icon: "success",
                });

            })
    }; // End addNoteToTask

    addContactToTask(popupState) {
        popupState();
    }; // End addContactToTask

    addJobToTask(popupState) {
        popupState();
    }; // End addJobToTask

    render() {
        return (
            <>
                <div className="moreMenu">
                    <PopupState variant="popover" popupId="popup-menu">
                        {popupState => (
                            <React.Fragment>
                                <Tooltip title="More">
                                    <IconButton 
                                        variant="contained" 
                                        {...bindTrigger(popupState)} 
                                        color="secondary">
                                        <MoreVertIcon />
                                    </ IconButton>
                                </Tooltip>
                                <Menu {...bindMenu(popupState)}>
                                    <MenuItem
                                        onClick={() => this.addNoteToTask(popupState.close)}

                                    >Add Note</MenuItem>
                                    <MenuItem
                                        onClick={() => this.addContactToTask(popupState.close)}

                                    >Add To Contact</MenuItem>
                                    <MenuItem
                                        onClick={() => this.addJobToTask(popupState.close)}

                                    >Add To Job</MenuItem>
                                </Menu>
                            </React.Fragment>
                        )
                        }
                    </PopupState>
                </div>
            </>
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