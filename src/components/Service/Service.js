import React, {Component} from 'react'
import {connect} from 'react-redux'
import DatePicker from 'react-datepicker';
import Dropdown from 'react-dropdown'
import {setServiceDate, setServicePickup, setServiceIssue} from '../../ducks/productReducer'
import 'react-dropdown/style.css'
import './Service.css'
 
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
      <div className='service_landing_content'>
        <h3 className='form_header'>Will you need pick up and delivery?</h3>
        <div className='delivery_drop'>
          <Dropdown options={options} onChange={(e)=>this.props.setServicePickup({pickup: e.value})} value={this.props.servicePickup} />
        </div>
        <h3 className='form_header'>Please select preferred date for Pickup or store drop off</h3>
        <div className='calendar'>
          <DatePicker selected={this.props.serviceDate} onChange={this.props.setServiceDate}/>
        </div>
        <h3 className='form_header'>Please describe the problem you are having, or serve the machine will need</h3>
        <div className='issue_box'>
          <textarea rows="5" cols="100" id="issue" placeholder={this.props.serviceIssue.length > 0 ? this.props.serviceIssue : this.state.issuePlace}
          onChange={(e) => this.props.setServiceIssue({issue: e.target.value})}></textarea>
        </div>
        <h6 className='remaining'>Chars Remaining{`(${500 - this.props.serviceIssue.length})`}</h6>
        <button className='service_submit' onClick={() => this.redirect()}>submit</button>
        <img className='service_banner' src='https://cdnmedia.endeavorsuite.com/images/organizations/897e7640-c2db-489c-8204-5e34983c8664/offers/or4448_150737_mo1.jpg?v=1521113282958'></img>
      </div>
      
    )
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {setServiceDate, setServicePickup, setServiceIssue})(Service);