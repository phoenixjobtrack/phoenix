// ----- REACT ----- //
import React, { Component } from 'react';
import { connect } from 'react-redux';

// ----- COMPONENTS ----- //


// ----- MATERIAL UI CORE ----- //
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';


// ----- MATERIAL UI ICONS ----- //
import FaceIcon from '@material-ui/icons/Face';


// ----- STYLES ----- //


class TaskNoteContact extends Component {

    render() {
        
            let contactChip;
        
            if (this.props.contact_id !== null) {
            this.props.reduxState.contacts.map((contact, i) => {
                if (contact.id == this.props.contact_id) {
                    console.log('It is a match', this.props.contact_id, contact.id);
                    contactChip=
                        <div className="taskNoteContact"> 
                            <Tooltip title="Contact">
                                <Chip
                                    avatar={
                                        <Avatar>
                                            <FaceIcon />
                                        </Avatar>
                                    }
                                    label={contact.first_name}
                                    variant="outlined"
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