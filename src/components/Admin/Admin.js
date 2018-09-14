import React, {Component} from 'react'
import { connect } from 'react-redux';
import BarChart from './BarChart'


class Admin extends Component{
  constructor(){
    super()
  }

  componentDidMount(){

  }

  render(){
    return(
      <div>
        <BarChart/>
      </div>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(Admin)