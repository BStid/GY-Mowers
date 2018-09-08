const setServiceApt = (req, res)=>{
  const db = req.app.get('db')
  console.log(req.body, req.session, req.user)
  db.set_service_apt([req.body.date, req.body.pickup, req.body.issue])
  .then(response => res.status(200).send(response))
  .catch(err => res.status(500).send(err))
}

module.exports = {
  setServiceApt
}