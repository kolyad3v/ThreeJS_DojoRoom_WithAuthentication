import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useAuth, logoutStudent } from '../../../context/auth/AuthState'
import { Stack, Grid } from '@mui/material'
import Icon from '@mui/material/Icon'

const Navbar = () => {
	const [authState, authDispatch] = useAuth()
	const { student, isAuthenticated } = authState

	const onLogout = () => {
		logoutStudent(authDispatch)
	}
	console.log(student)

	const authLinks = (
		<Grid container>
			<Grid item xs={1}></Grid>
			<Grid item xs={10}>
				<h3>Hello {student && student.name}.</h3>
			</Grid>

			<Grid item xs={1} sx={{}}>
				<Icon fontSize='small' sx={{ cursor: 'pointer' }} onClick={onLogout}>
					logout
				</Icon>
			</Grid>
		</Grid>
	)

	const guestLinks = (
		<>
			<Link to='/register'>Register</Link>

			<Link to='/login'>Login</Link>

			<Link to='/about'>About</Link>
		</>
	)

	return (
		<Stack
			direction='row'
			alignItems='center'
			p={1}
			sx={{
				color: 'white',
				position: 'sticky',
				background: '#0a1929b7',
				top: 0,
				justifyContent: 'space-around',
				transition: '0.5s ease',

				'&:hover': {
					background: '#0a1929',
				},
			}}
		>
			{isAuthenticated ? authLinks : guestLinks}
		</Stack>
	)
}

Navbar.propTypes = {
	title: PropTypes.string.isRequired,
}

Navbar.defaultProps = {
	title: '',
}

export default Navbar
