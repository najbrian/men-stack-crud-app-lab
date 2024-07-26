const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const logger = require('morgan')
const path = require('path')

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`)
})

const Car = require('./models/car.js')

app.use(express.urlencoded({ extended: false }))
app.use(methodOverride("_method"))
app.use(logger("dev"))
app.use(express.static(path.join(__dirname, "public")))



app.get('/', (req, res) => {
  res.render ('index.ejs')
})

app.get('/cars', async (req, res) => {
  const allCars = await Car.find({})
  res.render('./cars/index.ejs', {cars: allCars})
})

app.get('/cars/new', (req, res) => {
  res.render ('new.ejs')
})

app.get('/cars/:carId', async (req, res) => {
  const inquireCar = await Car.findById(req.params.carId)
  res.render('cars/show.ejs', { car: inquireCar })
})

app.post ('/cars', async (req, res) => {
  if (req.body.isAbleToStart === 'on') {
    req.body.isAbleToStart = true;
  } else {
    req.body.isAbleToStart = false;
  }
  await Car.create(req.body);
  res.redirect('/cars')
})

app.get('/cars/:carId/edit', async (req, res) => {
  const editCar = await Car.findById(req.params.carId)
  res.render('cars/edit.ejs', {car: editCar})
  console.log(editCar.color)
})

app.put('/cars/:carId', async (req, res) => {
  if(req.body.isAbleToStart === 'on') {
    req.body.isAbleToStart = true
  } else {
    req.body.isAbleToStart = false
  }
  await Car.findByIdAndUpdate(req.params.carId, req.body)
  res.redirect(`/cars/${req.params.carId}`)
})

app.delete('/cars/:carId', async (req, res) => {
  await Car.findByIdAndDelete(req.params.carId)
  res.redirect('/cars')
})


app.listen(3000, () => {

})