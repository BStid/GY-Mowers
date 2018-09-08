import React, {Component} from 'react'
import {connect} from 'react-redux'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Dropdown from 'react-dropdown'
import {setService} from '../../ducks/productReducer'
import 'react-dropdown/style.css'
 
import 'react-datepicker/dist/react-datepicker.css';


class Service extends Component{
  constructor(){
    super()

    this.state = {
      date: moment(),
      pickup: '',
      issue: '',
      issuePlace: 'Please give us a brief description of the problem or service you need done'
    }
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleDateChange(date) {
    this.setState({
      date: date
    });
  }

  render(){
    const options = ['yes', 'no']
    const defaultOption = options[0]
    return(
      <div>
        <h3>Will you need pick up and delivery?</h3>
        <Dropdown options={options} onChange={(e)=>this.setState({pickup: e.value})} value={defaultOption} placeholder="Select an option" />
        <h3>Please select preferred date for Pickup or store drop off</h3>
        <DatePicker selected={this.state.date} onChange={this.handleDateChange}/>
        <textarea rows="5" cols="100" id="issue" placeholder={this.state.issue.length > 0 ? this.state.issue : this.state.issuePlace}
        onChange={(e) => this.setState({issue: e.target.value})}></textarea>
        <h6>Chars Remaining{`(${500 - this.state.issue.length})`}</h6>
        <button onClick={() =>{this.props.setService(this.state.date.format('LL'), this.state.pickup, this.state.issue)}}>submit</button>
      </div>
      
    )
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {setService})(Service);