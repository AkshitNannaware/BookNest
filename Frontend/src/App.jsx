import React from 'react';
import './App.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
import BookingForm from './Pages/Booking/Booking';
import RoomDetails from './Pages/Residencies/RoomDetails/RoomDetails';

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
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/residencies",
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
      {
        path: "/booking",
        element: <BookingForm/>
      },
      {
        path:"/room-details/:id",
        element: <RoomDetails/>
      },
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
  return (
  <RouterProvider router={router} />    
  );
};

export default App;