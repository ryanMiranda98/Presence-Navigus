import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Signup from "./components/forms/Signup";
import Signin from "./components/forms/Signin";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/authActions";
import store from "./store";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import Home from "./components/home/Home";
import "./App.css";
import NotAuth from "./components/notAuth/NotAuth";

function App() {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  useEffect(() => {
    if (localStorage.token) {
      store.dispatch(loadUser());
    }
  }, []);
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="main-layout">
          <Switch>
            <Route exact path="/" component={Signup} />
            <Route exact path="/signin" component={Signin} />
            <PrivateRoute exact path="/home" component={Home} />
            <Route exact path="/auth-denied" component={NotAuth} />
            <Route render={() => <Redirect to="/" />} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
