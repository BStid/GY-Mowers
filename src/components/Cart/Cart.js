import React, {Component} from 'react'
import {connect} from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {handleCartDelete, getCart, updateTotal, clearCart} from '../../ducks/productReducer'
import {Link} from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import Checkout from '../Checkout/Checkout'
import SweetAlert from 'sweetalert2-react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import './Cart.css'


class Cart extends Component{
  constructor(){
    super()

    this.state = {
      date: '',
      show: false
    }

    this.addOrderToDB = this.addOrderToDB.bind(this)
    this.sendPurchaseEmail = this.sendPurchaseEmail.bind(this)
    this.toggleShow = this.toggleShow.bind(this)
  }

  componentDidMount(){
    this.setState({date: moment()})
  }
  toggleShow(){
    console.log('Toggle Show!!!')
    this.setState({show: !this.state.show})
  }

  addOrderToDB(cart, userid, date){
    axios.post('/api/order', {cart, userid, date})
  }

  sendPurchaseEmail(email){
    let body = {
      subject: "Welcome to the GY family",
      email: email,
      message: 'TBD'
    }
    this.props.user.message ? axios.post('/api/sendsms', 
    {recipient: `+1${this.props.user.phone}`, message: `Hello, ${this.props.user.first_name}!! Thank you for choosing GY Mowers. We will begin working on your order immediately, and will reach out for any additional information needed.`}): null

    axios.post('/api/send', body).then(res => res.sendStatus(200).catch(err => console.log(err)))
  }

  render(){
    console.log(this.props)
    if(this.props.cart.length > 0){
      var total = this.props.cart.map(item => parseFloat(item.price)).reduce(((prev, next) => prev + next),0);
      this.props.updateTotal(total)
     var cart = this.props.cart.map((item, i) =>{
       return(
        <TableRow key={i}>
          <TableRowColumn>{item.title}</TableRowColumn>
          <TableRowColumn>{item.price}</TableRowColumn>
          <TableRowColumn>1</TableRowColumn>
          <TableRowColumn>{item.price}</TableRowColumn>
          <TableRowColumn><button onClick={()=>{this.props.handleCartDelete(i)}}>X</button></TableRowColumn>
        </TableRow>
      )})
   }

    return(
    <div className='cart_content'>
      <div className='cart_banner'><h1 className='banner_text'>Cart</h1></div>
      {this.props.cart[0] ? 
      <div>
        <MuiThemeProvider>
          <Table>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>Product</TableHeaderColumn>
                <TableHeaderColumn>Price</TableHeaderColumn>
                <TableHeaderColumn>Quantity</TableHeaderColumn>
                <TableHeaderColumn>Total</TableHeaderColumn>
                <TableHeaderColumn>Delete</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {cart}
              <TableRow>
                <TableRowColumn>{`       `}</TableRowColumn>
                <TableRowColumn>{`       `}</TableRowColumn>
                <TableRowColumn>{`       `}</TableRowColumn>
                <TableRowColumn>Order Total:</TableRowColumn>
                <TableRowColumn>{total ? parseFloat(total.toFixed(2)) : null}</TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
        </MuiThemeProvider>

        {this.props.user && this.props.user.authid ?  <div onClick={() =>{
            this.addOrderToDB(this.props.cart, this.props.user.user_id, this.state.date.format('LL'))
             setTimeout(this.sendPurchaseEmail, 15000, this.props.user.email)
             this.props.clearCart()
           }}><Checkout 
                name={'GY Mowers'} description={''} amount={this.props.cartTotal} 
                email={this.props.user.email} toggleShow={this.toggleShow}/> </div>:
           <a href={`${process.env.REACT_APP_LOGIN_PATH}/login?path=cart`}><button>Login To Checkout</button></a>}
      </div>: 
        <div className='no_items'>
          <h1>No Items In Cart</h1>
          <Link to='/sales'><button>Shop Now!!</button></Link>
          <SweetAlert
                show={this.state.show}
                confirmButtonColor= '#f1c116'
                title="Thank you for your purchase!!"
                text="An email containing order confirmation has been sent. If you do not receive the communication within 5 minutes please contact us for assistance"
                onConfirm={() => {
                this.setState({ show: false })
                window.location.href = `${process.env.REACT_APP_PATH}`}}
            />
        </div>
        }
    </div>
      
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {handleCartDelete, getCart, updateTotal, clearCart})(Cart)

