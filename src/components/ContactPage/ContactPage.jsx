import React, {Component} from 'react';
import {connect} from 'react-redux';

class ContactPage extends Component {
    render(){
        return(
            <p>contact here</p>
        )
    }
}

export default connect()(ContactPage)