import * as THREE from 'three'
import Experience from '../Experience'

export default class Fog {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.debug = this.experience.debug

		this.fog = new THREE.Fog('#f8a659', 4.5, 15.897)
		this.scene.fog = this.fog

		if (this.debug.active) {
			this.debugFolder = this.debug.ui.addFolder('Fog')
		}

		this.debugObject = {
			fogColor: '#262837',
		}

		this.setDebug()
	}

	setDebug() {
		if (this.debug.active) {
			this.debugFolder
				.add(this.fog, 'near')
				.name('near')
				.min(-50)
				.max(50)
				.step(0.001)
			this.debugFolder
				.add(this.fog, 'far')
				.name('far')
				.min(-50)
				.max(50)
				.step(0.001)
			this.debugFolder.addColor(this.debugObject, 'fogColor').onChange(() => {
				this.fog.color.set(this.debugObject.fogColor)
			})
		}
	}
}
