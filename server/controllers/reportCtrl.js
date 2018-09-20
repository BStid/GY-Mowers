const getDailyReport = (req, res) =>{
  const db = req.app.get('db')
  db.get_daily_sales(req.body.time).then(response => {
    if(response.length < 1){
      db.get_daily_sales_after_eight(req.body.time)
      .then(response2 => res.status(200).send(response2)).catch(err => console.log(err))
      return;
    }
    res.status(200).send(response)}).catch(err => console.log(err))
}

const getSkuReport = (req, res) =>{
  const db = req.app.get('db')
  db.get_sku_sales([req.body.time, req.body.skus]).then(response => {
    console.log(response)
    if(response.length < 1){
      db.get_sku_sales_after_eight([req.body.time, req.body.skus])
      .then(response2 => res.status(200).send(response2)).catch(err => console.log(err))
      return;
    }
    res.status(200).send(response)}).catch(err => console.log(err))
}

const getOrders = (req, res) =>{
  const db = req.app.get('db')
  db.get_orders(req.body.status).then(response => {
    res.status(200).send(response)}).catch(err => console.log(err))
}
const orderDetails = (req, res) =>{
  const db = req.app.get('db')
  db.order_details(req.body.id).then(response => res.status(200).send(response))
  .catch(err => console.log(err))
}
const confirmOrder = (req, res) =>{
  const db = req.app.get('db')
  db.complete_order([req.body.tracking, req.body.id]).then(response => res.status(200).send(response))
  .catch(err => console.log(err))
}

const getRequests = (req, res) =>{
  const db = req.app.get('db')
  db.get_requests(req.body.status).then(response => {
    res.status(200).send(response)}).catch(err => console.log(err))
}

const confirmRequest = (req, res) =>{
  const db = req.app.get('db')
  db.complete_service(req.body.id).then(response => res.status(200).send(response))
  .catch(err => console.log(err))
}

const requestDetails = (req, res) =>{
  const db = req.app.get('db')
  db.request_details(req.body.id).then(response => res.status(200).send(response))
  .catch(err => console.log(err))
}

module.exports = {
  getSkuReport,
  getDailyReport,
  getOrders,
  orderDetails,
  confirmOrder,
  getRequests,
  confirmRequest,
  requestDetails
}



