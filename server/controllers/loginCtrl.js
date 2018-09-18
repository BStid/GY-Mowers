function addUserInfo(req, res){
  const {authid, first, last, address, zip, state, email, phone, message} = req.body
  const db = req.app.get('db')
  db.add_user_info([authid, first, last, address, zip, state, email, phone, message]).then(response => {res.status(200).send(response)})
  .catch(err => res.status(500).send(err => console.log('something went wrong', err)))
}

const getUser = (req, res) => {
  if (!req.user) res.sendStatus(401);
  else res.status(200).send(req.user);
};

const logout = (req, res) => {
  req.session.destroy(() => {
    res.sendStatus(200);
  });
};

module.exports = {
  addUserInfo,
  getUser,
  logout,
}
