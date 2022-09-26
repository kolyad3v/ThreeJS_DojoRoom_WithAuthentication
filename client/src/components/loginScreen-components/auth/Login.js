import React, { useState, useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { Box, TextField, Button } from '@mui/material'

import AlertContext from '../../../context/alert/alertContext'
import {
	useAuth,
	clearErrors,
	loginStudent,
} from '../../../context/auth/AuthState'

const Login = () => {
	const alertContext = useContext(AlertContext)
	const { setAlert } = alertContext

	const [authState, authDispatch] = useAuth()
	const { error, isAuthenticated } = authState

	useEffect(() => {
		if (error === 'Invalid Credentials') {
			setAlert(error, 'danger')
			clearErrors(authDispatch)
		}
	}, [error, setAlert, authDispatch])

	const [student, setStudent] = useState({
		email: '',
		password: '',
	})

	const { email, password } = student

	const onChange = (e) => {
		setStudent({
			...student,
			[e.target.name]: e.target.value,
		})
	}

	const onSubmit = (e) => {
		e.preventDefault()
		if (email === '' || password === '') {
			setAlert('Please enter all fields', 'danger')
		} else {
			loginStudent(authDispatch, {
				email,
				password,
			})
		}
	}
	// eventually I will want it to take us straight to experience, but some reason I cannot access AuthContext in experience to run loadPlayer, meaning if the user refreshes the page it doesn't keep them logged in. A bug to fix.

	// if (isAuthenticated) return <Navigate to='/experience' />

	// taking us to the home page for now to sort out logout function.
	if (isAuthenticated) return <Navigate to='/' />

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
			<Button
				variant='contained'
				margin='normal'
				onClick={onSubmit}
				sx={{ backgroundColor: 'black' }}
			>
				Log In
			</Button>
			{/* <div className='form-group'>
					<label htmlFor='email'> Email</label>
					<input type='email' name='email' value={email} onChange={onChange} />
					<label htmlFor='password'> Password</label>
					<input
						type='password'
						name='password'
						value={password}
						onChange={onChange}
					/>
				</div>
				<input type='submit' value='Login' className='btn btn-primary btn-block' />
			</form> */}
		</Box>
	)
}

export default Login
