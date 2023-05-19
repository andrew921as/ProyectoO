const mongoose = require('mongoose');

const keySchema = new mongoose.Schema({
	coordenate: [{type: Number, required: true}],
});

const Key = mongoose.model('Key', keySchema);

module.exports = Key;
