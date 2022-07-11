const mongoose = require('mongoose')
const Schema = mongoose.Schema

const VideoSchema = mongoose.Schema(
	{
		writer: {
			type: Schema.Types.ObjectId,
			ref: 'user',
		},
		title: {
			type: String,
			required: true,
			maxlength: 50,
		},
		description: {
			type: String,
		},
		privacy: {
			type: Number,
		},
		filePath: {
			type: String,
		},
		category: {
			type: String,
		},
		views: {
			type: Number,
			default: 0,
		},
		duration: {
			type: String,
		},
		thumbnail: {
			type: String,
		},
	},
	{ timestamp: true }
)

module.exports = mongoose.model('video', VideoSchema)
