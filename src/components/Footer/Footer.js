import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import './Footer.css'

export default class Footer extends Component{
  constructor(props){
    super(props)

    this.state = {
      first: '',
      last: '',
      email: '',
      message: ''
    }
  }

  sendMessage(){
    let body = {
      subject: `${this.state.first} ${this.state.last} has inquired`,
      email: 'gymowers@gmail.com',
      message: `${this.state.message} Response Email: ${this.state.email}`
    }

    this.setState({
      first: '',
      last: '',
      email: '',
      message: ''
    })

    alert('Thank you for your inquiry. A customer service representative will be in contact within 24 business hours')
    axios.post('/api/send', body).then(res => res.sendStatus(200).catch(err => console.log(err)))
  }

  render(){
    let redirect = ''
    if(this.props.user && this.props.user.authid) {
      redirect = `${process.env.REACT_APP_PATH}/service`
    }else{
      redirect = `${process.env.REACT_APP_LOGIN_PATH}/login?path=service`
    }
    return(
      <div className='footer'>
        <div className='footer_left'>
          <div className='footer_links' id='shop'>
            <h3 className='footer_title'>Shop GY Mowers</h3>
            <Link to='/mowers'><button className='footer_button'>Mowers</button></Link>
            <Link to='/blades'><button className='footer_button'>Blades</button></Link>
          </div>
          <div className='footer_links'>
            <h3 className='footer_title'>Brands</h3>
            <Link to='/filteredmowers/Hustler'><button className='footer_button'>Hustler</button></Link>
            <Link to='/filteredmowers/Spartan'> <button className='footer_button'>Spartan</button></Link>
            <Link to='/filteredmowers/BigDog'> <button className='footer_button'>Big Dog</button></Link>
          </div>
          <div className='footer_links' id='service'>
          <h3 className='footer_title'>Service</h3>
            <a href={redirect} ><button className='footer_button'>Request Service</button></a>
          </div>
          <div className='footer_links' id='service'>
          <h3 className='footer_title'>Other Links</h3>
            <a href = {`${process.env.REACT_APP_LOGIN_PATH}login?path=`}><button className='footer_button'>Login</button></a>
            <Link to='/about'><button className='footer_button'>About Us</button></Link>
            <Link to='/cart'><button className='footer_button'>Cart</button></Link>
          </div>
        </div>
        <div className='footer_right'>
          <h3 className='footer_title'>Contact Us</h3>
          <div className='contact_form'>
            <input className='footer_name_input' placeholder='First Name' value= {this.state.first} onChange={e => this.setState({first: e.target.value})}></input>
            <input className='footer_name_input' placeholder='Last Name' value= {this.state.last} onChange={e => this.setState({last: e.target.value})}></input>
            <input className='footer_email_input' placeholder='Email' value= {this.state.email} onChange={e => this.setState({email: e.target.value})}></input>
            <textarea rows="5" cols="80" className='footer_message_input' placeholder='Message' value= {this.state.message} onChange={e => this.setState({message: e.target.value})}></textarea>
            <button className='footer_submit_button' onClick={() => this.sendMessage()}>Submit</button>
          </div>
        </div>
        <div className='footer_bottom'>
          <div className='disclaimer'>*Site for demonstration purposes only. Not affiliated with any brands represented in the demo</div>
        </div>
      </div>
    )
  }
}
