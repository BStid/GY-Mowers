const addToCart = (req, res) => {
  req.session.cart.push(req.body);
  res.status(200).send(req.session.cart);
};

const clearCart = (req, res) => {
  req.session.cart = []
  res.status(200).send(req.session.cart);
};

const deleteFromCart = (req, res) => {
  req.session.cart.splice(req.params.id, 1);
  res.status(200).send(req.session.cart);
};

async function addOrder (req, res){
  const db = req.app.get('db')
  let lastOrder = 0
  await db.get_last_order().then(response => lastOrder = parseInt((parseInt((response[0].max))+1)))
  req.body.cart.map(e => db.add_order([lastOrder, e.product_id, req.body.userid, req.body.date]))
}

const getCart = (req, res) => {
  res.status(200).send(req.session.cart);
};

module.exports = {
  addToCart,
  getCart,
  deleteFromCart,
  addOrder,
  clearCart
};
