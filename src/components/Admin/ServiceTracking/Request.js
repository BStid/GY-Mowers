import React, {Component} from 'react'
import { connect } from 'react-redux';
import AdminNav from '../AdminNav/AdminNav'
import {Link} from 'react-router-dom'
import '../OrderTracking/Order.css'


class Request extends Component{

  render(){
    var requestList = ''
    let listheader = this.props.requests.length > 0 ?(
        <div className='order_line'>
          <p className='order_element' id='title'>{`Customer Name`}</p>
          <p className='order_element' id='title'>{`Request Number`}</p>
          <p className='order_element' id='title'>{`Requested Date`}</p>
       </div>):null
    this.props.requests.length > 0 ? requestList = this.props.requests.map((e,i)=> {
      return(
        <div  key={i} className='order_line'>
         <p className='order_element'>{`${e.first_name} ${e.last_name}`}</p>
         <Link className='order_element' style={{ textDecoration: 'none' }} to={`/requestdetails/${e.service_id}`}><h4 className='order_element' style={{ textDecoration: 'none' }}>{`${e.service_id}`}</h4></Link>
          <p className='order_element'>{`${e.service_date.slice(0, 10)}`}</p>
        </div>
      )}):null
    return(
      <div>
        <AdminNav/>
        {listheader}
        {requestList}
      </div>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(Request)