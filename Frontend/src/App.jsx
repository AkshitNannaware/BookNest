import React from 'react';
import './App.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './Pages/Home';
import Applayout from './Components/layout/Applayout';
import Residencies from './Pages/Residencies/Residencies';
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";

import DashboardLayout from './Dashbaord/Layout/DashboardLayout';
import Overview from './Dashbaord/Pages/Overview';
import RoomDetails from './Dashbaord/Pages/RoomDetails';
import Profile from './Dashbaord/Pages/Profile';
import Contact from './Pages/Contact/Contact';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Applayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "residencies",
        element: <Residencies />,
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true, // default route for /dashboard
        element: <Overview />,
      },
      {
        path: "room",
        element: <RoomDetails />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
