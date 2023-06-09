const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

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

// Ruta para hacer login
router.post('/login', (req, res) => {
	const {email, password} = req.body;

	// Busca un usuario en la base de datos con el email proporcionado
	User.findOne({ $and: [{ email }, { isGoogle: false }] }, (err, user) => {
		if (err) {
			console.error('Error al buscar el usuario en la base de datos:', err);
			res.status(500).json({message: 'Error del servidor'});
			return;
		}

		if (!user) {
			// Usuario no encontrado
			res.status(401).json({message: 'Credenciales inválidas'});
			return;
		}

		// Compara la contraseña ingresada con la contraseña almacenada en la base de datos
		bcrypt.compare(password, user.password, (err, result) => {
			if (err) {
				console.error('Error al comparar contraseñas:', err);
				res.status(500).json({message: 'Error del servidor'});
				return;
			}

			if (result) {
				// Inicio de sesión válido
				res.status(200).json({message: 'Inicio de sesión exitoso', user});
			} else {
				// Credenciales inválidas
				res.status(401).json({message: 'Credenciales inválidas'});
			}
		});
	});
});

//Ruta para registar un usuario
router.post('/register', (req, res) => {
	const {name, last_name, email, password} = req.body;

	// Verifica si ya existe un usuario con el mismo correo electrónico
	User.findOne({ $and: [{ email }, { isGoogle: false }] }, (err, existingUser) => {
		if (err) {
			console.error('Error al buscar el usuario en la base de datos:', err);
			res.status(500).json({message: 'Error del servidor'});
			return;
		}

		if (existingUser) {
			// Ya existe un usuario con el mismo correo electrónico
			res.status(400).json({message: 'Ya existe un usuario con ese correo electrónico'});
			return;
		}

		// Aplica hashing a la contraseña antes de guardarla en la base de datos
		bcrypt.hash(password, 10, (err, hashedPassword) => {
			if (err) {
				console.error('Error al encriptar la contraseña:', err);
				res.status(500).json({message: 'Error del servidor'});
				return;
			}
			
			// Crea un nuevo usuario con los atributos proporcionados
			const newUser = new User({
				name,
				last_name,
				email,
				password: hashedPassword,
			});

			// Guarda el usuario en la base de datos
			newUser.save((err) => {
				if (err) {
					console.error('Error al guardar el usuario en la base de datos:', err);
					res.status(500).json({message: 'Error del servidor'});
					return;
				}

				res.status(201).json({message: 'Usuario creado exitosamente', user: newUser});
			});
		});
	});
});  

// Ruta para inicio de sesion con Google
router.post('/loginGoogle', (req, res) => {
	const {name, last_name, email, password} = req.body;

	// Verifica si ya existe un usuario con el mismo correo electrónico
	User.findOne({ $and: [{ email }, { isGoogle: true }] }, (err, existingUser) => {
		if (err) {
			console.error('Error al buscar el usuario en la base de datos:', err);
			res.status(500).json({message: 'Error del servidor'});
			return;
		}

		if (existingUser) {
			// Ya existe un usuario con el mismo correo electrónico
			return res.status(200).json({message: 'Inicio de sesión exito', user: existingUser})
		}

		// Aplica hashing a la contraseña antes de guardarla en la base de datos
		bcrypt.hash(password, 10, (err, hashedPassword) => {
			if (err) {
				console.error('Error al encriptar la contraseña:', err);
				res.status(500).json({message: 'Error del servidor'});
				return;
			}
			
			// Crea un nuevo usuario con los atributos proporcionados
			const newUser = new User({
				name,
				last_name,
				email,
				password: hashedPassword,
				isGoogle: true,
			});

			// Guarda el usuario en la base de datos
			newUser.save((err) => {
				if (err) {
					console.error('Error al guardar el usuario en la base de datos:', err);
					res.status(500).json({message: 'Error del servidor'});
					return;
				}

				res.status(201).json({message: 'Usuario creado exitosamente', user: newUser});
			});
		});
	});
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
		// console.log(req.body)
		const updatedUser = await User.updateOne(
			{_id: req.params.userId},
			{
				$set: {
					...req.body,
				},
			}
		);
		res.json(updatedUser);
	} catch (error) {
		res.json({message: error.message});
	}
});

module.exports = router;
