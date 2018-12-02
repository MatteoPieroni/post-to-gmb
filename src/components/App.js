import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { Auth } from "aws-amplify";

import './App.css';

import Routes from "./Routes";

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };
  }

  async componentDidMount() {
    try {
      await Auth.currentSession();
      this.userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }

    this.setState({ isAuthenticating: false });
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  handleLogout = async event => {
    await Auth.signOut();

    this.userHasAuthenticated(false);
    this.props.history.push("/login");
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };

    return (
      !this.state.isAuthenticating &&
      <div className="App">
        <header className="App-header">
          {this.state.isAuthenticated
            ? <a href="#!" onClick={this.handleLogout}>Logout</a>
            : <Fragment>
                <Link to="/login">Login</Link>{' '}
                <Link to="/signup">Sign up</Link>
              </Fragment>
          }
        </header>
        <Routes childProps={childProps} />
      </div>
    );
  }
}

export default withRouter(App);
