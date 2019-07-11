import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import UpcomingTasks from './UpcomingTasks'
import CompletedTasks from './CompletedTasks'

//Material UI
import { Grid, Tooltip } from '@material-ui/core'
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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import OpenInNewIcon from '@material-ui/icons/OpenInNew'


const useStyles = makeStyles(theme => ({
    card: {
        width: '100%',
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
        backgroundColor: theme.palette.secondary.main,
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

    function handleOpenContact() {
        //route to view page with id in URL params
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
                    <Tooltip title="View and edit contact">
                        <IconButton aria-label="View More and Edit" color="primary" onClick={handleOpenContact}>
                            <OpenInNewIcon />
                        </IconButton>
                    </Tooltip>
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
                            <UpcomingTasks contactId={contact.id} />
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions disableSpacing>
                History
                <Tooltip title="Expand to see past tasks involving this contact.">
                    <IconButton
                        color="secondary"
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="Show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </Tooltip>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>
                        {/* insert task history here */}
                        <CompletedTasks contactId={contact.id} />
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