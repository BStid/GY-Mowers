import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {setService} from '../../ducks/productReducer'
import axios from 'axios'
import SweetAlert from 'sweetalert2-react';
import './ConfirmService.css'

class ConfirmService extends Component{
  constructor(){
    super()

    this.state = {
      show: false
    }

    this.sendServiceEmail=this.sendServiceEmail.bind(this)
  }

  sendServiceEmail(email){
    let body = {
      subject: "Welcome to the GY family",
      email: email,
      message: 'Service'
    }
    axios.post('/api/send', body).then(res => res.sendStatus(200).catch(err => console.log(err)))
  }

  render(){
    let {first_name, last_name, address, zip, state, email, phone, message} = this.props.user
    console.log(this.props)
    return(
      <div className='confirm_container'>
        <h1 className='confirm_header'>Confirm Details</h1>
        <div className='left_side'>
          <h2>Customer Info</h2>
          <p>Name: {`${first_name} ${last_name}`}</p>
          <p>Address: {`${address} ${state} ${zip}`}</p>
          <p>Email: {`${email}`}</p>
          <p>Phone: {`${phone}`}</p>
          <p>SMS updates: {message ? 'Yes' : 'No'}</p>
        </div>
        <div className='right_side'>
          <h2>Service Request Details:</h2>
          <p>Date: {`${this.props.serviceDate.format('LL')}`}</p>
          <p>Pickup Needed: {this.props.servicePickup ? 'Yes' : ' No'}</p>
          <p>Maintenance or Service issue: {`${this.props.serviceIssue}`}</p>
        </div>
        <div className='bottom_buttons'>
        <Link to='/service'><button className='confirm_service_buttons'>Edit Information</button></Link>
        <button className='confirm_service_buttons' onClick={() => {
          this.props.setService(this.props.serviceDate.format('LL'), this.props.servicePickup, this.props.serviceIssue, this.props.user.user_id)
          this.sendServiceEmail(email)
          this.setState({show: true})
          message ? axios.post('/api/sendsms', 
          {recipient: `+1${phone}`, message: `Hello, ${first_name}!! Thank you for choosing GY Mowers. A representative will be contacting you within 24 hours to confirm service details.`}): null}
          }>Confirm</button>
          <SweetAlert
                show={this.state.show}
                confirmButtonColor= '#f1c116'
                title="Service request recieved!!"
                text="A service advisor will be in contact within 24 business hours"
                onConfirm={() => {
                  window.location.href = process.env.REACT_APP_PATH
                  this.setState({ show: false })}}
            />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps,{setService})(ConfirmService)