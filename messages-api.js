const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const parserMiddleware = bodyParser.json()
app.use(parserMiddleware)
let numberOfRequests = 0;

function tooManyRequests(req, res, next){
  if(numberOfRequests>=5) return res.status(429).send()
  next()
}

app.post('/message',tooManyRequests ,(req, res, next) => {
  const body = req.body
  if (!body.message || body.message === "") {
    numberOfRequests++ 
    return res.status(400).send()
  }
  else {
    numberOfRequests++
    return res.json(body)
  }}
)

app.listen(port, ()=> console.log(`Listen to port: ${port}`))