import axios from 'axios'
import moment from 'moment';

const initialState = {
  user: {},
  mowers: [],
  blades: [],
  cart: [],
  serviceApts: [],
  isLoading: false,
  serviceDate: moment(),
  servicePickup: '',
  serviceIssue: '',
  cartTotal: 0,
  loggedOut: false
}

const SET_SERVICE_DATE = 'SET_SERVICE_DATE'
const SET_SERVICE_PICKUP = 'SET_SERVICE_PICKUP'
const SET_SERVICE_ISSUE = 'SET_SERVICE_ISSUE'
const GET_MOWERS = 'GET_MOWERS'
const GET_BLADES = 'GET_BLADES'
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const SET_SERVICE = 'SET_SERVICE'
const GET_USER = 'GET_USER'
const DELETE_CART_ITEM = 'DELETE_CART_ITEM'
const GET_FILTERED_MOWERS = 'GET_FILTERED_MOWERS'
const SET_USER_INFO = 'SET_USER_INFO'
const UPDATE_CART_TOTAL = 'UPDATE_CART_TOTAL'
const LOGOUT = 'LOGOUT'
const CLEAR_CART = 'CLEAR_CART'

export default function(state = initialState, action){
  switch (action.type) {
    case `${GET_MOWERS}_FULFILLED`:{
      return{
        ...state,
        mowers: action.payload.data,
        isLoading: false
      }
    }case `${GET_MOWERS}_PENDING`:{
      return{
        ...state,
        isLoading: true
      }
    }
    case `${GET_BLADES}_FULFILLED`:{
      return{
        ...state,
        blades: action.payload.data,
        isLoading: false
      }
    }case `${GET_BLADES}_PENDING`:{
      return{
        ...state,
        isLoading: true
      }
    }case `${SET_SERVICE_DATE}`:{
      return{
        ...state,
        serviceDate: action.payload
      }
    }case `${SET_SERVICE_PICKUP}`:{
      return{
        ...state,
        servicePickup: action.payload.pickup
      }
    }case `${SET_SERVICE_ISSUE}`:{
      return{
        ...state,
        serviceIssue: action.payload.issue
      }
    }case `${GET_CART}_FULFILLED`:
    return {
      ...state,
      cart: action.payload.data
    };
    case `${ADD_TO_CART}_FULFILLED`:
    return {
      ...state,
      cart: action.payload.data
    };
    case `${ADD_TO_CART}_REJECTED`:
    return {
      ...state,
      addToCartErrMsg: 'Could not Add To Cart'
    };case `${GET_USER}_FULFILLED`:
    return {
      ...state,
      user: action.payload.data,
      loggedOut: false
    };
    case `${DELETE_CART_ITEM}_FULFILLED`:
    return{
      ...state,
      cart: action.payload.data,
      isLoading: false
    };
    case `${DELETE_CART_ITEM}_PENDING`:
    return{
      ...state,
      isLoading: true
    };case `${GET_FILTERED_MOWERS}_FULFILLED`:
    return{
      ...state,
      mowers: action.payload.data
    };case `${SET_USER_INFO}_FULFILLED`:
    return{
      ...state,
      user: action.payload.data[0]
    };case `${SET_SERVICE}_FULFILLED`:{
      return{
        ...state,
        service: action.payload.data
      }
    }case UPDATE_CART_TOTAL:{
      return{
        ...state,
        cartTotal: action.payload
      }}case CLEAR_CART:{
        return{
          ...state,
          cart: []
        }
    }case LOGOUT:{
      return{
        ...state,
        loggedOut: true,
        cart: [],
        user: {}
      }
    }
    default:
      return state;
  }
}
export function clearCart(){
  return{
    type: CLEAR_CART
  }
}

export function logout(){
  return{
    type: LOGOUT,
    payload: axios('/api/logout').then(res => console.log(res))}
}
export function updateTotal(total){
  return{
    type: UPDATE_CART_TOTAL,
    payload: total
  }
}

export function setUserInfo(authid, first, last, address, zip, state, email, phone, message){
  return{
    type: SET_USER_INFO,
    payload: axios.post('/api/user', {authid, first, last, address, zip, state, email, phone, message})
  }
}
export function getFilteredMowers(brand){
  return{
    type: GET_FILTERED_MOWERS,
    payload: axios.get(`/api/filteredmowers/${brand}`)
  }
}

export function handleCartDelete(index){
  console.log(index)
  return{
    type: DELETE_CART_ITEM,
    payload: axios.delete(`/api/cart/${index}`)
  }
}

export function getUser() {
  return {
    type: GET_USER,
    payload: axios.get('/api/user')
  };
}

export function getCart() {
  return {
    type: GET_CART,
    payload: axios.get('/api/cart')
  };
}

export function addToCart(product) {
  return {
    type: ADD_TO_CART,
    payload: axios.post('/api/cart', product)
  };
}
export function getMowers(){
  return{
    type: GET_MOWERS,
    payload: axios('/api/mowers')
  }
}
export function getBlades(){
  return{
    type: GET_BLADES,
    payload: axios('/api/blades')
  }
}
export function setServiceDate(date){
  return{
    type: SET_SERVICE_DATE,
    payload: date
  }
}
export function setServicePickup(pickup){
  return{
    type: SET_SERVICE_PICKUP,
    payload: pickup
  }
}
export function setServiceIssue(issue){
  return{
    type: SET_SERVICE_ISSUE,
    payload: issue
  }
}
export function setService(date, pickup, issue, id){
  return{
    type: SET_SERVICE,
    payload: axios.post('/api/service', {date, pickup, issue, id})
  }
}
