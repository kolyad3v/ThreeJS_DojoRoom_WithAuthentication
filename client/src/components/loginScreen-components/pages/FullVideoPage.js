import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const FullVideoPage = () => {
	let videoId = window.location.pathname
	videoId = videoId.substring(1, videoId.length)

	const videoVariable = {
		videoId,
	}

	const [video, setVideo] = useState([])

	let getVideo = async () => {
		try {
			const res = await axios.post('./api/video/getVideo', videoVariable)
			console.log(res.data)
			setVideo(res.data.video)
		} catch (error) {
			console.log(error, 'failed to get vid info')
		}
	}
	useEffect(() => {
		getVideo()
	}, [])

	return (
		<Fragment>
			<div className='container' style={{ border: 'dotted 1px black' }}>
				<Link to='/'>back to Home</Link>

				<div className='row'>
					<div className='col-sm-4'></div>
					<div className='col-sm'>{video.title}</div>
					<div className='col-sm-4'></div>
				</div>
				<div className='row'>
					<div className='col-sm-12'>
						<video
							style={{ width: '100%' }}
							src={`http://localhost:5000/${video.filePath}`}
							controls
							type='video/mp4'
						></video>
					</div>
				</div>
				<div className='row'>
					<div className='col-sm'>{video.description}</div>
					<div className='col-sm'>Views: {video.views}</div>
				</div>
			</div>
		</Fragment>
	)
}

export default FullVideoPage
