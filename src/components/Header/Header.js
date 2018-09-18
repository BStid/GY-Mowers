import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import '../Header/Header.css'
import logo from './GYmowerLogo.png'
import {connect} from 'react-redux'
import {getCart, getUser, logout} from '../../ducks/productReducer'

class Header extends Component {
  constructor(){
    super()

    this.state = {
      adminRedirect: ''
    }
    this.redirect = this.redirect.bind(this)
  }

  componentDidMount(){
    this.props.getCart()
    this.props.getUser()
  }

  redirect(){
    if(this.props.user && this.props.user.is_admin){
      window.location.href = 'http://localhost:3000/#/admin'
    }else if(this.props.user && this.props.user.authid){
      this.props.logout().then(() => window.location.href = 'http://localhost:3000/#/');
    }else{
      window.location.href = 'http://localhost:3001/login?path='
    }
  }

  render(){
    console.log('RENDER', this.props)
    let redirect = ''
    if(this.props.user && this.props.user.authid) {
      redirect = 'http://localhost:3000/#/service'
    }else{
      redirect = 'http://localhost:3001/login?path=service'
    }
    return(
      <div className='header'>
        <Link to='/'><img alt='logo' src={logo} className='logo'/></Link>
        <div className='links'>
          <Link to='/'><button className='navlink' id='home'>Home</button></Link>
          <Link to='/sales'><button className='navlink'>Sales</button></Link>
          <a href={redirect} ><button className='navlink'>Service</button></a>
          <Link to='/about'><button className='navlink'>About</button></Link>
          <Link to='/cart'><button className='navlink'>Cart{this.props.cart.length ? ` (${this.props.cart.length})`: null}</button></Link>
          <button onClick={() => this.redirect()} className='navlink'>{this.props.user && this.props.user.is_admin ? 'Admin Dashboard' :
           this.props.user && this.props.user.authid ? 'Logout' : 'Login'}</button>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => state

export default connect(mapStateToProps, {getCart, getUser, logout})(Header);