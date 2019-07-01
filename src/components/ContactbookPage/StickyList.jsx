import React, { useEffect } from 'react';
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'

//Material-UI stuff
import ContactCard from './ContactCard'
import { makeStyles } from '@material-ui/core/styles';
import {Button} from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';

import PersonAddIcon from '@material-ui/icons/PersonAdd'


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 1000,
        backgroundColor: theme.palette.background.paper,
        overflow: 'auto',
        maxHeight: 1000,
        height:'75vh'
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
        document.getElementById(letter).scrollIntoView();
    }

    const addNewContact = () => {
        console.log('in addNewContact')
        props.dispatch({ type:'SET_TO_CREATE_MODE'})
        props.history.push('/contact/add')
    }

    return (
        <div >            
            <div className={classes.sorting}>
                <h3>Sort Alphabetically By:
                    <Button variant="contained" color="primary" onClick={() => { setSorting('first') }}>
                            First Name
                    </Button>
                    <Button variant="contained" color="primary" onClick={() => { setSorting('last') }}>Last Name</Button>
                    <Button variant="contained" color="primary" onClick={() => { setSorting('company') }}>Company</Button>
                    <IconButton variant="contained" color="primary" aria-label="add new contact" onClick={addNewContact} >
                        <PersonAddIcon/>
                    </IconButton>
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
                                if (key==='first'&&contact.first_name){
                                    word = contact.first_name
                                }
                                else if (key==='last'&&contact.last_name){
                                    word=contact.last_name
                                }
                                else if (contact.company){
                                    word=contact.company
                                }
                                else
                                    word='a'
                                
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