// ----- REACT ----- //
import React, { Component } from 'react';
import { connect } from 'react-redux';

// ----- MATERIAL UI CORE ----- //
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';

// ----- MATERIAL UI ICONS ----- //
import FaceIcon from '@material-ui/icons/Face';
class TaskNoteContact extends Component {

    render() {
        
            let contactChip;
        
            if (this.props.contact_id !== null) {
            this.props.reduxState.contacts.map((contact, i) => {
                if (contact.id == this.props.contact_id) {
                    contactChip=
                        <div className="taskNoteContact"> 
                            <Tooltip title="Contact">
                                <Chip
                                    color="secondary"
                                    avatar={
                                        <Avatar>
                                            <FaceIcon
                                            style={{color: 'white'}}/>
                                        </Avatar>
                                    }
                                    label={contact.first_name}
                                    variant="outlined"
                                    style={{ fontWeight: 900 }}
                                />
                            </Tooltip>
                        </div>
                    
                }
            })

        }
        return (
            <div>{contactChip}</div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        tasks: reduxState.tasksReducer,
        reduxState
    }
}

export default connect(mapStateToProps)(TaskNoteContact);