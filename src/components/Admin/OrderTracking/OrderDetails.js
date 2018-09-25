import React, {Component} from 'react'
import { connect } from 'react-redux';
import AdminNav from '../AdminNav/AdminNav'
import axios from 'axios';
import './OrderDetails.css'


class OrderDetails extends Component{
  constructor(){
    super()
    this.state = {
      tracking: '',
      order: '',
      user: {}
    }

    this.confirmOrder = this.confirmOrder.bind(this)
  }

  async componentDidMount(){
  await axios.post('/api/orderdetails', {id: this.props.match.params.id})
    .then(response => this.setState({order: response}))
    .catch(err => console.log(err))
    this.props.orders.map(e => {
      if(e[0].order_number === parseInt(this.props.match.params.id, 10)){
        this.setState({user: e[0]})
      }
      return null;
    })
  }

  confirmOrder(track){
    axios.put('/api/orderdetails', {tracking: track, id: this.props.match.params.id})
    .then(response => alert('Order Complete!!')).catch(err => console.log(err))
    let body = {
      subject: "Your order has shipped!!",
      email: this.state.user.email,
      message: 'Shipped'
    }
    this.state.user.message ? axios.post('/api/sendsms', 
    {recipient: `+1${this.state.user.phone}`, message: `Hello, ${this.state.user.first_name}. Your GY Mowers order. Your tracking number is ${track}`}): null
  
    axios.post('/api/send', body).then(res => res.sendStatus(200).catch(err => console.log(err)))
    window.location.href = 'http://localhost:3000/#/orders'
  }

  render(){
    let customerDeets = ""
    let orderItems = ''
    this.props.orders.map(e => {
      if(e[0].order_number === parseInt(this.props.match.params.id, 10)){
         customerDeets = e.map((element, index) => 
         {if(index === 0){
           return(
            <div>
              <p className='order_details_element'>{`Customer Name: ${element.first_name} ${element.last_name}`}</p>
              <p className='order_details_element'>{`Address: ${element.address}, ${element.state} ${element.zip}`}</p>
              <p className='order_details_element'>{`Email: ${element.email}`}</p>
              <p className='order_details_element'>{`Phone Number: : ${element.phone}`}</p>
            </div>
        )}
        return null
      })
      }return null
    })
    this.state.order.data ? orderItems = this.state.order.data.map((e, i) => {
      return(
        <div>
          <p className='order_details_element'>{`Line ${i+1}:   ${e.title}   ${e.price}`}</p>
        </div>
      )
    }):null
    return(
      <div className='order_details_content'>
        <AdminNav/>
        <div className='little_white_line'>
          <div className='order_details_info'>
            {customerDeets}
            {orderItems}
          </div>
          <div className='order_details_submit'>
            <input placeholder='Enter Tracking #' onChange={e => this.setState({tracking: e.target.value})}></input>
            <button onClick={() => this.confirmOrder(this.state.tracking)}>Confirm Order</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(OrderDetails)

