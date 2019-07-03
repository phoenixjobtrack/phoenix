// ----- REACT ----- //
import React, { Component } from 'react';
import { connect } from 'react-redux';

// ----- MATERIAL UI ----- //
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
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
// import { setActionValue } from 'sweetalert/typings/modules/state';


function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Built with love by the '}
      <Link color="inherit" href="https://material-ui.com/">
        Material-UI
      </Link>
      {' team.'}
    </Typography>
  );
}

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
    // setActionValue('');
    // if (this.state.email && this.state.password) {
    //   this.props.dispatch({
    //     type: 'LOGIN',
    //     payload: {
    //       email: state.email,
    //       password: state.password,
    //     },
    //   });
    // } else {
    //   this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    // }
  } // end login


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={login} className={classes.form} noValidate>
          <TextField
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
        <MadeWithLove />
      </Box>
    </Container>
  );
}

// ----- STARTER REPO ----- //

// class LoginPage extends Component {
//   state = {
//     email: '',
//     password: '',
//   };

//   login = (event) => {
//     event.preventDefault();

//     if (this.state.email && this.state.password) {
//       this.props.dispatch({
//         type: 'LOGIN',
//         payload: {
//           email: this.state.email,
//           password: this.state.password,
//         },
//       });
//     } else {
//       this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
//     }
//   } // end login

//   handleInputChangeFor = propertyName => (event) => {
//     this.setState({
//       [propertyName]: event.target.value,
//     });
//   }

//   render() {
//     return (
//       <div>
//         {this.props.errors.loginMessage && (
//           <h2
//             className="alert"
//             role="alert"
//           >
//             {this.props.errors.loginMessage}
//           </h2>
//         )}
//         <form onSubmit={this.login}>
//           <h1>Login</h1>
//           <div>
//             <label htmlFor="email">
//               email:
//               <input
//                 type="text"
//                 name="email"
//                 value={this.state.email}
//                 onChange={this.handleInputChangeFor('email')}
//               />
//             </label>
//           </div>
//           <div>
//             <label htmlFor="password">
//               Password:
//               <input
//                 type="password"
//                 name="password"
//                 value={this.state.password}
//                 onChange={this.handleInputChangeFor('password')}
//               />
//             </label>
//           </div>
//           <div>
//             <input
//               className="log-in"
//               type="submit"
//               name="submit"
//               value="Log In"
//             />
//           </div>
//         </form>
//         <center>
//           <button
//             type="button"
//             className="link-button"
//             onClick={() => {this.props.dispatch({type: 'SET_TO_REGISTER_MODE'})}}
//           >
//             Register
//           </button>
//         </center>
//       </div>
//     );
//   }
// }

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(SignIn);
