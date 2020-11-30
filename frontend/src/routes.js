import React from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Forgot from "./pages/forgot";
import Reset from "./pages/reset-password";
import { Dashboard } from "@material-ui/icons";
import { loaded, loading } from "./redux/actions/userActions";
export default function Routes() {
  const dispatch = useDispatch();
  axios.interceptors.request.use((request) => {
    dispatch(loading());
    return request;
  });
  axios.interceptors.response.use(
    (response) => {
      dispatch(loaded());
      return response;
    },
    (error) => {
      dispatch(loaded());

      return Promise.reject(error.message);
    }
  );

  function PrivateRoute({ children, ...rest }) {
    const AUTH = useSelector((state) => state.AUTH);

    return (
      <Route
        {...rest}
        render={(props) =>
          AUTH.isLoggedIn ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location },
              }}
            />
          )
        }
      />
    );
  }
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/forgot">
          <Forgot />
        </Route>
        <Route path="/reset-password">
          <Reset />
        </Route>
        <PrivateRoute path="/dasboard">
          <Dashboard />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}
