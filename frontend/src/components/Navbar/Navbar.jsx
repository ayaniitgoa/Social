import React from 'react';
import { Link } from 'react-router-dom';
import Logout from '../Auth/Logout/Logout';
import './Navbar.css';

function Navbar(props) {
  return (
    <div className='nav-custom'>
      <h1>Navbar</h1>
      <div className='d-flex'>
        <Link to='/profile'>Profile</Link>
        <Link to='/home'>Home</Link>
        <Logout />
      </div>
    </div>
  );
}

export default Navbar;
