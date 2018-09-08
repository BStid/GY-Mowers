import React, {Component} from 'react'
import {connect} from 'react-redux'

class AccountInfo extends Component{
  constructor(){
    super()

    this.state = {
      first: "",
      last: '',
      address: '',
      zip: '',
      state: '',
      email: "",
      phone: '',
      message: false
    }
  }

  render(){
    return(
      <div>Account Info</div>
    )
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(AccountInfo)