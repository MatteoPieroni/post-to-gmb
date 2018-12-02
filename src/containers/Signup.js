import React, { Component } from "react";
import { Auth } from "aws-amplify";

import Input from '../components/Input';
import Button from '../components/Button';

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: "",
      password: "",
      confirmPassword: "",
      confirmationCode: "",
      newUser: null
    };
  }

  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }

  validateConfirmationForm() {
    return this.state.confirmationCode.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    let component = this;
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      const newUser = await Auth.signUp({
        username: this.state.email,
        password: this.state.password
      });
      this.setState({
        newUser
      });
    } catch (e) {
      console.log(e);
      // TD -> SEE IF THEY WANT THE CONFIRMATION EMAIL OR NOT - RESENDSIGNUP (https://aws-amplify.github.io/amplify-js/api/classes/authclass.html)
      if (e.code === 'UsernameExistsException') {
        alert('This user already exists, try to sign in');
      }
      // TD -> CHECK FOR PASSWORD SETTINGS
      if (e.code === 'InvalidParameterException') {
        alert('Your password is too weak')
      }
    }

    this.setState({ isLoading: false });
  }

  handleConfirmationSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      await Auth.confirmSignUp(this.state.email, this.state.confirmationCode);
      await Auth.signIn(this.state.email, this.state.password);

      this.props.userHasAuthenticated(true);
      this.props.history.push("/");
    } catch (e) {
      alert(e.message);
      this.setState({ isLoading: false });
    }
  }

  renderConfirmationForm() {
    return (
      <form onSubmit={this.handleConfirmationSubmit}>
          <Input
            autoFocus
            inputId="confirmationCode"
            inputType="tel"
            labelText="Confirmation Code"
            value={this.state.confirmationCode}
            onChange={this.handleChange}
          />
          <p>Please check your email for the code.</p>
        <Button
          disabled={!this.validateConfirmationForm() || this.state.isLoading}
          buttonType="submit"
          text={this.state.isLoading ? "Verifying..." : "Verify"}
        />
      </form>
    );
  }

  renderForm() {
    return (
      <form onSubmit={this.handleSubmit}>
          <Input
            autoFocus
            inputId="email"
            inputType="email"
            labelText="Email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <Input
            value={this.state.password}
            onChange={this.handleChange}
            labelText="Password"
            inputId="password"
            inputType="password"
          />
          <Input
            value={this.state.confirmPassword}
            onChange={this.handleChange}
            labelText="Confirm Password"
            inputId="confirmPassword"
            inputType="password"
          />
        <Button
          disabled={!this.validateForm()}
          buttonType="submit"
          isLoading={this.state.isLoading}
          text={this.state.isLoading ? "Signing up…" : "Signup"}
        />
      </form>
    );
  }

  render() {
    return (
      <div className="Signup">
        {this.state.newUser === null
          ? this.renderForm()
          : this.renderConfirmationForm()}
      </div>
    );
  }
}