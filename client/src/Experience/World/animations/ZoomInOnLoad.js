import * as THREE from 'three'
import gsap from 'gsap'
import Experience from '../../Experience'

export default class ZoomInOnLoad {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.camera = this.experience.camera
		this.controls = this.camera.controls

		// instantiate
	}

	setZoomAction() {
		gsap.to(this.controls, {
			duration: 2,
			ease: 'power2.inOut',
			maxDistance: '5',
		})
		console.log('up')
	}
}
