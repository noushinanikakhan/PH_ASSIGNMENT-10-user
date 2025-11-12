import { Children, Component, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from './Layouts/RootLayout.jsx';
import Home from './Components/Home/Home.jsx';
import AvailableFoods from './Components/AvailableFoods/AvailableFoods.jsx';
import Register from './Components/Register/Register.jsx';
import Login from './Components/Login/Login.jsx';
import AuthProvider from './Context/AuthProvider.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
   children : [
    {
      index: true,
      Component: Home
    },
    {
      path: 'availalblefoods',
      Component: AvailableFoods
    },
    {
      path: 'register',
      Component: Register
    },
    {
      path: 'login',
      Component: Login
    }
   ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
  </AuthProvider>
  </StrictMode>,
)
