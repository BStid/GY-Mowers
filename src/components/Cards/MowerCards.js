import React, {Component} from 'react'
import './Cards.css'
import {Link} from 'react-router-dom'

class MowerCards extends Component{
  constructor(props){
    super(props)

  }


  render(){
  let card = this.props.mowers.map((mower, i) =>{
   return(
    this.props.user && this.props.user.is_admin ?
    <div  key={i} className='sales_card'>
      <div className='toggle_container'>
        {mower.show ? <button className='toggle_button' onClick={() => this.props.toggleShow(mower.product_id, false)}>Deactivate Product</button>:
        <button className='toggle_button' onClick={() => this.props.toggleShow(mower.product_id, true)}>Activate Product</button>}
      </div>
      <img alt='mower' className='card_image' src={mower.img}></img>
      <Link to={`/details/${mower.product_type}/${mower.product_id}`}><h4 className='product_title'>{mower.title}</h4></Link>
      <p>${mower.price}</p>
    </div> : !this.props.user.is_admin && mower.show ?
    <div  key={i} className='sales_card'>
      <img alt='mower' className='card_image' src={mower.img}></img>
      <Link to={`/details/${mower.product_type}/${mower.product_id}`}><h4 className='product_title'>{mower.title}</h4></Link>
      <p>${mower.price}</p>
    </div>:
    null
  )})
  
    return(
      <div  className='sales_card_container'>{card}</div>
    )
  }
}

export default MowerCards;