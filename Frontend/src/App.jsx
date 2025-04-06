import React from 'react';
import './App.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './Pages/Home';
import Applayout from './Components/layout/Applayout';
import Residencies from './Pages/Residencies/Residencies';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Applayout/>,
    // errorElement:<Errorpage/>,
    children: [
      {
        path:"/",
        element: <Home/>,
      },
      {
        path:"/Residencies",
        element:<Residencies/>
      }
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
