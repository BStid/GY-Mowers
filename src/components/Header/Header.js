import React from 'react'
import {Link} from 'react-router-dom'
import '../Header/Header.css'
import logo from './GYmowerLogo.png'

const Header = () => {
  return(
    <div className='header'>
      <Link to='/'><img alt='logo' src={logo} className='logo'/></Link>
      <div className='links'>
        <Link to='/'><button className='navlink' id='home'>Home</button></Link>
        <Link to='/sales'><button className='navlink'>Sales</button></Link>
        <Link to='/service'><button className='navlink'>Service</button></Link>
        <Link to='/about'><button className='navlink'>About</button></Link>
        <Link to='/cart'><button className='navlink'>Cart</button></Link>
      </div>
    </div>
  )
}

export default Header;