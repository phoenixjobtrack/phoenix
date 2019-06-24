import React from 'react';
import { connect } from 'react-redux';

//MaterialUI stuff
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Chip } from '@material-ui/core'


const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    chip: {
        margin: theme.spacing(1),
    },
}));

function SignUp(props) {
    const classes = useStyles();

    //set up hooks   
    const [firstName, setFirstName] = React.useState();
    const [lastName, setLastName] = React.useState();
    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();
    const [attributes, setAttributes] = React.useState([]);
    const [newAttribute, setNewAttribute] = React.useState();

    //funcition to handle firstName change
    const handleFirstNameChange = (event) => {
        //save input in local state
        setFirstName(event.target.value)
    }

    //function to handle lastName change
    const handleLastNameChange= (event) => {
        //save input in local state
        setLastName(event.target.value)
    }

    //function to handle email change
    const handleEmailChange = (event) => {
        //save input in local state
        setEmail(event.target.value)
    }

    //function to handle password change
    const handlePasswordChange = (event) => {
        //save input in local state
        setPassword(event.target.value)
    }

    //function to handle job attribute input
    const handleAttributeChange = (event) => {
        //save input in local state
        setNewAttribute(event.target.value)
    }

    //function to handle adding attributes
    let attributesArray = []
    const handleAttributeSubmit = (event) => {
        event.preventDefault()
        console.log('in handleAttributeSubmit, attribute:',newAttribute)
        attributesArray = [...attributes, newAttribute];
        setAttributes(attributesArray)
        // console.log('in handleAttributeSubmit, attributes:', attributes)
    }

    //function to handle removing chip
    const handleDelete = (attribute) => {
        console.log('in handleDelete', attribute)
        attributesArray=[...attributes]
        attributesArray.splice(attributesArray.indexOf(attribute), 1);
        setAttributes(attributesArray)
    }

    //function to handle submit
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log('in handleSubmit', firstName, lastName, email, password, newAttribute)
        if (firstName && lastName && email && password) {
            console.log('in handleSubmit', firstName, lastName, email, password, attributes)
            props.dispatch({
                type: 'REGISTER',
                payload: {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                    attributes: attributes
                },
            });
        } else {
            props.dispatch({ type: 'REGISTRATION_INPUT_ERROR' });
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                onChange={handleFirstNameChange}
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                onChange={handleLastNameChange}
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                onChange={handleEmailChange}
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                onChange={handlePasswordChange}
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                        </Grid>
                        
                    </Grid>
                    <Grid container justify="center">
                        <Grid item>
                            <p> Tell us a bit about what you're looking for.
                                This will help you measure how well your job opportunities match the attributes of your ideal job.
                            </p>
                            <p>
                                (You can skip this step now and edit this section later from your profile page).
                            </p>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12}>
                            <form onSubmit={handleAttributeSubmit}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    name="attributes"
                                    label="Job Attributes"
                                    placeholder="ex. Unlimited PTO, close to home, Salary $80k"
                                    id="attributes"
                                    onChange={handleAttributeChange}
                                />
                            </form>
                            
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item>
                            {attributes.map(attribute=>{
                                return(
                                    <Chip
                                        label={attribute}
                                        onDelete={()=>{handleDelete(attribute)}}
                                        className={classes.chip}
                                        color="primary"
                                    />
                                    // <p>{attribute}</p>
                                )                                
                            })}
                        </Grid>
                    </Grid>
                    <Button
                        onClick={handleSubmit}                        
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="center">
                        <Grid item>
                            <Link href="#" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
            </div>
        </Container>
    );
}

export default connect()(SignUp)