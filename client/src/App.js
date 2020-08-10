import React from "react";
import "./App.css";
import Auth from "./componnets/auth";
import Home from "./componnets/home";
import Dashboard from "./componnets/dashboard";
import PrivateRoute from "./utils/privateroutes";
import PublicRoute from "./utils/publicroutes";
import { BrowserRouter, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Switch>
          <PublicRoute exact path='/' component={Auth} />
          <PrivateRoute path='/home' component={Home} />
          <PrivateRoute path='/dashboard' component={Dashboard} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
