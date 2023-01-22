import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import {useRoutes} from "./routes"
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'
import { Navbar } from './components/Navbar'
import { Loader } from './components/Loader'
import 'materialize-css'
// import 'materialize.js'


function App() {
  const {login, logout, token, userId, ready} = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  if (!ready) {
    return <Loader/>
  }

  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>
      <Router>
        { isAuthenticated && <Navbar></Navbar> }
        <div>
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
    
  );
}

export default App;

//1:54:00
