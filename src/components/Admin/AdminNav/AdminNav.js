import React, {Component} from 'react';
import SideNav from 'react-simple-sidenav';
import {Link} from 'react-router-dom'
import './AdminNav.css'
import { black } from 'material-ui/styles/colors';
import {connect} from 'react-redux'
import {logout} from '../../../ducks/productReducer'

class AdminNav extends Component{
  constructor(){
    super()

    this.state={
      showNav: false,
      navClass: ''
    }
    this.toggleMenuButton = this.toggleMenuButton.bind(this)
  } 

  toggleMenuButton(){
    this.state.navClass === '' ? this.setState({navClass: 'open'}) : this.setState({navClass: ''})
    this.setState({showNav: !this.state.showNav})
  }
 

  render(){
    return(
      <div className='menu'>  
        <div id="nav-icon2" className={this.state.navClass} onClick={()=>this.toggleMenuButton()}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>     
        <SideNav 
        showNav = {this.state.showNav}
        onHideNav = {() => this.setState({showNav: false})}
        title="Dashboard" 
        items={[
          <Link style={{ textDecoration: 'none' }} to='/admin'><div className='dash_button' >Admin Home</div></Link>,
          <Link style={{ textDecoration: 'none' }} to='/reports'><div className='dash_button'>Reports</div></Link>,
          <Link style={{ textDecoration: 'none' }} to='/orders'><div className='dash_button'>Sales Orders</div></Link>,
          <Link style={{ textDecoration: 'none' }} to='/requests'><div className='dash_button'>Service Requests</div></Link>,
          <Link style={{ textDecoration: 'none' }} to='/calendar'><div className='dash_button'>Service Calendar</div></Link>,
          <Link style={{ textDecoration: 'none' }} to='/sales'><div className='dash_button'>Product Catalog</div></Link>,
          <div className='dash_button' onClick={()=>{
            var myWindow = window.open('https://gy162134.auth0.com/v2/logout')
            myWindow.close()
            this.props.logout()
            window.location.href = `${process.env.REACT_APP_PATH}`
            window.location.reload(false);
          }}>Logout</div>]}
        titleStyle     =  {{backgroundColor: black}}
        itemStyle      =  {{backgroundColor: '#fff'}}
        itemHoverStyle =  {{backgroundColor:  '#f1c116'}}
        />
      </div>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {logout})(AdminNav);
