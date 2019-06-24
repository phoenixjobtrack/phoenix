// ----- MASTER TASK VIEW ----- //
// All Tasks Funnel Into This Component

// ----- REACT ----- //
import React, { Component } from 'react';
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import { connect } from 'react-redux';



// ----- STYLES ----- //
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import arrayMove from 'array-move';


// ----- MATERIAL UI ----- // 
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';



const SortableItem = sortableElement(({ value }) => <Toolbar ><Paper> <li>{value}</li></Paper></Toolbar>);

const SortableContainer = sortableContainer(({ children }) => {
    return <ul>{children}</ul>;
});

const theme = createMuiTheme({
    palette: {
        primary: { main: '#e61610' },
    },
});

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        fontSize: 24,
    },
}));


class Tasks extends Component {
    state = {
        items: [
            'Corn 01',
            'Horn 02',
            'Bjorn 03',
            'Born 04',
            'Storn 05',
            'Florn 06',
            'Meorn 07',
            'Sorn 08',
            'Jorn 09',
            'Scorn 10',
        ],
    };


    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState(({ items }) => ({
            items: arrayMove(items, oldIndex, newIndex),
        }));
    };


    render() {
        const { items } = this.state;

        return (

            <div>
                <ThemeProvider >
                    
                    <SortableContainer onSortEnd={this.onSortEnd}>

                        {items.map((value, index) => (
                            <SortableItem key={`item-${index}`} index={index} value={value} />
                        ))}

                    </SortableContainer>
                </ThemeProvider>
            </div>
        );
    }
}

// class Tasks extends Component {
//     render() {
//         return (
//             <p>This is the Task View</p>
//         )
//     }
// }
const mapStateToProps = (reduxState) => {
    return {
        reduxState
    }
}

export default connect(mapStateToProps)(Tasks);
