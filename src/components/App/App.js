// ========== REACT ========== //
import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import {connect} from 'react-redux';

// ========== COMPONENTS ========== //
import AboutPage from '../AboutPage/AboutPage';
import ContactBookPage from '../ContactbookPage/ContactBookPage';
import DashboardPage from '../DashboardPage/DashboardPage';
import Footer from '../Footer/Footer';
import InfoPage from '../InfoPage/InfoPage';
import Profile from '../Profile/Profile';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import SideMenu from '../SideMenu/SideMenu';
import Tasks from '../Tasks/Tasks';
import JobPipelinePage from '../JobPipelinePage/JobPipelinePage';
import UserPage from '../UserPage/UserPage';
import TopBar from '../TopBar/TopBar';
import AddContactPage from '../ContactPage/AddContactPage'
import EditContactPage from '../ContactPage/EditContactPage'

// ========== STYLE ========== //
import './App.css';


class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'})
    this.props.dispatch({type: 'FETCH_TASKS'})
  }

  render() {
    return (
      <Router>
        <div className="app">
          <TopBar />
          <SideMenu />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
            <Route
              exact
              path="/about"
              component={AboutPage}
            />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <ProtectedRoute
              exact
              path="/home"
              component={UserPage}
            />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            <ProtectedRoute
              exact
              path="/info"
              component={InfoPage}
            />
            {/* This is the protected Route for the Dasboard page */}
            <ProtectedRoute
              exact
              path="/dashboard"
              component={DashboardPage}
            />
            <ProtectedRoute
              exact
              path="/profile"
              component={Profile}
            />
            {/* This is the protected Route for the Task page */}
            <ProtectedRoute
              exact
              path="/tasks"
              component={Tasks}
            />
            <ProtectedRoute
              exact
              path="/contact"
              component={ContactBookPage}
            />
            <ProtectedRoute
              exact
              path="/contact/view/:id"
              component={EditContactPage}
            />
            <ProtectedRoute
              exact
              path="/contact/add"
              component={AddContactPage}
            />
            <ProtectedRoute
              exact
              path="/jobpipeline"
              component={JobPipelinePage}
            />
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
  )}
}

export default connect()(App);
