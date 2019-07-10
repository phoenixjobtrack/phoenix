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
import AddContactPage from '../ContactPage/AddContactPage';
import ContactBookPage from '../ContactbookPage/ContactBookPage';
import DashboardPage from '../DashboardPage/DashboardPage';
import EditContactPage from '../ContactPage/EditContactPage';
import EditJobOpp from '../JobOpportunity/EditJobOpp';
import Footer from '../Footer/Footer';
import Profile from '../Profile/Profile';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import SideMenu from '../SideMenu/SideMenu';
import Tasks from '../Tasks/Tasks';
import JobPipelinePage from '../JobPipelinePage/JobPipelinePage';
import JobOpportunity from '../JobOpportunity/JobOpportunity';
import TopBar from '../TopBar/TopBar';
import UserPage from '../UserPage/UserPage';
import ScrollToTop from '../ScrollToTop/ScrollToTop'

// ========== STYLE ========== //
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles'
import './App.css';


const theme = createMuiTheme({
  palette: {
    primary: { main: '#2196f3'},
    secondary: { main: '#00bcd4' },
    lightBlue: { main: '#e1f5fe'},
    error: { main: '#c2185b'}
  }
})
class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' })
  }

  render() {
    return (
      <Router>
        <ScrollToTop>
        <div className="app" >

          <ThemeProvider theme={theme}>
            <TopBar />
            <SideMenu />
            <Switch>
              {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
              <Redirect exact from="/" to="/home" />
              {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
              <ProtectedRoute
                exact
                path="/home"
                component={UserPage}
              />
              {/* This is the protected Route for the Dashboard page */}
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
              <ProtectedRoute
                exact
                path="/jobOpportunity/:id"
                component={EditJobOpp}
              />
              <ProtectedRoute
                exact
                path="/jobOpportunity"
                component={JobOpportunity}
              />
              {/* If none of the other routes matched, we will show a 404. */}
              <Route render={() => <h1>404</h1>} />
            </Switch>
            <Footer />
          </ThemeProvider>


        </div>
        </ScrollToTop>
      </Router>


    )
  }

}

export default connect()(App);
