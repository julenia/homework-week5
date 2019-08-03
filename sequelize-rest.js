const Sequelize = require('sequelize')
const sequelize = new Sequelize('postgres://postgres:secret@localhost:5432/postgres');
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 4000
app.use(bodyParser.json()) 
const Movie = sequelize.define('movie',{
  title: Sequelize.STRING,
  yearOfRelease: Sequelize.INTEGER,
  synopsis: Sequelize.STRING
})

sequelize.sync()
.then(() => console.log('database connected'))
.catch(err => console.error(err))

app.post('/movie', (req, res, next)=>{
  Movie.create(req.body)
  .then(movie=> res.json(movie))
  .catch(next)
})

app.get('/movie', (req, res, next)=>{
  const limit = req.query.limit || 25
  const offset = req.query.offset || 0
  Promise.all([Movie.count(), Movie.findAll({limit, offset})])
  .then(([total, movies]) => {
    res.json({movies, total})})
  .catch(next)})

app.get('/movie/:id', (req, res, next) =>{
  Movie.findByPk(req.params.id)
  .then(movie => res.json(movie))
  .catch(next)
})

app.put('/movie/:id', (req, res, next)=>{
  Movie.findByPk(req.params.id)
  .then(movie => movie.update(req.body))
  .then(movie => res.json(movie))
  .catch(next)
})

app.delete('/movie/:id', (req, res, next) =>{
  Movie.destroy({
    where: {id : req.params.id}
  })
  .then(number => res.json(number))
  .catch(next)
})

app.listen(port, ()=> console.log(`Listen to port: ${port}`))