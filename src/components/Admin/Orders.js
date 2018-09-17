import React, {Component} from 'react'
import {connect} from 'react-redux'
import AdminNav from './AdminNav'
import Dropdown from 'react-dropdown'
import axios from 'axios'
import Order from './Order'
import {setOrders} from '../../ducks/productReducer'
import './Orders.css'


class Orders extends Component{
  constructor(){
    super()
    this.state = {
      orders: ''
    }
    this.generateData = this.generateData.bind(this)
    this.formatOrders = this.formatOrders.bind(this)
  }

  componentDidMount(){

  }

  async generateData(order){
    let orders = []
    order === 'Completed Orders' ?
   await axios.post('/api/orders', {status: true})
    .then(response => orders = response.data).catch(err => (console.log(err))):
   await axios.post('/api/orders', {status: false})
    .then(response => orders = response.data).catch(err => (console.log(err)))
    let grouped = this.formatOrders(orders)
    this.setState({orders: grouped})
    this.props.setOrders(this.state.orders)
  }

  formatOrders(orders){
    let finalData = []
    let order = []
    let count = 0
    orders.map((e,i)=> {
      if(order.length === 0){
        order.push(e)
      }else if(e.order_number === order[count].order_number){
        order.push(e)
        count++
      }else{
        finalData.push(order)
        order = []
        count = 0
        order.push(e) 
      }
      if((i+1) === orders.length){
        finalData.push(order)
      }
    })
    return finalData;
  }

  render(){
    const options = ['Completed Orders', 'Pending Orders']
    const defaultOption = options[0]
    return(
      <div className='orders_container'>
        <AdminNav/>
        <div className='order_selectors'>
          <Dropdown options={options} onChange={(e)=>this.setState({orders: e.value})} value={this.state.orders} />
          <button className='report_input_button' onClick={() => this.generateData(this.state.orders)}>Run Report</button>
        </div>
        <div className='order_lines'>
          <Order/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {setOrders})(Orders)

