import React from 'react'
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
require('dotenv').config()

const CURRENCY = 'USD';

const fromDollarToCent = amount => amount * 100;

const successPayment = data => {
  window.location.assign('http://localhost:3000/#/cart')
};

const onToken = (amount, description, email, toggleShow) => token =>
  axios.post(`/createcharge`,
    {
      description,
      source: token.id,
      currency: CURRENCY,
      receipt_email: email,
      amount: fromDollarToCent(amount)
    })
    .then(()=>{
    toggleShow()
    successPayment()})
    .catch(()=>{
    toggleShow()
    successPayment()});

const Checkout = ({ name, description, amount, email, toggleShow }) =>{
   return (
    <StripeCheckout
    name={name}
    description={description}
    amount={fromDollarToCent(amount)}
    token={onToken(amount, description, email, toggleShow)}
    currency={CURRENCY}
    stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE}
  />)}


export default Checkout;