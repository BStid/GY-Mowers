import React, {Component} from 'react';
import {connect} from 'react-redux'
import axios from 'axios'
import './Reviews.css'

class Reviews extends Component{
  constructor(props){
    super(props)

    this.state = {
      comment: '',
      reviews: []
    }
    this.addReview = this.addReview.bind(this)
  }

  async componentDidMount(){
    await axios.get(`/api/reviews/${this.props.id}`)
    .then(response => this.setState({reviews: response.data}))
    .catch(err => console.log(err))
  }

  addReview(review){
    axios.post('/api/reviews', {id: this.props.id, review: review, user: this.props.user})
    .then(response => this.setState({reviews: response.data}))
    .catch(err => console.log(err))
  }

  render(){
    console.log(this.state.reviews)
    let reviewBox = this.state.reviews.map(e => {
      return(
        <div className='review_box'>
          <div className='cust_info'>{`${e.first_name} in ${e.state}:`}</div>
          <div className='cust_comment'>{e.comment}</div>
        </div>
      )
    })
    return (                
      <div className='entire_modal'>
        <h1 className='review_modal_text'>Customer Reviews</h1>
        {reviewBox}
        <div className='input_comps'>
          <textarea className='text_box_review' rows="5" cols="100" id="issue" placeholder='Let us know what you think...' onChange={(e) => this.setState({comment: e.target.value})}></textarea>
          <button className='review_submit' onClick={() => this.addReview(this.state.comment)}>Submit Review</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(Reviews)