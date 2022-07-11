import React, { useContext } from 'react'
import { useAuth } from '../../../context/auth/AuthState'

const ProfileDetails = () => {
	const [authState, authDispatch] = useAuth()
	const { student } = authState
	return (
		<div>
			<p>belt: {student && student.belt}</p>
			<p>club: {student && student.club}</p>
		</div>
	)
}

export default ProfileDetails
