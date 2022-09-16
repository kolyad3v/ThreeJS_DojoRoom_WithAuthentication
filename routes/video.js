const express = require('express')
const router = express.Router()
const multer = require('multer')
const auth = require('../middleware/auth.js')

// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
// const config = require('config')
// const { check, validationResult } = require('express-validator')
const Video = require('../models/Video')

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/')
	},
	filename: function (req, file, cb) {
		// const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
		cb(null, file.originalname)
	},
	fileFilter: (req, file, cb) => {
		const ext = path.extname(file.originalname)
		if (ext !== '.mp4') {
			return cb(res.status(400).end('only mp4 is allowed'), false)
		}
		cb(null, true)
	},
})

const upload = multer({ storage: storage }).single('file')

// @route       POST api/video
// @desc        upload a video
// @access      private
router.post('/', async (req, res) => {
	upload(req, res, (err) => {
		console.log(req, 'data in upload')
		if (err) {
			return res.json({ success: false, err })
		}
		return res.json({
			success: true,
			filePath: res.req.file.path,
			fileName: res.req.file.filename,
		})
	})
})

// @route       GET api/video
// @desc        fetch all videos for a student
// @access      private
router.get('/getVideos', auth, async (req, res) => {
	try {
		let videos = await Video.find({ writer: req.student.id })

		res.json(videos)
	} catch (error) {
		console.error(error.message)
		res.status(500).send('server error')
	}
})

// @route       POST api/video
// @desc        fetch A video for a student
// @access      private
router.post('/getVideo', auth, async (req, res) => {
	const { videoId } = req.body
	try {
		let video = await Video.findOne({ _id: videoId })

		res.status(200).json({ success: true, video })
	} catch (error) {
		console.error(error.message)
		res.status(500).send('server error')
	}
})

module.exports = router
