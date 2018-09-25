import React, {Component} from 'react'
import {connect} from 'react-redux'
import './Details.css'
import ReactPlayer from 'react-player'
import {addToCart} from '../../ducks/productReducer'
import StarRating from '../StarRating/StarRating'
import Reviews from '../Reviews/Reviews'
import Modal from '../Modal/Modal'

class Details extends Component{
  constructor(){
    super()

    this.state = {isOpen: false}
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render(){
    let deets =''
    if(this.props.match.params.type === "blade"){
      deets = this.props.blades.map(blade => {
        if(blade.product_id === parseInt(this.props.match.params.id, 10)){
          return(
            <div key={blade.product_id} className='details_content'>
              <div className='left_side'>
                <img alt='blade' className='deets_img' src={blade.img}/>
              </div>
              <div className='right_side'>
                <h1>{blade.title}</h1>
                <div className='price'>{`$${blade.price}`}</div>
                <p className='desc'>{blade.description}</p>
                <button className='cart_button' onClick={() =>this.props.addToCart(blade)}>Add To Cart</button>
                <StarRating id={this.props.match.params.id} user={this.props.user.user_id}/>
              </div>
              <Modal show={this.state.isOpen} onClose={this.toggleModal}><Reviews id={this.props.match.params.id} user={this.props.user.user_id}/></Modal>
            </div>
          )
        }
        return null;
      })
    }else if(this.props.match.params.type === "mower"){
      deets = this.props.mowers.map(mower => {
        if(mower.product_id === parseInt(this.props.match.params.id, 10)){
          return(
            <div key={mower.product_id} className='details_content'>
              <div className='left_side_details'>
                <img alt='mower' className='deets_img' src={mower.img}/>
              </div>
              <div className='right_side_details'>
                <h1>{mower.title}</h1>
                <div className='price'>{`$${mower.price}`}</div>
                <p className='desc'>{mower.description}</p>
                <button className='cart_button' onClick={() => this.props.addToCart(mower)}>Add To Cart</button>
                <StarRating id={this.props.match.params.id} user={this.props.user.user_id}/>
                <div className='review_line'>click <span onClick={() => this.toggleModal()} className='review_word'>here</span> to see customer reviews of this product</div>
              </div> 
              <Modal show={this.state.isOpen} onClose={this.toggleModal}><Reviews id={this.props.match.params.id} user={this.props.user.user_id}/></Modal>
              <div className='vid_box'>
                {mower.brand === 'Hustler' ? <div className='video'><ReactPlayer url='https://www.youtube.com/watch?v=AYMU9TWWYxM' playing={true}/></div> : 
                 mower.brand === 'Spartan' ? <div className='video'><ReactPlayer url='https://www.youtube.com/watch?v=Zzh_GsgJBlw' playing={true}/></div> :
                 mower.brand === 'BigDog' ?  <div className='video'><ReactPlayer url='https://www.youtube.com/watch?v=hABSF8MMv4s' playing={true}/></div>: null}             
              </div>             
            </div>
          )
        }
        return ""})
    }
    return(
      <div className='details_page'>
       <div>{deets}</div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    mowers: state.mowers,
    blades: state.blades,
    cart: state.cart,
    user: state.user
  }
}

export default connect(mapStateToProps, {addToCart})(Details);