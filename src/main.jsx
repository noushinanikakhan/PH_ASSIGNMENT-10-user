import { Children, Component, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from './Layouts/RootLayout.jsx';
import Home from './Components/Home/Home.jsx';
import AvailableFoods from './Components/AvailableFoods/AvailableFoods.jsx';

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
    }
   ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
