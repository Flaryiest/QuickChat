import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Homepage from './components/homepage/Homepage.jsx'
import './styles/index.css'
import {createBrowserRouter ,RouterProvider ,Route ,Link } from "react-router-dom";

const router = createBrowserRouter([
  {path: "/",
    element: <Homepage/>
  }
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
