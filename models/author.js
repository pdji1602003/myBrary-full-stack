const mongoose = require('mongoose')

// create a column to store data
const authorSchema = new mongoose.Schema({
	name:{
		type:String, 
		required:true
	}
})

module.exports = mongoose.model('Author', authorSchema)