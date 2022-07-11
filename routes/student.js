const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')

const Student = require('../models/Student.js')

// @route       POST api/students
// @desc        register a student
// @access      public
router.post(
	'/',
	[
		check('name', 'name is required').not().isEmpty(),
		check('email', 'please include a valid email you maggot scum').isEmail(),
		check('belt', 'belt is required').not().isEmpty(),
		check('club', 'club is required').not().isEmpty(),
		check('password', 'please enter password with 6 or more characters').isLength(
			{ min: 6 }
		),
	],
	async (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		const { name, email, belt, club, password } = req.body

		try {
			let student = await Student.findOne({ email })
			if (student) {
				return res.status(400).json({ msg: 'Email already exists you maggot scum' })
			}

			student = new Student({
				name,
				email,
				belt,
				club,
				password,
			})

			// create a salt using bcrypt package
			const salt = await bcrypt.genSalt(10)
			// update the instance of student above to set password to the salted hash.
			student.password = await bcrypt.hash(password, salt)
			// student.save returns a promise so wait for this to come back in
			await student.save()
			// create payload to give to client
			const payload = {
				student: {
					id: student.id,
				},
			}

			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{ expiresIn: 36000 },
				(err, token) => {
					if (err) {
						throw err
					}
					res.json({ token })
				}
			)
		} catch (err) {
			console.error(err.message, 'student api')
			res.status(500).send('server error')
		}
	}
)

module.exports = router
