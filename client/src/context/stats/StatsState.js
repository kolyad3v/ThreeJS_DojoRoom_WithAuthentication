import React, { useReducer } from 'react'
import axios from 'axios'
import StatsContext from './statsContext'
import statsReducer from './statsReducer'

import {} from '../types'

const StatsState = (props) => {
	const initialState = {
		health: 90,
		energy: 100,
		agility: 10,
		strength: 10,
		intellect: 10,
	}

	const [state, dispatch] = useReducer(statsReducer, initialState)

	return (
		<StatsContext.Provider
			value={{
				health: state.health,
				energy: state.energy,
				agility: state.agility,
				strength: state.strength,
				intellect: state.intellect,
			}}
		>
			{props.children}
		</StatsContext.Provider>
	)
}

export default StatsState
