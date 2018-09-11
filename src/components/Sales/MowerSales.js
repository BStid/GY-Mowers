import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getMowers} from '../../ducks/productReducer'
import MowerCards from '../Cards/MowerCards'
import {Link} from 'react-router-dom'
import '../Cards/Cards.css'

class MowerSales extends Component{

  componentDidMount(){
    this.props.getMowers()
  }

  render(){
    return(
      <div className='product_container'>
        <div className='filtered_top_bar'>
          <div className='top_bar_links'>
            <h3 className='item'>Filter Brand:</h3>
            <Link to='/filteredmowers/Hustler'><h4 className='item'>Hustler</h4></Link>
            <Link to='/filteredmowers/Spartan'><h4 className='item'>Spartan</h4></Link>
            <Link to='/filteredmowers/BigDog'><h4 className='item'>BigDog</h4></Link>
          </div>
          <h1 className='top_bar_content'>{`All Mowers`}</h1>
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

export default connect(mapStateToProps, {getMowers})(MowerSales);