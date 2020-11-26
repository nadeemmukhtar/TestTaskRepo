import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";

import Login from "./pages/login";
import Signup from "./pages/signup";
import Forgot from "./pages/forgot";
import Reset from "./pages/reset-password";

export default function Routes() {
    
    return (
      <Router>
          <Switch>
            <Route exact path="/">
                <Login/>
            </Route>
            <Route path="/signup">
                <Signup/>
            </Route>
            <Route path="/forgot">
                <Forgot/>
            </Route>
            <Route path="/reset-password">
                <Reset/>
            </Route>
          </Switch>
      </Router>
    );
  }