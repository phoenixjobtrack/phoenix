import React, { Component } from 'react';
import StickyList from'./StickyList';
import {connect} from 'react-redux'



class ContactBookPage extends Component {
    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_CONTACTS'})
        this.props.dispatch({type: 'SHOW_CONTACTS'})
    }
    
    render () {
        return(
            <div>
                <StickyList / >
            </div>
        )
    }
};

const mapStateToProps = reduxState => ({
    reduxState
});

export default connect(mapStateToProps)(ContactBookPage);