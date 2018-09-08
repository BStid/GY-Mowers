const serviceLogin = () => {
  passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3001/#/service',
    failureRedirect: 'http://localhost:3001/#/'
  })
}

const salesLogin = () => {
  passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3001/#/cart',
    failureRedirect: 'http://localhost:3001/#/'
  })
}

const adminLogin = () => {
  passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3001/#/admin',
    failureRedirect: 'http://localhost:3001/#/'
  })
}

module.exports = {
  serviceLogin,
  salesLogin,
  adminLogin
}
