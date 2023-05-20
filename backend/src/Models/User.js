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
		default: 'https://res.cloudinary.com/dy1xcx7kw/image/upload/v1623687229/olimpo/avatar-default.png',
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

const User = mongoose.model('User', userSchema);

module.exports = User;
