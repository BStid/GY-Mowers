const getDailyReport = (req, res) =>{
  const db = req.app.get('db')
  console.log(req)
  db.get_daily_sales(req.body.time).then(response => {
    res.status(200).send(response) 
    console.log(response)}).catch(err => console.log(err))
}

const getSkuReport = (req, res) =>{
  const db = req.app.get('db')
  console.log(req)
  db.get_sku_sales([req.body.time, req.body.skus]).then(response => {
    res.status(200).send(response) 
    console.log(response)}).catch(err => console.log(err))
}


module.exports = {
  getSkuReport,
  getDailyReport
}



