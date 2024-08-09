import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Homepage from './components/homepage/Homepage.jsx'
import LogInPage from './components/logInPage/LogInPage.jsx'
import SignUpPage from './components/signUpPage/SignUpPage.jsx'
import './styles/index.css'
import {createBrowserRouter ,RouterProvider ,Route ,Link } from "react-router-dom";

const router = createBrowserRouter([
  {path: "/",
    element: <Homepage/>
  },
  {path: "/signup", 
    element: <SignUpPage/>
  },
  {path: "login",
    element: <LogInPage/>
  }
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
