import React from 'react'
import './Navbar.css'
import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div className='navbar'>
      <Link to="/" style={{textDecoration:"none"}}>
            <h1>Movies App</h1>
          </Link>
        <div className='navbar-r'>
            <Link to="/favourites" style={{textDecoration:"none"}}>
            <h2>Favourites</h2>
            </Link>
            <Link to="/search" style={{textDecoration:"none"}}>
            <h2>Search</h2>
            </Link>
        </div>
    </div>
  )
}

export default Navbar