
/* process 物件是一个全局变量，提供有关当前 Node.js 进程的信息并对其进行控制 */
// 當process.用戶環境.NODE_ENV不等於 '生產環境'時，載入'dotenv'，並調用config()

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

const express = require('express')
const app = express() // 創建一個基於express.js的application
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')//解析
const path = require('path')


const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const bookRouter = require('./routes/books')


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
app.use('/books', bookRouter)

app.listen(process.env.PORT || 3000)

