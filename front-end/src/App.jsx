import { useState } from 'react'
import './App.css'
import Login from './components/login'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Signup from './components/signup'
import Home from './components/home'
import Admin from './components/admin/admin'
import StoreHome from './components/store/storeHome'
import Unauthorized from './components/unauthorized'
import { useAuthContext } from './context/authContext'
function App() {
  const [count, setCount] = useState(0)
  const { authUser, roleUser } = useAuthContext();

  return (
    <>
      <Router>
        <Routes>

          <Route
            path="/"
            element={
              authUser
                ? roleUser === "user"
                  ? <Home />
                  : roleUser === "admin"
                    ? <Navigate to="/admin" />
                    : roleUser === "store"
                      ? <Navigate to="/storehome" />
                      : <Navigate to="/login" />
                : <Navigate to="/login" />
            }
          />

          <Route
            path="/signup"
            element={
              authUser
                ? roleUser === "user"
                  ? <Navigate to="/" />
                  : roleUser === "admin"
                    ? <Navigate to="/admin" />
                    : roleUser === "store"
                      ? <Navigate to="/storehome" />
                      : <Navigate to="/login" />
                : <Signup />
            }
          />

          <Route
            path="/login"
            element={
              authUser
                ? roleUser === "user"
                  ? <Navigate to="/" />
                  : roleUser === "admin"
                    ? <Navigate to="/admin" />
                    : roleUser === "store"
                      ? <Navigate to="/storehome" />
                      : <Navigate to="/login" />
                : <Login />
            }
          />

          <Route
            path="/admin"
            element={
              authUser
                ? roleUser === "admin"
                  ? <Admin />
                  : <Unauthorized />
                : <Navigate to="/login" />
            }
          />

          <Route
            path="/storehome"
            element={
              authUser
                ? roleUser === "store"
                  ? <StoreHome />
                  : <Unauthorized />
                : <Navigate to="/login" />
            }
          />

        </Routes>
      </Router>

    </>
  )
}

export default App
