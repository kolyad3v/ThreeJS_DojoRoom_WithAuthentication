import React, { useState } from 'react'

import Dropzone from 'react-dropzone'
import axios from 'axios'
import { useAuth } from '../../../context/auth/AuthState'
import Icon from '@mui/material/Icon'
import {
	Container,
	Typography,
	Button,
	TextField,
	Select,
	MenuItem,
	InputLabel,
	Grid,
} from '@mui/material'

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
	const [authState] = useAuth()
	const { student } = authState

	const [title, setTitle] = useState('')
	const [Description, setDescription] = useState('')
	const [privacy, setPrivacy] = useState('Private')
	const [Categories, setCategories] = useState('Film & Animation')
	const [FilePath, setFilePath] = useState('')
	const [Duration, setDuration] = useState('')

	const handleChangeTitle = (event) => {
		setTitle(event.currentTarget.value)
	}

	const handleChangeDecsription = (event) => {
		setDescription(event.currentTarget.value)
	}

	const handleChangeOne = (event) => {
		setPrivacy(event.target.value)
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
		console.log(formData)
		try {
			const res = await axios.post('/api/video', formData, config)
			// console.log(res.data.success)

			console.log(res)

			setFilePath(res.data.filePath)
		} catch (error) {
			console.log(error)
		}
	}
	let videoForm = document.getElementById('videoForm')
	const hide = () => {
		videoForm.classList.add('hide')
	}

	return (
		<Container
			maxWidth='sm'
			sx={{
				background: '#fff',
				borderRadius: '5px',
				height: 'auto',
				padding: '20px',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				marginTop: '20px',
			}}
		>
			<Grid container spacing={2}>
				<Grid item xs={11}>
					<Typography variant='h4' component='h2'>
						UploadVideo
					</Typography>
				</Grid>
				<Grid item xs={1}>
					<Icon color='error' sx={{ cursor: 'pointer' }} onClick={hide}>
						close
					</Icon>
				</Grid>
			</Grid>
			<Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
				{({ getRootProps, getInputProps }) => (
					<div
						style={{
							marginLeft: 'auto',
							marginRight: 'auto',
							width: '100px',
							height: '100px',
							border: '1px solid lightgray',
							cursor: 'pointer',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
						{...getRootProps()}
					>
						<Icon>add</Icon>
						<input {...getInputProps()} />
					</div>
				)}
			</Dropzone>

			<TextField
				label='Title'
				variant='outlined'
				onChange={handleChangeTitle}
				value={title}
				fullWidth
				margin='normal'
			/>
			{/* <InputLabel id='Category'>Category</InputLabel>
			<Select
				labelId='Category'
				id=''
				label='Category'
				onChange={handleChangeOne}
				margin='normal'
				value={Categories}
			>
				<MenuItem value={10}>Ten</MenuItem>
				<MenuItem value={20}>Twenty</MenuItem>
				<MenuItem value={30}>Thirty</MenuItem>
			</Select> */}
			<InputLabel id='Privacy'>Privacy</InputLabel>

			<Select
				labelId='Privacy'
				id=''
				label='Privacy'
				value={privacy}
				onChange={handleChangeOne}
			>
				<MenuItem value='Private'>Private</MenuItem>
				<MenuItem value='Public'>Public</MenuItem>
			</Select>

			<TextField
				id='outlined-basic'
				label='Description'
				variant='outlined'
				onChange={handleChangeDecsription}
				value={Description}
				multiline
				fullWidth
				minRows={3}
				margin='dense'
			/>

			<Button
				variant='contained'
				sx={{ backgroundColor: 'black' }}
				onClick={onSubmit}
			>
				Submit
			</Button>
		</Container>
	)
}

export default VideoUpload
