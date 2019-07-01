import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import tasks from './tasksReducer';
import user from './userReducer';
import contacts from './contactReducer';
import requirements from './requirementReducer';
import jobs from './jobReducer';
import currentContact from './currentContactReducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  tasks, 
  user, // will have an id and email if someone is logged in
  contacts, //will store all of the user's contacts
  requirements, //will store all of the user's job requirements
  jobs,
  currentContact, //stores data for selected contact
});

export default rootReducer;
