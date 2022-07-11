import React, { useState } from 'react'
import axios from 'axios'
import VideoCard from './VideoCard'

const ShowVideos = () => {
	const [show, setShow] = useState(false)
	const [videoData, setVideoData] = useState([])

	// let getData = async () => {
	// 	try {
	// 		const response = await axios.get('./api/video/getVideos')
	// 		console.log(response.data, 'response data')
	// 		setVideoData(response.data)
	// 	} catch (error) {
	// 		console.log(error)
	// 	}
	// }
	// useEffect(() => {
	// 	// getData()
	// }, [])

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
	const displayVideos = videoData.map((videos, index) => (
		<VideoCard key={videos._id} videos={videos} />
	))
	console.log(videoData, 'state data')

	return (
		<div>
			<button className='btn btn-primary' onClick={onclick}>
				showVideos
			</button>
			<hr />
			<div className='grid-3 text-center'> {show ? displayVideos : null} </div>
		</div>
	)
}

export default ShowVideos
