import React, { useEffect } from 'react';
import {connect} from 'react-redux'

import ContactCard from './ContactCard'

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';


let contacts = [
    // {
    //     first: 'Andrew',
    //     last: 'Christianson',
    //     company: 'Target'
    // },
    // {
    //     first: 'Andrew',
    //     last: 'Christianson',
    //     company: 'Target'
    // },
    // {
    //     first: 'Andrew',
    //     last: 'Christianson',
    //     company: 'Target'
    // },
    // {
    //     first: 'Andrew',
    //     last: 'Christianson',
    //     company: 'Target'
    // },
    // {
    //     first: 'Bella',
    //     last: 'Anderson',
    //     company: 'Best Buy'  
    // },
    // {
    //     first: 'Christian',
    //     last: 'Davenport',
    //     company: '3M'
    // },
    // {
    //     first: 'Daria',
    //     last: 'Edgerton',
    //     company: 'Amazon'
    // },
    // {
    //     first: 'Ethan',
    //     last: 'Brown',
    //     company: 'Comcast'
    // }
]
const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 1000,
        backgroundColor: theme.palette.background.paper,
        // position: 'relative',
        overflow: 'auto',
        maxHeight: 1000,
    },
    listSection: {
        backgroundColor: 'inherit',
    },
    ul: {
        backgroundColor: 'inherit',
        padding: 0,
        position: 'relative'
    },
    card: {
        borderWidth:'2px',
        borderColor: 'black',
        borderStyle: 'solid'

    },
    sorting: {
        position: 'sticky'
    },
    
        

    
}));

function PinnedSubheaderList(props) {
    const classes = useStyles();
    useEffect(()=>{
        console.log('props', props)
    })

    //define 'key' in local state.  default sort is by last name
    const [key, setKey] = React.useState('last');
    

    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

    //function defines what word to sort by, sets local state 'key' to that word
    const setSorting = (param) =>{
        setKey(param)
        console.log('doc', document)
        var myDiv = document.getElementById('containerDiv');
        myDiv.scrollTop = 0;
        console.log(param)
        console.log('key', key)

    }

    const scrollToLetter = (letter) => {
        document.getElementById(letter).scrollIntoView(false);
    }
    return (
        <div >
            <div className={classes.sorting}>
                <h3>Sort Alphabetically By:
                <button onClick={() => { setSorting('first') }}>
                        First Name
                </button>
                    <button onClick={() => { setSorting('last') }}>Last Name</button>
                    <button onClick={() => { setSorting('company') }}>Company</button>
                </h3>
                {alphabet.map(letter => (
                    <button onClick={() => { scrollToLetter(letter) }}>{letter}</button>
                ))}
            </div>
            
            <List id="containerDiv" className={classes.root} subheader={<li />}>
                {alphabet.map(sectionId => (
                    <li key={`section-${sectionId}`} className={classes.listSection}>
                        <ul className={classes.ul}>
                            <ListSubheader className={classes.listSubheader}>
                                <a id={sectionId}>
                                    {sectionId}
                                </a>
                            
                            </ListSubheader>
                            {props.reduxState.contacts.map(contact => {
                                let word
                                if (key==='first'){
                                    word = contact.first
                                }
                                else if (key==='last'){
                                    word=contact.last
                                }
                                else {
                                    word=contact.company
                                }
                                
                                let firstLetter = word[0]
                                if (firstLetter.toLowerCase() === sectionId) {
                                    console.log('alphabetize', contact)
                                    return (
                                        <ContactCard contact={contact}/>                                
                                    )
                                }
                            })}
                        </ul>
                    </li>
                ))}
            </List>
        </div>
        
    );
}
const mapStateToProps = reduxState => ({
    reduxState
});
export default connect(mapStateToProps)(PinnedSubheaderList)