import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {apiData} from '../apiData';
import Button from './Button';
import {gapiWrapper} from './gapiWrapper';

const gapi = gapiWrapper.init();

class LoginOnGoogle extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loggedIn: null,
		}

		this.initGoogleClient = this.initGoogleClient.bind(this);
		this.updateSigninStatus = this.updateSigninStatus.bind(this);
		this.logIn = this.logIn.bind(this);
		this.logOut = this.logOut.bind(this);
	}

	componentDidMount() { 
		if(gapi)
	    	gapi.load('client:auth2', this.initGoogleClient);
	}

	initGoogleClient () {
		const component = this;

		gapi.client.init({
            apiKey: apiData.apiKey,
            clientId: apiData.clientId,
            scope: apiData.scopes
        }).then(function() {
          // Listen for sign-in state changes.
          gapi.auth2.getAuthInstance().isSignedIn.listen(component.updateSigninStatus);

          // Handle the initial sign-in state.
          component.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      })
    };

	updateSigninStatus(isSignedIn) {
		if(isSignedIn) {
			this.setState({
				loggedIn: true,
			});
			this.props.clientReady();
		} else {
			this.setState({
				loggedIn: false,
			});
			this.props.clientNotReady();
		}
	}

	logIn() {
		gapi.auth2.getAuthInstance().signIn();
	}

	logOut() {
		gapi.auth2.getAuthInstance().signOut();
	}

	render() {
		const loggedIn = this.state.loggedIn;
		if (loggedIn === false)
			return <Button onClick={this.logIn} text="Log in on Google" />
		else if (loggedIn === true)
			return <Button onClick={this.logOut} text="Log out" />
		else
			return null
	}
}

LoginOnGoogle.propTypes = {
	clientReady: PropTypes.func.isRequired,
	clientNotReady: PropTypes.func.isRequired,
}

export default LoginOnGoogle;