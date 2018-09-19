import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getFilteredMowers} from '../../ducks/productReducer'
import MowerCards from '../Cards/MowerCards'
import {Link} from 'react-router-dom'
import '../Cards/Cards.css'

class FilteredSales extends Component{

  componentDidMount(){
    this.props.getFilteredMowers(this.props.match.params.brand)
  }

  render(){
    return(
      <div className='product_container'>
      <div className='filtered_top_bar'>
        <Link to='/mowers'><h4 className='top_bar_content'>Back to all mowers</h4></Link>
        <h1 className='top_bar_content'>{`${this.props.match.params.brand} Mowers`}</h1>
      </div>
        <div ><MowerCards mowers={this.props.mowers}/></div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    mowers: state.mowers
  }
}

export default connect(mapStateToProps, {getFilteredMowers})(FilteredSales);