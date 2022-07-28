import * as THREE from 'three'
import Experience from '../Experience'
import Fragment from './shaders/steam/fragment.glsl'
import Vertex from './shaders/steam/vertex.glsl'

export default class Plane {
	constructor(debugName, planeName, position) {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.time = this.experience.time
		this.position = {
			x: position[0],
			y: position[1],
			z: position[2],
			r: position[3],
		}

		this.planeName = planeName

		// instantiate plane
		this.setPlane()

		//debug
		this.debug = this.experience.debug
		if (this.debug.active) {
			this.debugFolder = this.debug.ui.addFolder(debugName)
		}

		this.setDebug()
	}

	setPlane() {
		this.geometry = new THREE.CylinderGeometry(1.5, 3, 10, 40)
		// this.geometry.parameters.openEnded = true
		console.log(this.geometry.parameters)
		this.geometry.scale(0.01, 0.01, 0.01)

		this.material = new THREE.ShaderMaterial({
			vertexShader: Vertex,
			fragmentShader: Fragment,
			uniforms: {
				uFrequency: { value: new THREE.Vector2(0, 9.4) },
				uTime: { value: 0 },
				uColor: { value: new THREE.Color('orange') },
				uAlpha: { value: 0.24 },

				uSpeedColorChange: { value: 0.003 },
			},

			transparent: true,
		})

		this.plane = new THREE.Mesh(this.geometry, this.material)
		this.plane.position.set(this.position.x, this.position.y, this.position.z)
		this.plane.rotation.y = this.position.r
		this.scene.add(this.plane)
	}

	setDebug() {
		if (this.debug.active) {
			this.debugFolder
				.add(this.plane.position, 'y')
				.min(0)
				.max(10)
				.step(0.1)
				.name('height')
			this.debugFolder
				.add(this.plane.rotation, 'y')
				.min(0)
				.max(10)
				.step(0.1)
				.name('rotation')
			this.debugFolder
				.add(this.plane.position, 'x')
				.min(-10)
				.max(10)
				.step(0.1)
				.name('pos x ')
			this.debugFolder
				.add(this.plane.position, 'z')
				.min(-50)
				.max(50)
				.step(0.1)
				.name('pos z')
			this.debugFolder
				.add(this.material.uniforms.uFrequency.value, 'x')
				.min(0)
				.max(50)
				.step(0.1)
				.name('frequency x')
			this.debugFolder
				.add(this.material.uniforms.uFrequency.value, 'y')
				.min(0)
				.max(50)
				.step(0.1)
				.name('frequency y')
			this.debugFolder
				.add(this.material.uniforms.uAlpha, 'value')
				.min(0)
				.max(1.0)
				.step(0.01)
				.name('uAlpha')
			this.debugFolder
				.add(this.material.uniforms.uSpeedColorChange, 'value')
				.min(0)
				.max(0.01)
				.step(0.0001)
				.name('color speed change')
			if (this.planeName === 'steamCone') {
			}
		}
	}

	update() {
		this.material.uniforms.uTime.value = this.time.elapsed
		// this.plane.rotation.z = -this.time.elapsed * 0.0001
	}
}
