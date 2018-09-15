require('dotenv').config()
const configureStripe = require('stripe');
const stripe = configureStripe(process.env.STRIPE_SECRET);

const postStripeCharge = res => (stripeErr, stripeRes) => {
  
  if (stripeErr) {
    res.status(500).send({ Error: stripeRes });
  } else {
    res.status(200).send({ success: stripeRes });
  }
}

const paymentApi = app => {
  // app.get('/createcharge', (req, res) => {
  //   res.send({ message: 'Hello Stripe checkout server!', timestamp: new Date().toISOString() })
  // });

  app.post('/createcharge', (req, res) => {
    stripe.charges.create(req.body, postStripeCharge(res))
  });

  return app;
};

const configureRoutes = app => {
  paymentApi(app);
};

module.exports = configureRoutes;