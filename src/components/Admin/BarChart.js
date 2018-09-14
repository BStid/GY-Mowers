import React, {Component} from 'react'
import {Bar, Pie} from 'react-chartjs-2'
import Dropdown from 'react-dropdown'
import {connect} from 'react-redux'
import axios from 'axios'
import './BarChart.css'

class BarChart extends Component{
  constructor(){
    super()
      this.state = {
        data: {},
        pieData: {},
        timeFrame: '',
        report: '',
        numSkus: 5
      }
    this.generateData =this.generateData.bind(this)
    this.generateDailySales = this.generateDailySales.bind(this)
    this.generateSkuSales = this.generateSkuSales.bind(this)
    this.makeStringArray = this.makeStringArray.bind(this)
  }

  
generateData(time, reportChoice, skus){
  if(reportChoice === 'Gross sales by Day'){
    this.generateDailySales(time)
  }else if(reportChoice === 'Top Sales by sku'){
    this.generateSkuSales(time, skus)
  }
}

async generateSkuSales(time, skus){
  var labels = []
  var pieLabels = []
  var data = []
 await axios.post('/api/skureport', {time, skus}).then(res => {
   console.log(res)
  res.data.map((e, i) => {
    labels.push(this.makeStringArray(e.title))
    pieLabels.push(e.title)
    data.push(parseInt(e.count))
    return ''
  })
}).catch(err => console.log(err))
console.log(pieLabels)
this.setState({data:{
  labels: labels,
  datasets: [{
      label: `Units Sold (Top ${skus} SKUs last ${time} days)`,
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
},
options: {
  maintainAspectRatio: false,
  scales: {
      yAxes: [{
          ticks: {
            callback: function(value, index, values) {
              return value;
            },
            beginAtZero: true
          },
          scaleLabel: {
            display: true,
            labelString: 'Units'
          }
      }],
      xAxes: [{labelMaxWidth: 10}]
  }
}})
this.setState({pieData: {
  labels: pieLabels,
  datasets: [{
      label: `Units Sold (Top ${skus} SKUs last ${time} days)`,
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
      borderColor: 'black',
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

async generateDailySales(time){
  var labels = []
  var data = []
  await axios.post('/api/dailyreport', {time}).then(res => {
    res.data.map((e, i) => {
      labels.unshift(e.to_char)
      data.unshift(parseInt(e.sum))
      return ''
    })
  }).catch(err => console.log(err))
  this.setState({data:{
    labels: labels,
    datasets: [{
        label: `Daily Revenue (Last ${time} days)`,
        data: data,
        backgroundColor: ['rgba(114,147,203,1)','rgba(225, 151, 76, 1)','rgba(132, 186, 91, 1)','rgba(211, 94, 96, 1)','rgba(128, 133, 133, 1)','rgba(144, 103, 167, 1)','rgba(171, 104, 87, 1)','rgba(204, 194, 16, 1)'],
        borderColor: ['rgba(132, 186, 91, 1)','rgba(211, 94, 96, 1)','rgba(128, 133, 133, 1)','rgba(144, 103, 167, 1)','rgba(171, 104, 87, 1)','rgba(204, 194, 16, 1)'],
        borderWidth: 1
    }]
  },
  options: {
    maintainAspectRatio: false,
    scales: {
        yAxes: [{
            ticks: {
              beginAtZero: true,
              callback: function(value, index, values) {
                return '$' + value;
              }
            },
            scaleLabel: {
              display: true,
              labelString: 'Dollars'
            }
        }],
    }
  }})
  this.setState({pieData: {
    labels: labels,
    datasets: [{
        label: `Daily Revenue (Last ${time} days)`,
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
        borderColor: 'black',
        borderWidth: 1
    }]
  }})
}

  render(){
    const options = ['Top Sales by sku', 'Gross sales by Day']
    const defaultOption = options[0]
    console.log(this.state);
    
    return(
      <div className='reporting_content'>
          <div className='filter_options'>
            <Dropdown options={options} onChange={(e)=>{this.setState({report: e.value})
              this.setState({timeFrame: ''})}} value={this.state.report} />
            <input className='report_input' onChange={(e)=>this.setState({timeFrame: e.target.value})} value={this.state.timeFrame} placeholder={
              this.state.report ? "Timeframe (days)" : 'Select report type'}></input>
            {this.state.report === 'Top Sales by sku'?
            <input className='report_input' onChange={(e)=> this.setState({numSkus: e.target.value})}  placeholder='# of SKUs (default 5)'></input> : null}
            <button className='report_input_button'onClick={() => this.generateData(this.state.timeFrame, this.state.report, this.state.numSkus)}>Run Report</button>
          </div>
          {this.state.data.labels ?
          <div>
            <Bar
            data={this.state.data}
            width={85}
            height={400}
            options={this.state.options}/>
          </div>: <h1>Please Select Report</h1>}
          {this.state.data.labels ?
          <div>
            <Pie
            width={85}
            height={400}
            data={this.state.pieData}
            options={{maintainAspectRatio: false}}/>
          </div>: null}          
      </div>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(BarChart)

