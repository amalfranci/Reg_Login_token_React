import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Home() {
    const navigate=useNavigate()

    const handleLogout = () => {
        navigate('/login')
      
    }
  return (
      <div>Home
          <button ><Link to="/dashboard">Dashboard</Link></button>
          <br/><br/>
          <button onClick={handleLogout}>Logout</button>
          </div>
  )
}

export default Home