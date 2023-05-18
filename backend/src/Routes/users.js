const express = require('express');
const router = express.Router();

const User = require('../Models/User');

// Ruta para obtener todos los usuarios
router.get('/', async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (error) {
		res.json({message: error});
	}
});

// Ruta para obtener un usuario por su ID
router.get('/:userId', async (req, res) => {
	try {
		const user = await User.findById(req.params.userId);
		res.json(user);
	} catch (error) {
		res.json({message: error});
	}
});

// Ruta para crear un usuario
router.post('/', async (req, res) => {
	const user = new User({
		name: req.body.name,
		last_name: req.body.last_name,
		email: req.body.email,
		password: req.body.password,
		token: req.body.token,
		avatar: req.body.avatar,
	});
	try {
		const savedUser = await user.save();
		res.json(savedUser);
	} catch (error) {
		res.json({message: error});
	}
});

// Ruta para eliminar un usuario por su ID
router.delete('/:userId', async (req, res) => {
	try {
		const removedUser = await User.remove({_id: req.params.userId});
		res.json(removedUser);
	} catch (error) {
		res.json({message: error});
	}
});

// Ruta para actualizar un usuario por su ID
router.patch('/:userId', async (req, res) => {
	try {
		const updatedUser = await User.updateOne(
			{_id: req.params.userId},
			{
				$set: {
					name: req.body.name,
					last_name: req.body.last_name,
					email: req.body.email,
					password: req.body.password,
					token: req.body.token,
					avatar: req.body.avatar,
				},
			}
		);
		res.json(updatedUser);
	} catch (error) {
		res.json({message: error});
	}
});

module.exports = router;
