import React, {Component} from 'react'
import {connect} from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {handleCartDelete, getCart} from '../../ducks/productReducer'
import {Link} from 'react-router-dom'
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

  render(){
    if(this.props.cart.length > 0){
      var total = this.props.cart.map(item => parseFloat(item.price)).reduce(((prev, next) => prev + next),0);
      // !this.props.isLoading ? (
     var cart = this.props.cart.map((item, i) =>{
       return(
        <TableRow>
          <TableRowColumn>{item.title}</TableRowColumn>
          <TableRowColumn>{item.price}</TableRowColumn>
          <TableRowColumn>1</TableRowColumn>
          <TableRowColumn>{item.price}</TableRowColumn>
          <TableRowColumn><button onClick={()=>this.props.handleCartDelete(i)}>X</button></TableRowColumn>
        </TableRow>
      )})
   }

    return(
    <div className='cart_content'>
      <div className='cart_banner'><h1 className='banner_text'>Cart</h1></div>
      {this.props.cart[0] ? 
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
        </MuiThemeProvider> : 
        <div className='no_items'>
          <h1>No Items In Cart</h1>
          <Link to='/sales'><button>Shop Now!!</button></Link>
        </div>
        }
    </div>
      
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {handleCartDelete, getCart})(Cart)

