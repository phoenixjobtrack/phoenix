import React, { Component } from 'react';
import { connect } from 'react-redux';

import RequirementItem from './RequirementItem'

import Grid from '@material-ui/core/Grid';

class Requirements extends Component {

    
    render(){
        return(
            <div className="jobOppForm">
                <p className="jobOppsTitle">Employment Requirements</p>
                <Grid container>
                    <Grid item sm={8}></Grid>
                    <Grid item sm={4}>
                        <button>Update Personal Requirements</button>
                    </Grid>
                </Grid>
                {this.props.require.map((requirement, i) => {
                    return (
                        <ul>
                            <RequirementItem requirement={requirement} i={i}/>
                        </ul>
                        
                    )
                })}

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    require: state.requirements

});

export default connect(mapStateToProps)(Requirements)