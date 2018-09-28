import React, {Component} from 'react'
import { connect } from 'react-redux';
import AdminNav from '../AdminNav/AdminNav'
import SweetAlert from 'sweetalert2-react';
import axios from 'axios';


class RequestDetails extends Component{
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
  await axios.post('/api/requestdetails', {id: this.props.match.params.id})
    .then(response => this.setState({order: response}))
    .catch(err => console.log(err))
  }

  confirmOrder(){
    axios.put('/api/requestdetails', {id: this.props.match.params.id})
    .then(response => this.setState({show: true})).catch(err => console.log(err))
    let body = {
      subject: "Your service request has been completed!!",
      email: this.state.order.data[0].email,
      message: 'Good as New!!'
    }
    this.state.order.data[0].message ? axios.post('/api/sendsms', 
    {recipient: `+1${this.state.order.data[0].phone}`, message: `Hello, ${this.state.order.data[0].first_name}. Your mowers runs like new again. We will contact you within 24 hours to schedule a delivery time with you.`}): null
  
    axios.post('/api/send', body).then(res => res.sendStatus(200).catch(err => console.log(err)))
  }

  render(){
    let customerDeets = ""
    let orderItems = ''
    customerDeets = this.props.requests.map(e => {
      if(e.service_id === parseInt(this.props.match.params.id, 10)){
        return(
          <div>
            <p className='order_details_element'>{`Customer Name: ${e.first_name} ${e.last_name}`}</p>
            <p className='order_details_element'>{`Address: ${e.address}, ${e.state} ${e.zip}`}</p>
            <p className='order_details_element'>{`Email: ${e.email}`}</p>
            <p className='order_details_element'>{`Phone Number: : ${e.phone}`}</p>
          </div>
        )
      }
      return null;
    })
    this.state.order.data ? orderItems = this.state.order.data.map((e, i) => {
      return(
        <div>
          <p className='order_details_element'>{`Service Details:   ${e.issue}`}</p>
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
          <div>
            <button onClick={() => this.confirmOrder(this.state.tracking)}>Confirm Order</button>
            <SweetAlert
                show={this.state.show}
                title="Service Completed"
                confirmButtonColor= '#f1c116'
                text="Contact customer within 24 hours to coordinate pickup/dropoff of machine"
                onConfirm={() => {
                this.setState({ show: false })
                window.location.href = `${process.env.REACT_APP_PATH}/#/requests`}}
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(RequestDetails)