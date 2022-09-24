import React, { Fragment, useState, useEffect } from 'react'
import VideoUpload from './VideoUpload.js'
import ShowVideos from './ShowVideos'

import Experience from '../../../Experience/Experience.js'
const Home = () => {
	// eslint-disable-next-line
	const experience = new Experience(document.querySelector('canvas.webgl'))

	const form = (
		<Fragment>
			<VideoUpload />
		</Fragment>
	)

	return (
		<div id='videoForm' className='hide'>
			<div className='grid-2 text-center vidUpload'>{form}</div>
			<ShowVideos />
		</div>
	)
}

export default Home
