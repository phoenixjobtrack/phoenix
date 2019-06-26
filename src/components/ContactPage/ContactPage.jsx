import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

class ContactPage extends Component {
    //retrieve userId from URL params
    userId = this.props.match.params.id
    

    render(){
        return(
            <p>contact here {this.userId}</p>
        )
    }
}

export default withRouter(connect()(ContactPage))