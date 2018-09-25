import React, {Component} from 'react'
import { connect } from 'react-redux';
import AdminNav from '../AdminNav/AdminNav'
import {Link} from 'react-router-dom'
import './Order.css'


class Order extends Component{
  constructor(){
    super()
  }

  componentDidMount(){

  }

  render(){
    var ordersList = ''
    let listheader = this.props.orders.length > 0 ?(
      <div className='order_line'>
        <p className='order_element' id='title'>{`Customer Name`}</p>
        <p className='order_element' id='title'>{`Order Number`}</p>
        <p className='order_element' id='title'>{`Order Date`}</p>
     </div>):null
    this.props.orders.length > 0 ? ordersList = this.props.orders.map((e,i)=> {
      return(
        <div  key={i} className='order_line'>
         <p className='order_element'>{`${e[0].first_name} ${e[0].last_name}`}</p>
         <Link className='order_element' style={{ textDecoration: 'none' }} to={`/orderdetails/${e[0].order_number}`}><h4 className='order_element' style={{ textDecoration: 'none' }}>{`${e[0].order_number}`}</h4></Link>
         <p className='order_element'>{`${e[0].order_date.slice(0, 10)}`}</p>
        </div>
      )}):null
    return(
      <div>
        <AdminNav/>
        {listheader}
        {ordersList}
      </div>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(Order)


