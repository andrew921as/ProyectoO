const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	last_name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	token: {
		type: String,
		required: false,
	},
	avatar: {
		type: String,
		required: false,
		default: 'https://i.pinimg.com/280x280_RS/42/03/a5/4203a57a78f6f1b1cc8ce5750f614656.jpg',
	},
	progress: {
		type: Number,
		default: 0,
		required: false,
	},
	points: {
		type: Number,
		default: 0,
		required: false,
	},
	keys: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Key',
			required: false,
		},
	],
});

// Definir el middleware pre para actualizar el atributo "progress"
userSchema.pre('updateOne', function (next) {
	const update = this.getUpdate(); // Obtener el objeto de actualización
	const points = update.$set.points; // Obtener el nuevo valor de "points"
	const keys = update.$set.keys; // Obtener la nueva llave agregada

	// Lógica para actualizar el atributo "progress" basado en el puntaje obtenido y en las llaves recolectadas
	let progress = 0;

	if (keys.length >= 1) progress = 20;

	if (keys.length >= 2 && points >= 100) progress = 40;

	if (keys.length >= 3 && points >= 200) progress = 60;

	if (keys.length >= 4 && points >= 300) progress = 80;

	if (keys.length >= 5 && points >= 400) progress = 100;

	update.$set.progress = progress; // Actualizar el atributo "progress" en la actualización

	next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
