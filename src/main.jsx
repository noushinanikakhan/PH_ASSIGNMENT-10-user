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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddFoods from './Components/AddFoods/AddFoods.jsx';
import ManageMyFoods from './Components/ManageMyFoods/ManageMyFoods.jsx';
import MyFoodRequests from './Components/MyFoodRequests/MyFoodRequests.jsx';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute.jsx';
import ErrorPage from './Components/ErrorPage/ErrorPage.jsx';



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
      path: 'availablefoods',
      Component: AvailableFoods
    },
    {
      path: 'register',
      Component: Register
    },
    {
      path: 'login',
      Component: Login
    },
    {
      path: 'addfoods',
      element: <PrivateRoute><AddFoods></AddFoods></PrivateRoute>
    },
    {
      path: 'managemyfoods',
      element: <PrivateRoute><ManageMyFoods></ManageMyFoods></PrivateRoute>
    },
    {
      path: 'myfoodrequests',
      element: <PrivateRoute><MyFoodRequests></MyFoodRequests></PrivateRoute>
    }
   ]
  },
  {
    path: "*",
    Component: ErrorPage
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
        <ToastContainer />
  </AuthProvider>
  </StrictMode>,
)
