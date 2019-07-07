import React, { Component } from 'react';
import { connect } from 'react-redux';

import RequirementItem from './RequirementItem'

import Grid from '@material-ui/core/Grid';
import {Button, List, ListItem, ListItemIcon, Typography} from '@material-ui/core'

class Requirements extends Component {

    
    render(){
        return(
            <div className="jobOppForm">
                
                    <Typography variant='h5' paragraph="true" align="left">Wish List</Typography>                             
                <List>
                    <Button variant="contained" color="primary">Update Personal Requirements</Button>
                    {this.props.require.map((requirement, i) => {
                        return (
                            <RequirementItem requirement={requirement} i={i} />
                        )
                    })}
                </List>
                
                {/* <Grid container>
                    <Grid item sm={8}></Grid>
                    <Grid item sm={4}>
                        <button>Update Personal Requirements</button>
                    </Grid>
                </Grid> */}
                

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    require: state.requirements

});

export default connect(mapStateToProps)(Requirements)