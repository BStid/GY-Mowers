import React, {Component} from 'react';
import StarRatingComponent from 'react-star-rating-component';
import axios from 'axios';
import './StarRating.css'

class StarRating extends Component{
  constructor(){
    super()
    this.state = {
      rating: 0,
      numOfReviews: 0
    }
    this.getAverageReview = this.getAverageReview.bind(this)
  }

  async componentDidMount(){
    await axios.get(`/api/rating/${this.props.id}`)
    .then(response => this.setState({rating: this.getAverageReview(response.data)}))
    .catch(err => console.log(err))
    
  }

  getAverageReview(reviews){
    let numerator = 0
    reviews.map(e => numerator += parseInt(e.rating))
    this.setState({numOfReviews: reviews.length})
    return(numerator/reviews.length)
  }

   onStarClick(nextValue, prevValue, name) {
    axios.post('/api/rating', {id: this.props.id, rating: nextValue, user: this.props.user})
    .then(response => console.log(response))
    .catch(err => console.log(err))
    this.setState({rating: nextValue});
  }
 
  render(){
    const { rating } = this.state;
    return (  
      <div>
        <div className='stars'>
          <StarRatingComponent 
            name={this.props.id} 
            starCount={5}
            value={rating}
            onStarClick={this.onStarClick.bind(this)}
          />
        </div>
          {this.state.numOfReviews > 1 ? <h5 className='num_ratings'>{`Based on ${this.state.numOfReviews} ratings`}</h5> :
          this.state.numOfReviews > 0 ? <h5 className='num_ratings'>{`Based on ${this.state.numOfReviews} rating`}</h5>:
           <h5 className='num_ratings'>Be the first to rate this product!!</h5>}
      </div>              
    )
  }
}


export default StarRating;
