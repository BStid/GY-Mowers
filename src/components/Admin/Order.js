import React, {Component} from 'react'
import { connect } from 'react-redux';
import AdminNav from './AdminNav'
import {Link} from 'react-router-dom'
import './Order.css'


class Order extends Component{
  constructor(props){
    super(props)
  }

  componentDidMount(){

  }

  render(){
    var ordersList = ''
    this.props.orders.length > 0 ? ordersList = this.props.orders.map((e,i)=> {
      return(
        <div  key={i} className='order_line'>
         <p className='order_element'>{`Customer Name: ${e[0].first_name} ${e[0].last_name}`}</p>
         <Link className='order_element' style={{ textDecoration: 'none' }} to={`/orderdetails/${e[0].order_number}`}><h4 className='order_element' style={{ textDecoration: 'none' }}>{`Order Number: ${e[0].order_number}`}</h4></Link>
          <p className='order_element'>{`Order Date: ${e[0].order_date}`}</p>
        </div>
      )}):null
    return(
      <div>
        <AdminNav/>
        {ordersList}
      </div>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(Order)


