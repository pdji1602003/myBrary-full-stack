const express = require('express')
const router = express.Router()

//create our route
router.get('/', (req, res) => {
	res.render('index')
})

module.exports = router