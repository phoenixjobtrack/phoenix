import React, { useEffect } from 'react';
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'

import ContactCard from './ContactCard'

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import {Button} from '@material-ui/core'

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

    //handles add new contact
    const addNewContact = () => {
        console.log('in addNewContact')
        props.history.push('/contact/view/:id')
    }
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
                <Button variant="contained" color="primary" onClick={addNewContact}>Add New Contact</Button>
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
                                    word = contact.first_name
                                }
                                else if (key==='last'){
                                    word=contact.last_name
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
export default withRouter(connect(mapStateToProps)(PinnedSubheaderList))