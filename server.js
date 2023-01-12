const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const port = process.env.PORT || 3000
const indexRouter = require('./routes/index')
const authorRouter = require('./routes/author')

mongoose.connect('mongodb://localhost:27017/mybrary')
.then(()=>console.log('connected to database'))
.catch(err=>console.log(err))
app.use(bodyparser.urlencoded({extended:false}))
app.set('view engine', 'ejs')
app.set('views', 'views')
app.set('layout', 'layouts/layout')
app.use(express.static('public'))
app.use(expressLayouts)
app.use('/',indexRouter)
app.use('/authors', authorRouter)


app.listen(port, ()=>console.log('Listening at port',port))