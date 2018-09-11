import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import '../Header/Header.css'
import logo from './GYmowerLogo.png'
import {connect} from 'react-redux'
import {getCart} from '../../ducks/productReducer'

class Header extends Component {

  componentDidMount(){
    this.props.getCart()
  }

  render(){
    return(
      <div className='header'>
        <Link to='/'><img alt='logo' src={logo} className='logo'/></Link>
        <div className='links'>
          <Link to='/'><button className='navlink' id='home'>Home</button></Link>
          <Link to='/sales'><button className='navlink'>Sales</button></Link>
          <a href='http://localhost:3001/loginservice' ><button className='navlink'>Service</button></a>
          <Link to='/about'><button className='navlink'>About</button></Link>
          <Link to='/cart'><button className='navlink'>Cart</button></Link>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => state

export default connect(mapStateToProps, {getCart})(Header);