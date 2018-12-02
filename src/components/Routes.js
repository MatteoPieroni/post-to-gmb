import React from "react";
import { Route, Switch } from "react-router-dom";

import AppliedRoute from "./AppliedRoute";
import Home from "./Home";
import Login from './Login';
import Signup from '../containers/Signup';
import Dashboard from '../containers/Dashboard';
import Error404 from './Error404';

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <AppliedRoute path="/dashboard" exact component={Dashboard} props={childProps} />
    <AppliedRoute path="/login" exact component={Login} props={childProps} />
    <AppliedRoute path="/signup" exact component={Signup} props={childProps} />

    { /* catch all unmatched routes */ }
    <Route component={Error404} />
  </Switch>;