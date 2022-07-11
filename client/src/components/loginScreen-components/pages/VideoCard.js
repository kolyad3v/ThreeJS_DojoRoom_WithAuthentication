import React from 'react'

const VideoCard = ({ videos }) => {
	const { title, duration, description, thumbnail, _id } = videos

	return (
		<div className='card'>
			<div className='card-body'>
				<h5 className='card-title'> {title} </h5>

				<div className='duration'>
					<span>{duration}</span>
				</div>

				<a href={`/${_id}`}>
					<img src={`http://localhost:5000/${thumbnail}`} alt='thumbnail' />
				</a>
				<span> date </span>
				<p className='card-text'>{description}</p>
			</div>
		</div>
	)
}

export default VideoCard
