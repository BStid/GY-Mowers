require('dotenv').config()
const express = require('express')
const {json} = require('body-parser')
const massive = require('massive')
const session = require('express-session')
const passport = require('passport');
const strategy = require('./strategy')
const nodemailer = require('nodemailer');
const cors = require('cors')
const path = require('path')
const configureRoutes = require('./stripe')
const {getAllMowers, getAllBlades, getMowerBrand} = require('./controllers/productCtrl')
const {addToCart, getCart, deleteFromCart, addOrder} = require('./controllers/cartCtrl')
const {setServiceApt} = require('./controllers/serviceCtrl')
const {getUser, logout, addUserInfo} = require('./controllers/loginCtrl')
const {getSkuReport, getDailyReport, getOrders} = require('./controllers/reportCtrl')
const app = express()
app.use(json())

const configureServer = app => {
  app.use(cors());
  app.use(json());
};

configureServer(app)
configureRoutes(app);

massive(process.env.CONNECTION_STRING)
.then(db => {app.set('db', db)})
.catch(err => console.log(err))

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3 * 60 * 1000
    }
  })
);

app.use( passport.initialize() );
app.use( passport.session() );
passport.use(strategy)

passport.serializeUser((profile, done) => {
  const db = app.get('db');
  db.get_user_by_authid(profile.id).then(user => {
    if (!user[0]) {
      db.add_user_by_authid(profile.id)
        .then(response => {
          return done(null, response[0]);
        })
        .catch(err => console.log(err));
    } else {
      return done(null, user[0]);
    }
  });
});


passport.deserializeUser((user, done) => {
  done(null, user);
});


app.use((req, res, next) => {
  if (!req.session.cart) req.session.cart = [];
  next();
});

app.use((req, res, next) => {
  if(!req.session.path) req.session.path = [];
  next();
})


//PRODUCT ENDPOINTS
app.get('/api/mowers', getAllMowers)
app.get('/api/filteredmowers/:brand', getMowerBrand)
app.get('/api/blades', getAllBlades)

//CART ENDPOINTS
app.get('/api/cart', getCart);
app.post('/api/cart', addToCart);
app.delete('/api/cart/:id' , deleteFromCart)

//SERVICE ENDPOINTS
app.post('/api/service', setServiceApt)

//LOGIN ENDPOINTS
app.get('/login', passport.authenticate('auth0', {
  successRedirect: 'http://localhost:3000/#/',
  failureRedirect: 'http://localhost:3001/#/'
}));

//USER ENDPOINTS
app.post('/api/user', addUserInfo);
app.get('/api/user', getUser);
app.get('/api/logout', logout);

//ORDERS ENDPOINTS
app.post('/api/order', addOrder)

//REPORT ENDPOINTS
app.post('/api/skureport', getSkuReport)
app.post('/api/dailyreport', getDailyReport)
app.post('/api/orders', getOrders)

//MAIL ENDPOINTS
app.post('/api/send', function(req, res, next) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  })
  const mailOptions = {
    from: `GY Mowers`,
    to: `${req.body.email}`,
    subject: `${req.body.subject}`,
    text: `${req.body.message}`,
    replyTo: `${process.env.EMAIL}`
  }
  transporter.sendMail(mailOptions, function(err, res) {
    if (err) {
      console.error('there was an error: ', err);
    } else {
      null
    }
  })
})

//TWILIO ENDPOINTS
app.post('/api/sendsms', (req, res) => {
  var client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_AUTH);
  client.messages.create({
    to: req.body.recipient,
    from: process.env.TWILIO_SENDER,
    body: req.body.message
  }, function (err, responseData) {
    if (!err) {
      res.json({"From": responseData.from, "Body": responseData.body});
    }
  })
})

app.listen(process.env.SERVER_PORT, ()=> console.log(`listening on port ${process.env.SERVER_PORT}`))
