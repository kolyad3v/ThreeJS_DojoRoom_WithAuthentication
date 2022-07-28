import Experience from '../Experience.js'
import Environment from './Environment.js'

import Room from './Room.js'

export default class World {
	constructor() {
		this.experience = new Experience()
		this.renderer = this.experience.renderer

		this.resources = this.experience.resources

		// Wait for resources
		this.resources.on('ready', () => {
			// Setup

			this.room = new Room()
			this.environment = new Environment()
		})
	}

	update() {
		if (this.room) {
			this.room.update()
		}
	}
}
