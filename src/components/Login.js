import React, { Component } from "react";
import { Auth } from "aws-amplify";

import Input from './Input';
import Button from './Button';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({isLoading: true});
    try {
      await Auth.signIn(this.state.email, this.state.password);
      this.props.userHasAuthenticated(true);

      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }

  render() {
    return (
      <div className="login">
        <form id="loginForm" onSubmit={this.handleSubmit}>
          <Input autoFocus={true} inputType="text" labelText="Email" inputId="email" name="login-form-email" onChange={this.handleChange} />
          <Input inputType="password" labelText="Password" inputId="password" name="login-form-password" onChange={this.handleChange} />
          <Button buttonType="submit" disabled={!this.validateForm() || this.state.isLoading} text={this.state.isLoading ? "Logging you in..." : "Log in"} />
        </form>
      </div>
    );
  }
}