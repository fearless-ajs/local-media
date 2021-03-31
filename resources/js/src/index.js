
import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import Dashboard from "./views/Dashboard.js";
import Users from "./views/Users.js";
import Media from "./views/Media.js";
import Analytics from "./views/Analytics.js";
import MediaInfo from "./views/MediaInfo.js";

import AdminLayout from "./layouts/Admin.js";
import AuthLayout from "./layouts/Auth.js";


ReactDOM.render(
  <BrowserRouter basename="/media-distributor/public">
    <Switch>
      <Route path="/login" render={(props) => <AuthLayout {...props} /> } />

      <Route path="/media/all" render={(props) => <AdminLayout Component={Media} {...props} /> } />
      <Route path="/media/:id" render={(props) => <AdminLayout Component={MediaInfo} {...props} /> } />
      <Route path="/dashboard" render={(props) => <AdminLayout Component={Dashboard} {...props} /> } />
      <Route path="/user" render={(props) => <AdminLayout Component={Users} {...props} /> } />
      <Route path="/analytics" render={(props) => <AdminLayout Component={Analytics} {...props} /> } />
      <Route path="/" render={(props) => <AdminLayout Component={Dashboard} {...props} /> } />

    </Switch>
  </BrowserRouter>,
  document.getElementById("app")
);
