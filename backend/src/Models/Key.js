const mongoose = require('mongoose');

const keySchema = new mongoose.Schema({
	position: {
		type: [Number],
		required: true,
		validate: {
			validator: function (array) {
				return array.length === 3 && array.every((element) => typeof element === 'number');
			},
			message: 'El atributo "position" debe ser un array de 3 posiciones de números.',
		},
	},
});

const Key = mongoose.model('Key', keySchema);

module.exports = Key;
