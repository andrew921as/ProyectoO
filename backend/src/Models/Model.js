const mongoose = require('mongoose');

const ModelSchema = new mongoose.Schema({
	name: [{type: String, required: true}],
	model : [{type: Buffer, required:true}],
});

const Model = mongoose.model('Model', ModelSchema);

module.exports = Model;
