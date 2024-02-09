
const express = require('express')
require('dotenv/config')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
var bodyParser = require('body-parser')
const productRoutes = require('./routes/productRoutes')
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
app.options('*',cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/',productRoutes)
//home
// app.get("/",(req,res) => {
//   res.send(`Hii home page`)
// })
mongoose.connect(process.env.DB_CONNECTION).then(() => {
    console.log(`Database is connected`)
}).catch((err) => {
    console.log(`Database got some error ${err}`)
})

const PORT_NO = process.env.PORT_NO

app.listen(`${PORT_NO}`,() => {
    console.log(`Server is running on PORT ${PORT_NO}`)
})