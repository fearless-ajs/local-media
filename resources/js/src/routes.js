/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "./views/Dashboard.js";
import Users from "./views/Users.js";
import Guests from "./views/Guests.js";
import Media from "./views/Media.js";
import Analytics from "./views/Analytics.js";
import MediaInfo from "./views/MediaInfo.js";


const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/media/all",
    name: "Media",
    icon: "nc-icon nc-cloud-upload-94",
    component: Media,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "Users",
    icon: "nc-icon nc-circle-09",
    component: Users,
    layout: "/admin",
  },
  {
    path: "/analytics",
    name: "Analytics",
    icon: "nc-icon nc-chart-pie-36",
    component: Analytics,
    layout: "/admin",
  },
  {
    path: "/guests",
    name: "Guests",
    icon: "nc-icon nc-circle-09",
    component: Guests,
    layout: "/guests",
  },

  // 
  {
    icon: null,
    path: "/media/:id",
    name: "Media Info",
    component: MediaInfo,
    layout: "/admin",
  },

];

export default dashboardRoutes;
