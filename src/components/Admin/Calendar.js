import React, {Component} from 'react'
import BigCalendar from 'react-big-calendar'
import dates from '../../dates'
import moment from 'moment'
import axios from 'axios'
import AdminNav from './AdminNav'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './Calendar.css'

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])
BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));


export default class Calendar extends Component{
  constructor(props){
    super(props)

    this.state = {
      events: []
    }
    this.makeEventData = this.makeEventData.bind(this)
  }

  componentDidMount(){
    axios.post('/api/requests', {status: false})
    .then(response => this.setState({events: this.makeEventData(response.data)}))
    .catch(err => console.log(err))
  }

  makeEventData(requests){
    let events = []
    requests.map((e, i) => {
      events.push({
        id: i,
        title: `Service Request #${e.service_id}`,
        start: e.service_date.slice(0, 10),
        end: e.service_date.slice(0, 10)
      })
    })
    return events
  }

  render(){
    console.log(this.state.events)
    return(
      <div className='calendar_container'>
        <AdminNav/>
        <BigCalendar
          events={this.state.events}
          views={allViews}
          step={60}
          showMultiDayTimes
          max={dates.add(dates.endOf(new Date(2015, 17, 1), 'day'), -1, 'hours')}
          defaultDate={new Date(2018, 9, 1)}
        />
      </div>
    )
  }
}


