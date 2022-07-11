const express = require('express')
const connectDB = require('./config/db')
const path = require('path')
const app = express()

// Connect Database
connectDB()

//init middleware
app.use(express.json({ extended: false }))

//Define routes
app.use('/api/student', require('./routes/student'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/items', require('./routes/items'))

// create a route to make the post request to with the video from the client
app.use('/api/video', require('./routes/video'))
app.use('/api/videoThumbnail', require('./routes/videoThumbnail'))
app.use('/api/videoUpload', require('./routes/videoUpload'))

//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use('/uploads', express.static('uploads'))

// serve static assets in production
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'))

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	})
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`server started on ${PORT}`))
