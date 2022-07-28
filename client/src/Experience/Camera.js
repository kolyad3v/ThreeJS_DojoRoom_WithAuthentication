import * as THREE from 'three'
import Experience from './Experience.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class Camera {
	constructor() {
		this.experience = new Experience()
		this.sizes = this.experience.sizes
		this.scene = this.experience.scene
		this.canvas = this.experience.canvas
		this.debug = this.experience.debug

		if (this.debug.active) {
			this.debugFolder = this.debug.ui.addFolder('camera')
		}
		this.setInstance()
		this.setControls()
		this.setDebug()
	}

	setInstance() {
		this.instance = new THREE.PerspectiveCamera(
			35,
			this.sizes.width / this.sizes.height,
			0.1,
			100
		)
		this.instance.position.set(
			6.190935282316349,
			3.2890320479732775,
			7.512166971887763
		)
		this.scene.add(this.instance)
	}

	setControls() {
		this.controls = new OrbitControls(this.instance, this.canvas)
		this.controls.enableDamping = true
		// this.controls.dampingFactor = 0.5 not quite sure what this does, trying to slow the damping down. lets try:
		// that's the one.
		this.controls.rotateSpeed = 0.2

		// set the degree to which you can orbit around a target. must be between max 2pi and min -2pi.
		this.controls.maxAzimuthAngle = 1.75
		this.controls.minAzimuthAngle = -0.1
		// amount of possible dollying out.
		this.controls.maxDistance = 10
		// how far to orbit vertically, default pi radians, max is pi.
		this.controls.maxPolarAngle = Math.PI / 2
		this.controls.minPolarAngle = Math.PI / 4

		this.controls.enablePan = false
		// sets the target of what the camera orbits around
		this.controls.target = new THREE.Vector3(0, 1, 0)
	}

	setDebug() {
		if (this.debug.active) {
			this.debugFolder.add(this.controls, 'enablePan')
			this.debugFolder
				.add(this.controls, 'maxAzimuthAngle')
				.min(0)
				.max(2)
				.step(0.1)
				.name('maxAzimuthAngle')
			this.debugFolder
				.add(this.controls, 'minAzimuthAngle')
				.min(-2)
				.max(0)
				.step(0.1)
				.name('minAzimuthAngle')
			this.debugFolder
				.add(this.controls, 'maxDistance')
				.min(4)
				.max(10)
				.step(0.1)
				.name('maxDistance')
		}
	}
	resize() {
		this.instance.aspect = this.sizes.width / this.sizes.height
		this.instance.updateProjectionMatrix()
	}

	//
	update() {
		this.controls.update()
		// console.log(this.controls.target)
		// console.log(this.instance.position)
	}
}
