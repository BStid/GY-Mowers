import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getMowers} from '../../ducks/productReducer'
import MowerCards from '../Cards/MowerCards'
import {Link} from 'react-router-dom'
import axios from 'axios'
import '../Cards/Cards.css'

class MowerSales extends Component{
  constructor(){
    super()

    this.toggleShow = this.toggleShow.bind(this)
  }

  componentDidMount(){
    this.props.getMowers()
  }

  toggleShow(id, status){
    axios.put('/api/products', {id: id, status: status})
    .then(response => this.props.getMowers())
    .catch(err => console.log(err))
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
          <div ><MowerCards toggleShow={this.toggleShow} mowers={this.props.mowers} user={this.props.user}/></div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    mowers: state.mowers,
    user: state.user
  }
}

export default connect(mapStateToProps, {getMowers})(MowerSales);