const addToCart = (req, res) => {
  req.session.cart.push(req.body);
  res.status(200).send(req.session.cart);
};

const deleteFromCart = (req, res) => {
  req.session.cart.splice(req.params.id, 1);
  res.status(200).send(req.session.cart);
};

const getCart = (req, res) => {
  res.status(200).send(req.session.cart);
};

module.exports = {
  addToCart,
  getCart,
  deleteFromCart
};
