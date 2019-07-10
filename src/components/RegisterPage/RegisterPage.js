import React from 'react';
import { connect } from 'react-redux';

//MaterialUI stuff
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {Add} from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Chip } from '@material-ui/core';
import './RegisterPage.css';


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
    paddingLeft: '30px',
    paddingRight: '30px'
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
  add: {
    margin: 'auto',
    top:'20%',
    
  }
}));

function SignUp(props) {
  const classes = useStyles();

  //set up hooks   
  const [firstName, setFirstName] = React.useState();
  const [lastName, setLastName] = React.useState();
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [requirements, setRequirements] = React.useState([]);
  const [newRequirement, setNewRequirement] = React.useState();

  //funcition to handle firstName change
  const handleFirstNameChange = (event) => {
    //save input in local state
    setFirstName(event.target.value)
  }

  //function to handle lastName change
  const handleLastNameChange = (event) => {
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

  //function to handle job requirement input
  const handleRequirementChange = (event) => {
    //save input in local state
    setNewRequirement(event.target.value)
  }

  //function to handle adding requirements
  let requirementsArray = []
  const handleRequirementSubmit = (event) => {
    event.preventDefault()
    
    requirementsArray = [...requirements, newRequirement];
    
    setRequirements(requirementsArray)
    //reset state to clear input
    setNewRequirement([]);

  }

  //function to handle removing chip
  const handleDelete = (requirement) => {
    requirementsArray = [...requirements]
    requirementsArray.splice(requirementsArray.indexOf(requirement), 1);
    setRequirements(requirementsArray)
  }

  //function to handle submit
  const handleSubmit = (event) => {
    event.preventDefault()
    if (firstName && lastName && email && password) {
      props.dispatch({
        type: 'REGISTER',
        payload: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          requirements: requirements
        },
      });
    } else {
      props.dispatch({ type: 'REGISTRATION_INPUT_ERROR' });
    }
    props.history.push('/dashboard')
  }

  return (
    <Container 
      className="registerContainer"
      component="main" 
      maxWidth="xs">
      <Card>
      <CssBaseline />
      <div className={classes.paper} id="avatar">
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
          <Typography component="h1" variant="h5" id="avatar">
          Sign up
                </Typography>
        <Grid container spacing={2} id="formContent">
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
                This will help you measure how well your job opportunities match the attributes of your ideal job.</p>
            <p>
              (You can skip this step now and edit this section later from your profile page).</p>
          </Grid>
        </Grid>
        
          <Grid container>
            
              <form onSubmit={handleRequirementSubmit} id="jobRequirementForm">
              <Grid container item xs={12} spacing={2} row>
                
                <Grid item xs={10}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="requirements"
                    label="Important Job Attributes"
                    value={newRequirement}
                    placeholder="ex. Unlimited PTO, close to home, Salary $80k"
                    id="requirements"
                    onChange={handleRequirementChange}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button
                    className={classes.add}
                    variant="contained"
                    color="secondary"
                    type="submit"
                  >
                    <Add />
                  </Button>
                </Grid>
                </Grid>
              </form>
          </Grid>          
        
        <Grid container>
          <Grid item>
            {requirements.map((requirement, i) => {
              return (
                <Chip
                  key={i}
                  label={requirement}
                  onDelete={() => { handleDelete(requirement) }}
                  className={classes.chip}
                  color="primary"
                />
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
            <Link href="#" variant="body2" onClick={() => { props.dispatch({ type: 'SET_TO_LOGIN_MODE' }) }}>
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </div>
      </Card>
    </Container>
  );
}

export default connect()(SignUp)