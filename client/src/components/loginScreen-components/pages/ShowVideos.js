import React, { useState } from 'react'
import axios from 'axios'
import VideoCard from './VideoCard'
import {
	Container,
	Typography,
	Button,
	TextField,
	Select,
	MenuItem,
} from '@mui/material'

const ShowVideos = () => {
	const [show, setShow] = useState(false)
	const [videoData, setVideoData] = useState([])

	const onclick = async () => {
		if (show) {
			setShow(!show)
		} else {
			try {
				const response = await axios.get('./api/video/getVideos')
				console.log(response.data, 'response data')
				setVideoData(response.data)
			} catch (error) {
				console.log(error)
			}
			setShow(!show)
		}
	}

	// console.log(displayVideos)
	// const displayVideos = videoData.map((videos, index) => (
	// 	<VideoCard key={videos._id} videos={videos} />
	// ))

	const displayVideos = (
		<video id='videoPlayer' width='650' controls muted='muted'>
			<source src='api/video/mongo-video' type='video/mp4' />
		</video>
	)
	// console.log(videoData, 'state data')

	return (
		<Container maxWidth='lg'>
			<Button
				variant='contained'
				sx={{ backgroundColor: 'black' }}
				onClick={onclick}
			>
				Open Archive
			</Button>
			<hr />
			<div className='grid-3 text-center'> {show ? displayVideos : null} </div>
		</Container>
	)
}

export default ShowVideos
