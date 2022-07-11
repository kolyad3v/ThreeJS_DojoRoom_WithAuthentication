const express = require('express')
const router = express.Router()
const multer = require('multer')
const ffmpeg = require('fluent-ffmpeg')

// const storage = multer.diskStorage({
// 	destination: function (req, file, cb) {
// 		cb(null, 'uploads/')
// 	},
// 	filename: function (req, file, cb) {
// 		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
// 		cb(null, file.fieldname + '-' + uniqueSuffix)
// 	},
// 	fileFilter: (req, file, cb) => {
// 		const ext = path.extname(file.originalname)
// 		if (ext !== '.mp4') {
// 			return cb(res.status(400).end('only mp4 is allowed'), false)
// 		}
// 		cb(null, true)
// 	},
// })

// const upload = multer({ storage: storage }).single('file')

// @route       POST api/video
// @desc        upload a video
// @access      private
router.post('/', async (req, res) => {
	console.log('post to videoThumbnail')
	// console.log(req)
	// upload(req, res, (err) => {
	// 	if (err) {
	// 		return res.json({ success: false, err })
	// 	}
	// 	return res.json({
	// 		success: true,
	// 		filePath: res.req.file.path,
	// 		fileName: res.req.file.filename,
	// 	})
	// })

	let thumbsFilePath = ''
	let fileDuration = ''

	ffmpeg.ffprobe(req.body.filePath, function (err, metadata) {
		console.dir(metadata)
		console.log(metadata.format.duration)
		fileDuration = metadata.format.duration
	})

	ffmpeg(req.body.filePath)
		.on('filenames', function (filenames) {
			console.log('Will generate ' + filenames.join(', '))
			thumbsFilePath = './uploads/thumbnails/' + filenames[0]
		})
		.on('end', function () {
			console.log('Screenshots taken')
			return res.json({
				success: true,
				thumbsFilePath: thumbsFilePath,
				fileDuration: fileDuration,
			})
		})
		.screenshots({
			// Will take screens at 20%, 40%, 60% and 80% of the video
			count: 3,
			folder: './client/public/uploads/thumbnails',
			size: '320x250',
			filename: 'thumbnail-%b.png',
		})
})

module.exports = router
