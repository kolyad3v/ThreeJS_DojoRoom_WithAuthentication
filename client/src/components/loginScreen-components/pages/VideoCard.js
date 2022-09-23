import React from 'react'

const VideoCard = ({ videos }) => {
	const { title, duration, description, _id } = videos

	return (
		<div className='card'>
			<div className='card-body'>
				<h4 className='card-title'> {title} </h4>

				<div className='duration'>
					<span>{duration}</span>
				</div>

				<a href={`/${_id}`}>
					<h5>{_id}</h5>
				</a>
				<span> date </span>
				<p className='card-text'>{description}</p>
			</div>
		</div>
	)
}

export default VideoCard
