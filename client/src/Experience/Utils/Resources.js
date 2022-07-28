import * as THREE from 'three'
import Experience from '../Experience'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import EventEmitter from './EventEmitter.js'
import LoadingScreen from './LoadingScreen.js'
export default class Resources extends EventEmitter {
	constructor(sources) {
		super()
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.sources = sources

		this.loadingScreen = new LoadingScreen()
		this.loadingScreen.addLoadScreen()

		this.items = {}
		this.toLoad = this.sources.length
		this.loaded = 0

		this.setLoaders()
		this.startLoading()
	}

	setLoaders() {
		this.loaders = {}
		this.loaders.dracoLoader = new DRACOLoader(this.loadingScreen.loadingManager)
		this.loaders.dracoLoader.setDecoderPath('/static/draco/')
		this.loaders.gltfLoader = new GLTFLoader(this.loadingScreen.loadingManager)
		this.loaders.gltfLoader.dracoLoader = this.loaders.dracoLoader
		this.loaders.textureLoader = new THREE.TextureLoader(
			this.loadingScreen.loadingManager
		)
		this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader(
			this.loadingScreen.loadingManager
		)
	}

	startLoading() {
		// Load each source
		for (const source of this.sources) {
			if (source.type === 'gltfModel') {
				this.loaders.gltfLoader.load(source.path, (file) => {
					this.sourceLoaded(source, file)
				})
			} else if (source.type === 'texture') {
				this.loaders.textureLoader.load(source.path, (file) => {
					this.sourceLoaded(source, file)
				})
			} else if (source.type === 'cubeTexture') {
				this.loaders.cubeTextureLoader.load(source.path, (file) => {
					this.sourceLoaded(source, file)
				})
			}
		}
	}

	sourceLoaded(source, file) {
		this.items[source.name] = file

		this.loaded++

		if (this.loaded === this.toLoad) {
			this.trigger('ready')
		}
	}
}
