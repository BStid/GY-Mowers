import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './SalesLanding.css'
import Mower from './Mower.png'
import Mowers from './Mowers.png'

class SalesLanding extends Component{


  render(){
    return(
      <div className='landing'>
        <Link to='/mowers'>
          <div className='sales'>
            <img alt='mower banner' className='mower_img' src={Mowers}></img>
          </div>
        </Link>
        <Link to='/blades'>
          <div className='sales'>
            <img alt='blade banner' className='blades_img' src={Mower}></img>
          </div>
        </Link>
      </div>
    )
  }
}

export default SalesLanding;