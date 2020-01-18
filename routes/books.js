const express = require('express')
const router = express.Router()
const Book = require('../models/book')
const Author = require('../models/author')

// All books route
router.get('/', (req, res) => {
	res.send('All books')
})


// New book route
router.get('/new', async (req, res) => {
	try{
		const authors = await Author.find({})
		const book = new Book()
		res.render('books/new', {
			authors:authors, 
			book:book
		} )
	} catch{
		res.redirect('/books')
	}
})

// Create book route
router.post('/', async (req, res) => {
	const book = {
		title:req.body.title,
		author:req.body.author,
		publishDate:new Date(req.body.publishDate),// use new Date()function to convert publishDate string
		pageCount:req.body.pageCount,
		description:req.body.description
	}
})



module.exports = router