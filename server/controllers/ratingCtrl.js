
const getRating = (req, res) =>{
  const db = req.app.get('db')
  db.get_rating(req.params.id).then(response => {
    res.status(200).send(response)}).catch(err => console.log(err))
}

const addRating = (req, res) =>{
  const db = req.app.get('db')
  db.add_rating([req.body.id, req.body.rating, req.body.user]).then(response => {
    res.status(200).send(response)}).catch(err => {
      db.update_rating([req.body.id, req.body.rating, req.body.user])
      .then(response => res.status(200).send(response))
      .catch(err => console.log(err))
    })
}

const getReviews = (req, res) =>{
  const db = req.app.get('db')
  db.get_reviews(req.params.id).then(response => {
    res.status(200).send(response)}).catch(err => console.log(err))
}

const addReview = (req, res) => {
  console.log(req.body)
  const db =req.app.get('db')
  db.add_review([req.body.id, req.body.review, req.body.user.user_id]).then(response => {
    res.status(200).send(response)}).catch(err => {
      db.update_review([req.body.id, req.body.review, req.body.user.user_id])
      .then(response => res.status(200).send(response))
      .catch(err => console.log(err))
    })
}
module.exports = {
  addRating,
  getRating,
  getReviews,
  addReview
}