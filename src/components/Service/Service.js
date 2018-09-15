import React, {Component} from 'react'
import {connect} from 'react-redux'
import DatePicker from 'react-datepicker';
import Dropdown from 'react-dropdown'
import {setServiceDate, setServicePickup, setServiceIssue} from '../../ducks/productReducer'
import 'react-dropdown/style.css'
 
import 'react-datepicker/dist/react-datepicker.css';


class Service extends Component{
  constructor(){
    super()

    this.state = {
      issuePlace: 'Please give us a brief description of the problem or service you need done'
    }
    this.handleDateChange = this.handleDateChange.bind(this);
    this.redirect = this.redirect.bind(this)
  }

  handleDateChange(date) {
    this.setState({
      date: date
    });
  }
  redirect(){
    if(this.props.user && this.props.user.first_name){
      window.location.href = 'http://localhost:3000/#/confirmservice'
    }else{
      window.location.href = 'http://localhost:3000/#/serviceinfo'
    }
  }

  render(){
    const options = ['yes', 'no']
    const defaultOption = 'select..'
    return(
      <div>
        <h3>Will you need pick up and delivery?</h3>
        <Dropdown options={options} onChange={(e)=>this.props.setServicePickup({pickup: e.value})} value={this.props.servicePickup} />
        <h3>Please select preferred date for Pickup or store drop off</h3>
        <DatePicker selected={this.props.serviceDate} onChange={this.props.setServiceDate}/>
        <textarea rows="5" cols="100" id="issue" placeholder={this.props.serviceIssue.length > 0 ? this.props.serviceIssue : this.state.issuePlace}
        onChange={(e) => this.props.setServiceIssue({issue: e.target.value})}></textarea>
        <h6>Chars Remaining{`(${500 - this.props.serviceIssue.length})`}</h6>
        <button onClick={() => this.redirect()}>submit</button>
      </div>
      
    )
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {setServiceDate, setServicePickup, setServiceIssue})(Service);