import * as THREE from 'three'
import Experience from '../Experience'

export default class TextureHelper {
	constructor(resourceName) {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources

		this.resourceName = resourceName
		this.texture = this.resources.items[this.resourceName]
		this.texture.flipY = false
		this.texture.encoding = THREE.sRGBEncoding
		this.readyMateral = new THREE.MeshBasicMaterial({
			map: this.texture,
		})
	}
}
