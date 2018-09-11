import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {setService} from '../../ducks/productReducer'

class ConfirmService extends Component{

  render(){
    let {first_name, last_name, address, zip, state, email, phone} = this.props.user
    console.log(this.props)
    return(
      <div className='confirm_container'>
        <h1>Confirm Details</h1>
        <div className='left_side'>
          <h2>Customer Info</h2>
          <p>Name: {`${first_name} ${last_name}`}</p>
          <p>Address: {`${address} ${state} ${zip}`}</p>
          <p>Email: {`${email}`}</p>
          <p>Phone: {`${phone}`}</p>
        </div>
        <div className='right_side'>
          <h2>Service Request Details:</h2>
          <p>Date: {`${this.props.serviceDate.format('LL')}`}</p>
          <p>Pickup Needed: {this.props.servicePickup ? 'Yes' : ' No'}</p>
          <p>Maintenance or Service issue: {`${this.props.serviceIssue}`}</p>
        </div>
        <div className='bottom_buttons'>
        <Link to='/service'><button>Edit Information</button></Link>
        <Link to='/'><button onClick={() => this.props.setService(this.props.serviceDate.format('LL'), this.props.servicePickup, this.props.serviceIssue, this.props.user.user_id)}>Confirm</button></Link>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps,{setService})(ConfirmService)