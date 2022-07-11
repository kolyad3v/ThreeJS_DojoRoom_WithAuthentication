const express = require('express')
const router = express.Router()
const Video = require('../models/Video')

// @route       POST api/videoUpload
// @desc        submit a video to db
// @access      private ( to sort out eventually)
router.post('/', async (req, res) => {
	console.log('post to video upload')

	const video = new Video(req.body)

	try {
		await video.save()
		res.status(200).json({
			success: true,
		})
	} catch (error) {
		console.log(error)
	}
})

module.exports = router
