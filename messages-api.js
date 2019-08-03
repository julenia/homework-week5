const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const parserMiddleware = bodyParser.json()
app.use(parserMiddleware)

let numberOfRequests = 0;



app.post('/message', (req, res, next) => {
  const body = req.body
  if(numberOfRequests > 5) res.status(429).send()
  else {
  if (!body.message || body.message === "") {
    numberOfRequests++
    
    return res.status(400).send()
  }
  else {
    numberOfRequests++
    return res.json(body)
  }}
})

app.listen(port, ()=> console.log(`Listen to port: ${port}`))