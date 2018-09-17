import React, {Component} from 'react'
import { connect } from 'react-redux';
import AdminNav from './AdminNav'
import {Link} from 'react-router-dom'
import './Order.css'


class Request extends Component{
  constructor(){
    super()
  }

  componentDidMount(){

  }

  render(){
    var requestList = ''
    this.props.requests.length > 0 ? requestList = this.props.requests.map((e,i)=> {
      return(
        <div  key={i} className='order_line'>
         <p className='order_element'>{`Customer Name: ${e.first_name} ${e.last_name}`}</p>
         <Link className='order_element' style={{ textDecoration: 'none' }} to={`/requestdetails/${e.service_id}`}><h4 className='order_element' style={{ textDecoration: 'none' }}>{`Request Number: ${e.service_id}`}</h4></Link>
          <p className='order_element'>{`Requested Date: ${e.service_date.slice(0, 10)}`}</p>
        </div>
      )}):null
    return(
      <div>
        <AdminNav/>
        {requestList}
      </div>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(Request)