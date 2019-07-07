import React, { Component } from 'react';
import { connect } from 'react-redux';
import './NewTable.css';

class NewTable extends Component {

    render() {
        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th>COMPANY</th>
                            <th>POSITION</th>
                            <th>STAGE</th>
                            <th>NEXT ACTIVITY DATE</th>
                            <th>NOTES</th>
                            <th>NEXT STAGE</th>
                            <th>UPDATE</th>
                            <th>DELETE</th>
                        </tr>
                         {this.props.reduxState.jobs.map(job => {
                                return (
                                    //  <p>{event.id}</p>
                                    <tr key={job.id}>
                                        <td >{job.company_name}</td>
                                        <td>{job.position}</td>
                                        <td>{job.currentStage}</td>
                                        <td>{job.nextStageDate.substr(0, 16)}</td>
                                        <td>{job.nextStageNote}</td>
                                        <td>{job.nextstage}</td>
                                        <td><button>Update</button></td>
                                        <td><button>Delete</button></td>
                                        {/* <td><button className="update-button" value={event.id} onClick={() => this.updateEvent(event.id)}>Update</button></td>
                                        <td><button className="delete-button" value={event.id} onClick={() => this.deleteEvent(event.id)}>Delete</button></td> */}
                                    </tr>
                                )
                            })}
                    </tbody>
                </table>
            </div>
        )
    }
}







const mapStateToProps = (reduxState) => {
    return {
        reduxState
    }
};

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(NewTable);
