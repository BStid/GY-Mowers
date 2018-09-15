import React, {Component} from 'react'
import { connect } from 'react-redux';
import AdminNav from './AdminNav'


class OrderDetails extends Component{
  constructor(){
    super()
  }

  componentDidMount(){

  }

  render(){
    return(
      <div>
        <AdminNav/>
      </div>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(OrderDetails)