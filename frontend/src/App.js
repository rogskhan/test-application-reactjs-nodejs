import React from 'react'
import {
   BrowserRouter as Router, 
   useRoutes 
} from "react-router-dom"

import { Container } from '@mui/material'

import Header from './views/components/Header'
import Footer from './views/components/Footer'

import Home from './views/Home'
import CreateList from './views/list/CreateList'
import ViewLists from './views/list/ViewLists'
import CreateTask from './views/task/CreateTask'
import ViewTasks from './views/task/ViewTasks'
import EditTask from './views/task/EditTask'

import { ToastContainer } from 'react-toastify'

import './App.css'
import 'react-toastify/dist/ReactToastify.css'

const AppRouter = () => {
  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/create/list", element: <CreateList /> },
    { path: "/lists", element: <ViewLists /> },
    { path: "/create/task/:listId", element: <CreateTask /> },
    { path: "/tasks/:listId", element: <ViewTasks /> },
    { path: "/edit/task/:id", element: <EditTask /> }
  ])
  return routes
}

function App() {
  return (
    <>
      <Header />
      <Container>
        <ToastContainer />
        <Router>
          <AppRouter />
        </Router>
      </Container>
      <Footer />
    </>
  )
}

export default App
