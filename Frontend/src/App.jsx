import React from 'react';
import './App.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './Pages/Home';
import Applayout from './Components/layout/Applayout';
import Residencies from './Pages/Residencies/Residencies';
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Contact from './Pages/Contact/Contact';
import OwnerDashboard from './Dashboard/OwnerDashboard'; // Import the new component
import AdminDashboard from './Dashboard/AdminDashboard'; // Import the new component
import DashboardLayout from './Dashboard/Dashboard';
import StudentDashboard from './Dashboard/StudentDashboard';

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
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      // {
      //   path: "/rented-rooms",
      //   element: <RentedRooms />, // Add this route
      // },
      // {
      //   path: "/owner-dashboard",
      //   element: <OwnerDashboard />, // Add this route
      // },
      // {
      //   path: "/admin-dashboard",
      //   element: <AdminDashboard />, // Add this route
      // },
    ],
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />, // layout with sidebar
    children: [
      { path: 'admin', element: <AdminDashboard /> },
      { path: 'owner', element: <OwnerDashboard /> },
      { path: 'rented', element: <StudentDashboard /> }, 
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;