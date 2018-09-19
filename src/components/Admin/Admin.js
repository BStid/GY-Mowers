import React, {Component} from 'react'
import { connect } from 'react-redux';
import AdminNav from './AdminNav'
import axios from 'axios'
import {Bar} from 'react-chartjs-2'
import './Admin.css'


class Admin extends Component{
  constructor(){
    super()

    this.state = {
      sales: 0,
      pService: 0,
      pSales: 0,
      data: {}
    }

    this.countOrders = this.countOrders.bind(this)
  }

  componentDidMount(){
    axios.post('/api/dailyreport', {time: '1'})
    .then(response => this.setState({sales: response.data[0]}))
    .catch(err => console.log(err))

    axios.post('/api/requests', {status: false})
    .then(response => this.setState({pService: response.data}))
    .catch(err => (console.log(err)))

    axios.post('/api/orders', {status: false})
    .then(response => this.countOrders(response.data))
    .catch(err => (console.log(err)))

    this.generateSkuSales('1', '10')
  }

  async generateSkuSales(time, skus){
    var labels = []
    var data = []
   await axios.post('/api/skureport', {time, skus}).then(res => {
    res.data.map((e, i) => {
      labels.push(this.makeStringArray(e.title))
      data.push(parseInt(e.count))
      return ''
    })
  }).catch(err => console.log(err))
  this.setState({data:{
    labels: labels,
    datasets: [{
        label: `Today's Top SKUs`,
        data: data,
        backgroundColor: [
          'rgba(114,147,203,1)',
          'rgba(225, 151, 76, 1)',
          'rgba(132, 186, 91, 1)',
          'rgba(211, 94, 96, 1)',
          'rgba(128, 133, 133, 1)',
          'rgba(144, 103, 167, 1)',
          'rgba(171, 104, 87, 1)',
          'rgba(204, 194, 16, 1)'],
        borderColor: [
          'rgba(114,147,203,1)',
          'rgba(225, 151, 76, 1)',
          'rgba(132, 186, 91, 1)',
          'rgba(211, 94, 96, 1)',
          'rgba(128, 133, 133, 1)',
          'rgba(144, 103, 167, 1)',
          'rgba(171, 104, 87, 1)',
          'rgba(204, 194, 16, 1)'
      ],
        borderWidth: 1
    }]
  }})
  }
  makeStringArray(str){
    let count = 0;
    let line = '';
    let newArr = str.split('')
    let finalArr = []
    for(let i = 0; i < newArr.length; i++){
      if(count < 15){
        line += newArr[i];
        count ++;
      }else{
        if(newArr[i] !== " "){
          line += newArr[i];
          count ++;
        }else{
          finalArr.push(line);
          count = 0;
          line = '';
        }    
      }
    }
   return finalArr;
  }

countOrders(orders){
  var count = 0
  let orderNum = 0
  orders.map((e, i) => {
    if(i === 0){
      count++
      orderNum = e.order_number
      return null
    }else if(e.order_number === orderNum && (i+1) < orders.length){
      return null
    }else if(e.order_number !== orderNum && (i+1) < orders.length){
      count++
      orderNum = e.order_number
      return null
    }else if(e.order_number !== orderNum){
      count++
      this.setState({pSales: count})
    }else{
      this.setState({pSales: count})
      return count
    }
  })
}

  render(){
    return(
      <div className='admin_dash'>
        <AdminNav/>
        <h1 className='dash_title'>Dashboard</h1>
        <div className='admin_container'>
          <h1 className='box_title'>Intraday sales</h1>
          <div className='today'>{this.state.sales.to_char}</div>
          {this.state.sales.sum > 15000 ? <div className='dash_info_today' id='green'>{`$${this.state.sales.sum}`}</div>:
          this.state.sales.sum > 0 ? <div className='dash_info_today' id='yellow'>{`$${this.state.sales.sum}`}</div>:
          <div className='dash_info_today' id='red'>{`$${this.state.sales.sum}`}</div>}
        </div>
        <div className='admin_container'>
         <h1 className='box_title'>Pending Sales Orders</h1>
         {this.state.pSales > 5 ? <div className='dash_info_line' id='red'>{this.state.pSales}</div>:
          this.state.pSales > 0 ? <div className='dash_info_line' id='yellow'>{this.state.pSales}</div>:
          <div className='dash_info_line' id='green'>{this.state.pSales}</div>}
        </div>
        <div className='admin_container'>
          <h1 className='box_title'>Pending Service Orders</h1>
          {this.state.pService.length > 5 ? <div className='dash_info_line' id='red'>{this.state.pService.length}</div>:
          this.state.pService.length > 0 ? <div className='dash_info_line' id='yellow'>{this.state.pService.length}</div>:
          <div className='dash_info_line' id='green'>{this.state.pService.length}</div>}
        </div>
        <div className='dash_graph_container'>
          <Bar
          data={this.state.data}
          width={80}
          height={400}
          options={{
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                      beginAtZero: true,
                      callback: function(value, index, values) {
                        return value;
                      }
                    },
                    scaleLabel: {
                      display: true,
                      labelString: 'Units'
                    }
                }],
            }
          }}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(Admin)