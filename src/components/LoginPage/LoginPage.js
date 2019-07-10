// ----- REACT ----- //
import React, { Component } from 'react';
import { connect } from 'react-redux';

// ----- MATERIAL UI ----- //
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import './LoginPage.css';

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

// ----- SIGN IN ----- //
function SignIn(props) {
  const classes = useStyles();

  // set up hooks
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();

  // function to handle email change
  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  // function to handle password change
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const login = (event) => {
    event.preventDefault();
    if (!email) return;
    if (!password) return;
    if (email && password) {
      props.dispatch({
        type: 'LOGIN',
        payload: {
          email: email,
          password: password
        }
      })
      props.history.push('/dashboard')
    } else {
      props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
    
  } // end login


  return (
    <Container 
      className="loginContainer"
      component="main" 
      maxWidth="xs" 
    >
      <Card >
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
          <form onSubmit={login} className={classes.form} id="loginTextField" noValidate>
          <TextField
            className="loginTextField"
            autoComplete="email"
            name="email"
            variant="outlined"
            onChange={handleEmailChange}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            autoFocus
          />
          <TextField
            className="loginTextField"
            autoComplete="current-password"
            name="password"
            variant="outlined"
            onChange={handlePasswordChange}
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            type="password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            // type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            type="submit"
            className="link-button"
            // onClick={login}
            // onClick={() => { props.dispatch({ type: 'SET_TO_REGISTER_MODE' }) }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link 
                onClick={() => { props.dispatch({ type: 'SET_TO_REGISTER_MODE' }) }}
                href="#" 
                variant="body2"
                >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
       
      </Box>
      </Card>
    </Container>
  );
}

const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(SignIn);
