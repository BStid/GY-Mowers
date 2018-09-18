function getAllMowers(req, res){
  const db = req.app.get('db')
  db.get_all_mowers().then(response => res.status(200).send(response))
  .catch(err => res.status(500)
  .send(err => console.log('something went wrong', err)))
}
function getMowerBrand(req, res){
  const db = req.app.get('db')
  db.get_mowers_by_brand(req.params.brand).then(response => res.status(200).send(response))
  .catch(err => res.status(500)
  .send(err => console.log('something went wrong', err)))
}
function getAllBlades(req, res){
  const db = req.app.get('db')
  db.get_all_blades().then(response => res.status(200).send(response))
  .catch(err => res.status(500)
  .send(err => console.log('something went wrong', err)))
}
function toggleShow(req, res){
  const db = req.app.get('db')
  db.toggle_show([req.body.id, req.body.status]).then(response => res.status(200).send(response))
  .catch(err => res.status(500)
  .send(err => console.log('something went wrong', err)))
}


module.exports = {
  getAllMowers,
  getAllBlades,
  getMowerBrand,
  toggleShow
}