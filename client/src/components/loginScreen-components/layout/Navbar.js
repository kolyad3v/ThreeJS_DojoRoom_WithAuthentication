import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { useAuth, logoutStudent } from '../../../context/auth/AuthState'

const Navbar = ({ title }) => {
	const [authState, authDispatch] = useAuth()
	const { student, isAuthenticated } = authState

	const onLogout = () => {
		logoutStudent(authDispatch)
	}
	console.log(student)

	const authLinks = (
		<Fragment>
			<li>Hello {student && student.name}</li>
			<li>
				<a href='#!' onClick={onLogout}>
					Logout
				</a>
			</li>
		</Fragment>
	)

	const guestLinks = (
		<Fragment>
			<li>
				<Link to='/register'>Register</Link>
			</li>
			<li>
				<Link to='/login'>Login</Link>
			</li>
			<li>
				<Link to='/about'>About</Link>
			</li>
		</Fragment>
	)

	return (
		<div className='navbar '>
			<h1>{title}</h1>
			<ul>{isAuthenticated ? authLinks : guestLinks}</ul>
		</div>
	)
}

Navbar.propTypes = {
	title: PropTypes.string.isRequired,
}

Navbar.defaultProps = {
	title: '',
}

export default Navbar
