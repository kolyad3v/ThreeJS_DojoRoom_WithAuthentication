import React, { Fragment } from 'react'
import VideoUpload from './VideoUpload.js'
import ShowVideos from './ShowVideos'
import ProfileDetails from './ProfileDetails'
import Experience from '../../../Experience/Experience.js'
const Home = () => {
	// eslint-disable-next-line
	// const experience = new Experience(document.querySelector('canvas.webgl'))

	const stats = (
		<Fragment>
			<VideoUpload />
			<ProfileDetails />
		</Fragment>
	)

	return (
		<>
			<div className='grid-2 text-center'>{stats}</div>
			<ShowVideos />
		</>
	)
}

export default Home
