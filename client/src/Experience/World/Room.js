import * as THREE from 'three'

import Experience from '../Experience'
import RoomBakes from './RoomBakes'
import SteamCylinder from './SteamCylinder'
import Raycaster from '../Utils/Raycaster'
export default class Room {
	constructor() {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.time = this.experience.time
		this.debug = this.experience.debug

		// Scene
		this.resource_theDojo = this.resources.items.theDojo

		// -> Scene Textures (bakedTextures)
		this.roomBakes = new RoomBakes()
		this.model_theDojo = this.resource_theDojo.scene

		// tape for animation
		this.tape = this.model_theDojo.children.find(
			(child) => child.name === 'merged_tape'
		)

		// // -> Shaders
		// this.steamCylinder = new SteamCylinder(
		// 	'steamCone',
		// 	'steamCone',
		// 	[-1.68, 0.42, -0.25, 4.5]
		// )

		// this.steamCylinderLeft = new SteamCylinder(
		// 	'steamCone',
		// 	'steamCone',
		// 	[-1.7, 0.42, -0.15, 4.7]
		// )

		// -> Animations
		this.clock = new THREE.Clock()

		// Debug
		if (this.debug.active) {
			this.debugFolder = this.debug.ui.addFolder('Room Master')
		}

		this.dayOrNight = new Date()
		this.hour = this.dayOrNight.getHours()

		// this.hour < 18 ? this.setModelDay() : this.setModelSunset()
		this.setModelSunset()

		this.raycaster = new Raycaster(
			this.resource_theDojo,
			this.experience.camera.controls.object.position
		)
		// this.setDebug()
	}

	setModelDay() {
		// objects & emissions
		console.log('day')
		this.model_theDojo.traverse((c) => {
			c.material = this.roomBakes.bakedDay.readyMateral
		})

		console.log(this.model_theDojo, 'room group')

		for (let i = 0; i < this.model_theDojo.children.length; i++) {
			switch (this.model_theDojo.children[i].name) {
				case 'merged_Helio':
					this.picture_1 = this.model_theDojo.children[i]
					this.picture_1.material = this.roomBakes.helioDay.readyMateral
					break
				case 'merged_Kano':
					this.picture_2 = this.model_theDojo.children[i]
					console.log(this.picture_2, 'pic 2')
					this.picture_2.material = this.roomBakes.kanoDay.readyMateral
					break
				case 'merged_right_symbol':
					this.scroll_1 = this.model_theDojo.children[i]
					this.scroll_1.material = this.roomBakes.rightSymbolDay.readyMateral
					break
				case 'merged_left_symbol':
					this.scroll_2 = this.model_theDojo.children[i]
					this.scroll_2.material = this.roomBakes.leftSymbolDay.readyMateral
					break
				case 'merged_temple_symbol':
					this.templeSymbols = this.model_theDojo.children[i]
					this.templeSymbols.material = this.roomBakes.symbolDay.readyMateral
					break
				case 'merged_no_stripe_temple':
					this.temple = this.model_theDojo.children[i]
					this.temple.material = this.roomBakes.blackOnlyDay.readyMateral
					break
				case 'merged_stripe_temple':
					this.templeStripe = this.model_theDojo.children[i]
					this.templeStripe.removeFromParent()
					// this.templeStripe.material = this.roomBakes.blackOnlyDay.readyMateral
					break
				case 'merged_no_stripe':
					this.templeStripeBareStripe = this.model_theDojo.children[i]
					this.templeStripeBareStripe.removeFromParent()
					// this.templeStripe.material = this.roomBakes.blackOnlyDay.readyMateral
					break
				case 'merged_1_stripe':
					this.templeStripe1 = this.model_theDojo.children[i]
					this.templeStripe1.removeFromParent()
					// this.templeStripe.material = this.roomBakes.blackOnlyDay.readyMateral
					break
				case 'merged_2_stripe':
					this.templeStripe2 = this.model_theDojo.children[i]
					this.templeStripe2.removeFromParent()
					// this.templeStripe.material = this.roomBakes.blackOnlyDay.readyMateral
					break
				case 'merged_3_stripe':
					this.templeStripe3 = this.model_theDojo.children[i]
					this.templeStripe3.removeFromParent()
					// this.templeStripe.material = this.roomBakes.blackOnlyDay.readyMateral
					break
				case 'merged_4_stripe':
					this.templeStripe4 = this.model_theDojo.children[i]
					this.templeStripe4.removeFromParent()
					// this.templeStripe.material = this.roomBakes.blackOnlyDay.readyMateral
					break
				default:
					break
			}
		}

		this.scene.add(this.model_theDojo)
	}

	setModelSunset() {
		// objects & emissions
		console.log('sunset')

		this.model_theDojo.traverse((c) => {
			c.material = this.roomBakes.bakedSunset.readyMateral
		})

		this.mergedTempleToRemove = this.model_theDojo.children.find(
			(el) => el.name === 'merged_no_stripe'
		)
		this.mergedTempleToRemove.removeFromParent()

		this.mergedTempleToRemove = this.model_theDojo.children.find(
			(el) => el.name === 'merged_1_stripe'
		)
		this.mergedTempleToRemove.removeFromParent()

		this.mergedTempleToRemove = this.model_theDojo.children.find(
			(el) => el.name === 'merged_2_stripe'
		)
		this.mergedTempleToRemove.removeFromParent()

		this.mergedTempleToRemove = this.model_theDojo.children.find(
			(el) => el.name === 'merged_3_stripe'
		)
		this.mergedTempleToRemove.removeFromParent()

		this.mergedTempleToRemove = this.model_theDojo.children.find(
			(el) => el.name === 'merged_4_stripe'
		)
		this.mergedTempleToRemove.removeFromParent()

		console.log(this.model_theDojo, 'room group')

		for (let i = 0; i < this.model_theDojo.children.length; i++) {
			switch (this.model_theDojo.children[i].name) {
				case 'merged_Helio':
					this.picture_1 = this.model_theDojo.children[i]
					this.picture_1.material = this.roomBakes.helioSunset.readyMateral
					break
				case 'merged_Kano':
					this.picture_2 = this.model_theDojo.children[i]
					console.log(this.picture_2, 'pic 2')
					this.picture_2.material = this.roomBakes.kanoSunset.readyMateral
					break
				case 'merged_right_symbol':
					this.scroll_1 = this.model_theDojo.children[i]
					this.scroll_1.material = this.roomBakes.rightSymbolSunset.readyMateral
					break
				case 'merged_left_symbol':
					this.scroll_2 = this.model_theDojo.children[i]
					this.scroll_2.material = this.roomBakes.leftSymbolSunset.readyMateral
					break
				case 'merged_temple_symbol':
					this.templeSymbols = this.model_theDojo.children[i]
					console.log(this.templeSymbols)
					this.templeSymbols.material = this.roomBakes.symbolSunset.readyMateral
					break
				case 'merged_no_stripe_temple':
					this.temple = this.model_theDojo.children[i]
					this.temple.material = this.roomBakes.whiteOnlySunset.readyMateral
					break
				default:
					break
			}
		}

		this.scene.add(this.model_theDojo)
	}

	setDebug() {}

	update() {
		this.elapsed = this.clock.getElapsedTime()
		this.tape.position.y = Math.sin(this.elapsed * 2) * 0.05 + 0.4

		// this.steamCylinder.update()
		// this.steamCylinderLeft.update()

		this.raycaster.update()
	}
}
