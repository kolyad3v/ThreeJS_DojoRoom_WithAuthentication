import React, { useState, useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom'

import AlertContext from '../../../context/alert/alertContext'

import { useAuth, clearErrors, register } from '../../../context/auth/AuthState'
import { Box, TextField } from '@mui/material'
import {
	Container,
	Typography,
	Button,
	Select,
	MenuItem,
	InputLabel,
} from '@mui/material'

const Register = (props) => {
	const alertContext = useContext(AlertContext)
	const { setAlert } = alertContext

	const [authState, authDispatch] = useAuth()
	const { error, isAuthenticated } = authState

	useEffect(() => {
		if (error === 'Email already exists') {
			setAlert(error, 'danger')
			clearErrors()
		}
		// eslint-disable-next-line
	}, [error, isAuthenticated, props.history, setAlert, authDispatch])

	const [student, setStudent] = useState({
		name: '',
		email: '',
		belt: '',
		club: '',
		password: '',
		password2: '',
	})

	const { name, email, belt, club, password, password2 } = student

	const onChange = (e) => {
		setStudent({
			...student,
			[e.target.name]: e.target.value,
		})
	}

	const onSubmit = (e) => {
		e.preventDefault()
		if (name === '' || email === '' || password === '') {
			setAlert('Please enter all fields', 'danger')
		} else if (password !== password2) {
			setAlert('Paswords do not match', 'danger')
		} else {
			register(authDispatch, {
				name,
				email,
				belt,
				club,
				password,
			})
		}
	}

	if (isAuthenticated) return <Navigate to='/' />

	// eventually I will want it to take us straight to experience, but some reason I cannot access AuthContext in experience to run loadstudent, meaning if the user refreshes the page it doesn't keep them logged in. A bug to fix.
	// if (isAuthenticated) return <Navigate to='/experience' />

	return (
		<Box
			sx={{
				margin: 'auto',
				width: '50vw',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
			}}
		>
			<TextField
				id='name'
				label='Name'
				variant='filled'
				required
				placeholder='Name'
				value={name}
				onChange={onChange}
				margin='normal'
				name='name'
			/>
			<TextField
				id='email'
				label='Email'
				variant='filled'
				required
				placeholder='Email'
				value={email}
				onChange={onChange}
				margin='normal'
				name='email'
			/>
			<TextField
				id='belt'
				label='Belt'
				variant='filled'
				required
				placeholder='Belt'
				value={belt}
				onChange={onChange}
				margin='normal'
				name='belt'
			/>
			<TextField
				id='club'
				label='club'
				variant='filled'
				required
				placeholder='club'
				value={club}
				onChange={onChange}
				margin='normal'
				name='club'
			/>

			<TextField
				id='password'
				label='Password'
				variant='filled'
				required
				type={'password'}
				placeholder='Password'
				value={password}
				onChange={onChange}
				margin='normal'
				name='password'
			/>
			<TextField
				id='password2'
				label='Password'
				variant='filled'
				required
				type={'password'}
				placeholder='Confirm Password'
				value={password2}
				onChange={onChange}
				margin='normal'
				minLength={6}
				name='password2'
			/>
			<Button
				variant='contained'
				margin='normal'
				onClick={onSubmit}
				sx={{ backgroundColor: 'black' }}
			>
				Register
			</Button>
		</Box>
	)
}

export default Register
