import React, {Component} from 'react'
import {connect} from 'react-redux'
import ToggleButton from 'react-toggle-button'
import {setUserInfo, getUser} from '../../ducks/productReducer'
import {Link} from 'react-router-dom'

class SalesInfo extends Component{
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
      message: false,
    }
  }
  componentDidMount(){
    this.props.getUser()
  }

  render(){
    let{first, last, address, zip, state, email, phone, message} = this.state;
    console.log(this.state, this.props.user.authid)
    return(
      <div>
        <input onChange={e => this.setState({first: e.target.value})} placeholder={this.state.first ? this.state.first : 'First Name'}></input>
        <input onChange={e => this.setState({last: e.target.value})} placeholder={this.state.last ? this.state.last : 'Last Name'}></input>
        <input onChange={e => this.setState({address: e.target.value})} placeholder={this.state.address ? this.state.address : 'Address'}></input>
        <input onChange={e => this.setState({zip: e.target.value})} placeholder={this.state.zip ? this.state.zip : 'Zip Code'}></input>
        <input onChange={e => this.setState({state: e.target.value})} placeholder={this.state.state ? this.state.state : 'State (TX, CA, ETC.'}></input>
        <input onChange={e => this.setState({email: e.target.value})} placeholder={this.state.email ? this.state.email : 'Email'}></input>
        <input onChange={e => this.setState({phone: e.target.value})} placeholder={this.state.phone ? this.state.phone : 'Phone number'}></input>
        <ToggleButton inactiveLabel={'No'} activeLabel={'Yes'} value={ this.state.message || false } onToggle={(value) => {this.setState({message: !value})}}/>
        <Link to='/cart'><button onClick={() => {this.props.setUserInfo(this.props.user.authid ,first, last, address, zip, state, email, phone, message)}}>Submit</button></Link>
      </div>
    )
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {setUserInfo, getUser})(SalesInfo)