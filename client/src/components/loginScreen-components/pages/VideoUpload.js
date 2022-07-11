import React, { useState } from 'react'
import { Typography, Button, Form, Input } from 'antd'
import Dropzone from 'react-dropzone'
import axios from 'axios'
import { useAuth } from '../../../context/auth/AuthState'

const { Title } = Typography
const { TextArea } = Input

const Private = [
	{ value: 0, label: 'Private' },
	{ value: 1, label: 'Public' },
]

const Catogory = [
	{ value: 0, label: 'Film & Animation' },
	{ value: 0, label: 'Autos & Vehicles' },
	{ value: 0, label: 'Music' },
	{ value: 0, label: 'Pets & Animals' },
	{ value: 0, label: 'Sports' },
]

const VideoUpload = (props) => {
	const [authState, authDispatch] = useAuth()
	const { student } = authState

	const [title, setTitle] = useState('')
	const [Description, setDescription] = useState('')
	const [privacy, setPrivacy] = useState(0)
	const [Categories, setCategories] = useState('Film & Animation')
	const [FilePath, setFilePath] = useState('')
	const [Duration, setDuration] = useState('')
	const [Thumbnail, setThumbnail] = useState('')

	const handleChangeTitle = (event) => {
		setTitle(event.currentTarget.value)
	}

	const handleChangeDecsription = (event) => {
		console.log(event.currentTarget.value)

		setDescription(event.currentTarget.value)
	}

	const handleChangeOne = (event) => {
		setPrivacy(event.currentTarget.value)
	}

	const handleChangeTwo = (event) => {
		setCategories(event.currentTarget.value)
	}

	const onSubmit = async (event) => {
		event.preventDefault()

		// check if user is logged in first
		// if (user.userData && !user.userData.isAuth) {
		// 	return alert('Please Log in First')
		// }

		if (
			title === ''
			// Description === '' ||
			// Categories === '' ||
			// FilePath === '' ||
			// Duration === ''
			// Thumbnail === ''
		) {
			return alert('Please first fill all the fields')
		}

		const variables = {
			writer: student._id,
			title: title,
			description: Description,
			privacy: privacy,
			filePath: FilePath,
			category: Categories,
			duration: Duration,
			thumbnail: Thumbnail,
		}

		try {
			const res = await axios.post('/api/videoUpload', variables)
			if (res.data.success) {
				return alert('video uploaded')
			}
		} catch (error) {
			console.log(error)
		}
		// axios.post('/api/video/uploadVideo', variables)
		//     .then(response => {
		//         if (response.data.success) {
		//             alert('video Uploaded Successfully')
		//             props.history.push('/')
		//         } else {
		//             alert('Failed to upload video')
		//         }
		//     })
	}

	const onDrop = async (files) => {
		let formData = new FormData()
		const config = {
			header: { 'content-type': 'multipart/form-data' },
		}
		console.log(files)
		formData.append('file', files[0])

		try {
			const res = await axios.post('/api/video', formData, config)
			// console.log(res.data.success)

			console.log(res)
			let variable = {
				filePath: res.data.filePath,
				fileName: res.data.fileName,
			}

			setFilePath(res.data.filePath)
			try {
				const response = await axios.post('/api/videoThumbnail', variable)
				if (response.data.success) {
					console.log(
						response.data.fileDuration,
						response.data.thumbsFilePath,
						`screenshots taken: ${response.data.screenShotsTaken}`
					)
					setDuration(response.data.fileDuration)
					setThumbnail(response.data.thumbsFilePath)
				}
			} catch (error) {
				console.log(error, 'thumbnail error')
			}
		} catch (error) {
			console.log(error)
		}
		// await axios
		// 	.post('/api/video/uploadFiles', formData, config)
		// 	.then((response) => {
		// 		if (response.data.success) {
		// 			console.log(response)
		// 			// let variable = {
		// 			// 	filePath: response.data.filePath,
		// 			// 	fileName: response.data.fileName,
		// 			// }

		// 			// setFilePath(response.data.filePath)

		// 			// //gerenate thumbnail with this filepath !

		// 			// axios.post('/api/video/thumbnail', variable)
		// 			//     .then(response => {
		// 			//         if (response.data.success) {
		// 			//             setDuration(response.data.fileDuration)
		// 			//             setThumbnail(response.data.thumbsFilePath)
		// 			//         } else {
		// 			//             alert('Failed to make the thumbnails');
		// 			//         }
		// 			//     })
		// 		} else {
		// 			console.log('failed to save the video in server')
		// 		}
		// 	})
	}

	// const dropBox = (
	// 	<Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
	// 		{({ getRootProps, getInputProps }) => (
	// 			<div
	// 				style={{
	// 					width: '300px',
	// 					height: '240px',
	// 					border: '1px solid lightgray',
	// 					display: 'flex',
	// 					alignItems: 'center',
	// 					justifyContent: 'center',
	// 				}}
	// 				{...getRootProps()}
	// 			>
	// 				<input {...getInputProps()} />
	// 			</div>
	// 		)}
	// 	</Dropzone>
	// )

	// const thumbRightHere = Thumbnail !== '' && (
	// 	<div>
	// 		<img src={`http://localhost:3000/${Thumbnail}`} alt='haha' />
	// 	</div>
	// )

	return (
		<div className='text-center'>
			<Title level={2}> Upload Video</Title>

			<Form onSubmit={onSubmit}>
				<div className='grid-2'>
					<Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
						{({ getRootProps, getInputProps }) => (
							<div
								style={{
									width: '300px',
									height: '240px',
									border: '1px solid lightgray',
								}}
								{...getRootProps()}
							>
								<input {...getInputProps()} />
							</div>
						)}
					</Dropzone>
					{Thumbnail !== '' && (
						<div>
							<img src={`http://localhost:3000/${Thumbnail}`} alt='haha' />
						</div>
					)}
				</div>

				<br />
				<br />

				<label>Title</label>
				<Input onChange={handleChangeTitle} value={title} />
				<br />
				<br />
				<label>Description</label>
				<TextArea onChange={handleChangeDecsription} value={Description} />
				<br />
				<br />

				<select onChange={handleChangeOne}>
					{Private.map((item, index) => (
						<option key={index} value={item.value}>
							{item.label}
						</option>
					))}
				</select>
				<br />
				<br />

				<select onChange={handleChangeTwo}>
					{Catogory.map((item, index) => (
						<option key={index} value={item.label}>
							{item.label}
						</option>
					))}
				</select>
				<br />
				<br />

				<Button type='primary' size='large' onClick={onSubmit}>
					Submit
				</Button>
			</Form>
		</div>
	)
}

export default VideoUpload
