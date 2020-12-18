import React from 'react'
import { useRoutes } from './routes'
import { BrowserRouter as Router } from 'react-router-dom'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'
import { NavBar } from './components/NavBar'
import 'materialize-css'
import { Loader } from './components/Loader'

function App() {
  const { token, login, logOut, userID, ready } = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  if (!ready) {
    return <Loader />
  }

  return (
    <AuthContext.Provider
      value={{ token, login, logOut, userID, isAuthenticated }}>
      <Router>
        {isAuthenticated && <NavBar />}
        <div className='container'>{routes}</div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
