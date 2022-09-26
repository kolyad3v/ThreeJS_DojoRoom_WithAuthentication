import React from 'react'
import VideoUpload from './VideoUpload.js'
import ShowVideos from './ShowVideos'

import Experience from '../../../Experience/Experience.js'
const Home = () => {
	// eslint-disable-next-line
	const experience = new Experience(document.querySelector('canvas.webgl'))

	return (
		<div id='videoForm' className='hide container'>
			<VideoUpload />
			<ShowVideos />
		</div>
	)
}

export default Home
