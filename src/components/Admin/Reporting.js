import React, {Component} from 'react'
import { connect } from 'react-redux';
import BarChart from './BarChart'
import AdminNav from './AdminNav'


class Reporting extends Component{
  constructor(){
    super()
  }

  componentDidMount(){

  }

  render(){
    return(
      <div>
        <AdminNav/>
        <BarChart/>
      </div>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(Reporting)