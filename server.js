if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const path = require('path')


const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')

app.set('view engine', 'ejs')//setting view engine
app.set('views', path.join(__dirname,'/views')) //views to keep all the different views of our files for our server 
app.set('layout', 'layouts/layout') // to keep all the layout files to prevent duplicate, e.g., header & footer
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
	limit: '10mb',
	extended: false
})
)

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.use('/', indexRouter)
app.use('/authors', authorRouter)

app.listen(process.env.PORT || 3000)

