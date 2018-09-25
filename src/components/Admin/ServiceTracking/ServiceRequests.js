import React, {Component} from 'react'
import { connect } from 'react-redux';
import AdminNav from '../AdminNav/AdminNav'
import Dropdown from 'react-dropdown'
import axios from 'axios'
import Request from './Request'
import {setRequests} from '../../../ducks/productReducer'
import '../OrderTracking/Order.css'


class ServiceRequests extends Component{
  constructor(){
    super()
    this.state = {
      orders: ''
    }
    this.generateData = this.generateData.bind(this)
  }

  componentDidMount(){

  }

  async generateData(order){
    let orders = []
    order === 'Completed Requests' ?
   await axios.post('/api/requests', {status: true})
    .then(response => orders = response.data).catch(err => (console.log(err))):
   await axios.post('/api/requests', {status: false})
    .then(response => orders = response.data).catch(err => (console.log(err)))
    this.setState({orders: orders})
    this.props.setRequests(this.state.orders)
  }

  render(){
    const options = ['Completed Requests', 'Pending Requests']
    return(
      <div className='orders_container'>
        <AdminNav/>
        <div className='order_selectors'>
          <Dropdown options={options} onChange={(e)=>this.setState({orders: e.value})} value={this.state.orders} />
          <button className='report_input_button' onClick={() => this.generateData(this.state.orders)}>Run Report</button>
        </div>
        <div className='order_lines'>
          <Request/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {setRequests})(ServiceRequests)