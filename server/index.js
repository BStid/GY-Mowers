require('dotenv').config()
const express = require('express')
const {json} = require('body-parser')
const massive = require('massive')
const session = require('express-session')
const passport = require('passport');
const strategy = require('./strategy')
const port = 3001;
const {getAllMowers, getAllBlades, getMowerBrand} = require('./controllers/productCtrl')
const {addToCart, getCart, deleteFromCart} = require('./controllers/cartCtrl')
const {setServiceApt} = require('./controllers/serviceCtrl')
const {getUser, logout, addUserInfo} = require('./controllers/loginCtrl')
const app = express()
app.use(json())


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
app.get('/loginservice', passport.authenticate('auth0', {
  successRedirect: 'http://localhost:3000/#/service',
  failureRedirect: 'http://localhost:3001/#/'
}));
app.get('/loginsales', passport.authenticate('auth0', {
  successRedirect: 'http://localhost:3000/#/salesinfo',
  failureRedirect: 'http://localhost:3001/#/'
}));
app.get('/loginadmin', passport.authenticate('auth0', {
  successRedirect: 'http://localhost:3000/#/admin',
  failureRedirect: 'http://localhost:3001/#/'
}));

//USER ENDPOINTS
app.post('/api/user', addUserInfo);
app.get('/api/user', getUser);
app.get('/logout', logout);


app.listen(port, ()=> console.log(`listening on port ${port}`))

