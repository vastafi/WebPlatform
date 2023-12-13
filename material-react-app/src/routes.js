/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";


import UserProfile from "layouts/user-profile";
import Maps from "layouts/maps";


import Icon from "@mui/material/Icon";
import Users from "layouts/users";
import Drones from "./layouts/drones";
import ExampleProject1 from "layouts/exampleProject1"
import Devices from "layouts/devices";
import Missions from "layouts/missions";
import Sensors from "layouts/sensors";
import CreateMap from "layouts/maps/CreateMap";
import Iluminare from "layouts/iluminare";

const routes = [
  // {
  //   type: "examples",
  //   name: "User Profile",
  //   key: "user-profile",
  //   icon: <Icon fontSize="small">person</Icon>,
  //   route: "/user-profile",
  //   component: <UserProfile />,
  // },
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Maps",
    key: "Maps",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/Maps/*",
    component: <Maps />,
  },
  {
    type: "collapse",
    name: "Users",
    key: "Users",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/Users",
    component: <Users />,
  },
  {
    type: "collapse",
    name: "Devices",
    key: "Devices",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/Devices",
    component: <Devices />,
  },
  {
    type: "collapse",
    name: "Missions",
    key: "Missions",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/Missions",
    component: <Missions />,
  },
  {
    type: "collapse",
    name: "Sensors",
    key: "Sensors",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/Sensors",
    component: <Sensors />,
  },
  {
    type: "divider",
  },

  {
    type: "title",
    title: "Projects",
  },
  {
    type: "collapse",
    name: "ExampleProject1",
    key: "ExampleProject1",
    icon: <Icon fontSize="small">settings</Icon>,
    route: "/ExampleProject1",
    component: <ExampleProject1 />,
  },
  {
    type: "collapse",
    name: "Drones",
    key: "Drones",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/Drones",
    component: <Drones />,
  },
  {
    type: "collapse",
    name: "Iluminare",
    key: "Iluminare",
    icon: <Icon fontSize="small">settings</Icon>,
    route: "/layouts/iluminare",
    component: <Iluminare />,
  },
];

export default routes;
