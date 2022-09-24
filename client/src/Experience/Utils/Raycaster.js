import * as THREE from 'three'
import Experience from '../Experience'
import EventEmitter from './EventEmitter'

export default class Raycaster extends EventEmitter {
	constructor(sceneResource, camPos) {
		super()

		this.experience = new Experience()
		this.camera = this.experience.camera.instance
		// this.resources = this.experience.resources
		// this.resource = this.resources.items.Greyfield
		this.resource = sceneResource
		this.cameraPosition = camPos
		// for use with mouse targeting
		this.sizes = this.experience.sizes
		this.mouse = new THREE.Vector2()

		// interactions
		this.webglStyle = document.querySelector('.webgl').style
		this.tapeHovered = false
		this.chestHovered = false
		this.gongHovered = false
		this.templeSymbolHovered = false
		this.grabOpen = true

		// React Components Show/Hide
		this.videoForm = document.getElementById('videoForm')
		// create Raycaster
		this.createRaycaster()

		// create event listeners
	}

	createRaycaster() {
		// this.rayOrigin = this.camera.controls.getObject().position
		this.rayOrigin = this.cameraPosition
		this.rayDirection = new THREE.Vector3(0, 0, 1)
		this.rayDirection.normalize()

		this.raycaster = new THREE.Raycaster(
			this.rayOrigin,
			this.rayDirection,
			0,
			100
		)

		// for use with mouse targeting
		window.addEventListener('mousemove', (e) => {
			this.mouse.x = (e.clientX / this.sizes.width) * 2 - 1
			this.mouse.y = -(e.clientY / this.sizes.height) * 2 + 1
			// lol the pointer lock is locking the mouse at one coord on screen!
			this.trigger('mousemoved')
		})

		// interactions
		// do the same for other objects when ready -->
		document.querySelector('.webgl').addEventListener('click', () => {
			this.tapeHovered
				? this.videoForm.classList.remove('hide')
				: this.videoForm.classList.add('hide')
		})

		document.querySelector('.webgl').addEventListener('mousedown', () => {
			this.grabOpen = false
			this.webglStyle.cursor = 'grabbing'
		})
		document.querySelector('.webgl').addEventListener('mouseup', () => {
			this.grabOpen = true
		})
	}

	// showNotice(board) {
	// 	switch (board) {
	// 		case 'stonesBoard':
	// 			this.showSign = true
	// 			this.infoBox.classList.add('visible')
	// 			this.infoBox.innerHTML = 'Some weird alien rocks...'
	// 			console.log('added visible')
	// 			break

	// 		default:
	// 			break
	// 	}

	// 	setTimeout(() => {

	// 	}, 4000)
	// }

	update() {
		this.raycaster.setFromCamera(this.mouse, this.camera)
		this.intersectObjects = this.raycaster.intersectObjects(
			this.resource.scene.children
		)

		if (this.intersectObjects.length) {
			this.distanceToObject = this.intersectObjects[0].object
			switch (this.distanceToObject.name) {
				case 'merged_tape':
					this.webglStyle.cursor = 'pointer'
					this.tapeHovered = true
					break
				case 'merged_chest':
					this.webglStyle.cursor = 'pointer'
					this.chestHovered = true
					break
				case 'merged_gong':
					this.webglStyle.cursor = 'pointer'
					this.gongHovered = true
					break
				case 'merged_temple_symbol':
					this.webglStyle.cursor = 'pointer'
					this.templeSymbolHovered = true
					break
				case 'merged_dojo':
					this.tapeHovered = false
					this.tapeHovered = false
					this.chestHovered = false
					this.gongHovered = false
					this.templeSymbolHovered = false

					this.grabOpen && (this.webglStyle.cursor = 'grab')

					break
				default:
					break
			}
		}
	}
}
