import React, { Component } from 'react';
import StickyList from'./StickyList';
import {connect} from 'react-redux'
import Box from '@material-ui/core/Box';


class ContactBookPage extends Component {
    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_CONTACTS'})
    }
    
    render () {
        return(
            <div>
                <h2><Box>Contacts</Box></h2>
                <StickyList / >
            </div>
        )
    }
};

const mapStateToProps = reduxState => ({
    reduxState
});

export default connect(mapStateToProps)(ContactBookPage);