import React from 'react';
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'

//Material UI
import {Grid} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'


const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: '80%',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

function ContactCard(props) {
    const classes = useStyles();
    //received props from parent component
    const contact = props.contact

    //local state hooks
    const [expanded, setExpanded] = React.useState(false);

    function handleExpandClick() {
        setExpanded(!expanded);
    }

    function handleOpenContact(){
        console.log('in handleContactSelect', contact)
        props.dispatch({ type: 'SET_TO_EDIT_MODE'})
        props.history.push(`/contact/view/${contact.id}`)

    }

    

    return (
        <Card className={classes.card}>
            <CardHeader
                avatar={
                    <Avatar aria-label="Contact" className={classes.avatar}>
                        {contact.first_name[0]}{contact.last_name[0]}
                    </Avatar>
                }
                title={`${contact.first_name} ${contact.last_name}`}
                subheader={contact.company}
                action={
                    <IconButton aria-label="View More and Edit" onClick={handleOpenContact}>
                        <OpenInNewIcon />
                        <EditIcon />                        
                    </IconButton>
                }
                
            />
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item sm={4}>
                        <Typography >Position: {contact.position}</Typography>
                    </Grid>
                    <Grid item sm={4}>
                        <Typography>
                            email: {contact.email}
                        </Typography>
                    </Grid>
                    <Grid item sm={4}>
                        <Typography>
                            Phone: {contact.phone}
                        </Typography>
                    </Grid>
                    <Grid item sm={4}>
                        
                    </Grid>
                    <Grid item sm={4}>
                        <Typography >
                            LinkedIn: {contact.linkedInUrl}
                        </Typography>
                    </Grid>
                    <Grid item sm={4}>
                        <Typography>
                            Cell: {contact.cell}
                        </Typography>
                    </Grid>
                    <Grid item sm={6}>
                        <Typography >
                            Notes: 
                        </Typography>
                        <Typography>
                            {contact.notes}
                        </Typography>
                    </Grid>  
                    <Grid item sm={6}>
                        <Typography >
                            Tasks:
                            {/* insert tasks here */}
                            <ul>
                                <li>Task Here</li>
                                
                            </ul>
                        </Typography>
                    </Grid>  
                </Grid>
                
            </CardContent>
            <CardActions disableSpacing>
                History
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="Show more"
                >
                    <ExpandMoreIcon />
                </IconButton>

            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>
                        {/* insert task history here */}
                        <ul>
                            <li>Task History Here</li>
                        </ul>                       
                    </Typography>                    
                </CardContent>
            </Collapse>
        </Card>
    );
}

const mapStateToProps = reduxState => ({
    reduxState
});

export default withRouter(connect(mapStateToProps)(ContactCard));