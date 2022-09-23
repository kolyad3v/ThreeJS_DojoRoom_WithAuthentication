const express = require('express')
const router = express.Router()
const multer = require('multer')
const auth = require('../middleware/auth.js')
const fs = require('fs')

const mongodb = require('mongodb')
const url =
	'mongodb+srv://danaherDisciple:oWlOqzFoFjR0Cd0f@jutsu.izginib.mongodb.net/?retryWrites=true&w=majority'

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
router.post('/', auth, async (req, res) => {
	upload(req, res, (err) => {
		if (err) {
			return res.json({ success: false, err })
		}
		mongodb.MongoClient.connect(url, function (error, client) {
			if (error) {
				res.json(error)
				return
			}
			// connect to the videos database
			const db = client.db('videos')

			// Create GridFS bucket to upload a large file
			const bucket = new mongodb.GridFSBucket(db)

			// create upload stream using GridFS bucket
			const videoUploadStream = bucket.openUploadStream('footage')

			// You can put your file instead of bigbuck.mp4
			const videoReadStream = fs.createReadStream(res.req.file.path)

			// Finally Upload!
			videoReadStream.pipe(videoUploadStream)

			// All done!
			res.status(200).json({
				success: true,
				filePath: res.req.file.path,
				fileName: res.req.file.filename,
				student: req.student.id,
			})
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

router.get('/mongo-video', function (req, res) {
	mongodb.MongoClient.connect(url, function (error, client) {
		if (error) {
			res.status(500).json(error)
			return
		}

		// Check for range headers to find our start time
		const range = req.headers.range
		if (!range) {
			res.status(400).send('Requires Range header')
		}

		const db = client.db('videos')
		// GridFS Collection
		db.collection('fs.files').findOne({}, (err, video) => {
			if (!video) {
				res.status(404).send('No video uploaded!')
				return
			}
			const { length } = video
			console.log(video)
			// Create response headers
			const videoSize = video.length
			console.log(videoSize)
			console.log(range)
			const start = Number(range.replace(/\D/g, ''))
			const end = videoSize - 1

			const contentLength = end - start + 1
			const headers = {
				'Content-Range': `bytes ${start}-${end}/${videoSize}`,
				'Accept-Ranges': 'bytes',
				'Content-Length': contentLength,
				'Content-Type': 'video/mp4',
			}

			// HTTP Status 206 for Partial Content
			res.writeHead(206, headers)

			// Get the bucket and download stream from GridFS
			const bucket = new mongodb.GridFSBucket(db)
			const downloadStream = bucket.openDownloadStreamByName('footage', {
				start,
				end: length,
			})

			// Finally pipe video to response
			downloadStream.pipe(res)
		})
	})
})

module.exports = router
