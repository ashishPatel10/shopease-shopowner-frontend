import React, { Suspense, lazy } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import PrivateRoute from "./privateRoutes";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register.jsx";
import Dashboard from "../components/Dashboard/Dashboard"
import Order from "../components/Order/Order";


const Routes = (props) => (
  <Router>
    <Switch>
      {/* <Route path="/resetpassword/:token" exact component={ResetPassword} /> */}
      
      <Route path="/register" exact component={Register} />
      <Route path="/login" exact component={Login} />
      <Route path="/" exact component={Login} />
      <PrivateRoute
        path="/"
        component={Dashboard}
      />
 <PrivateRoute path="/order" exact component={Order} />

    </Switch>
  </Router>
);

export default Routes;
