const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;
const userSchema = new mongoose.Schema({
	login: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	firstName: {
		type: String,
	},
	lastName: {
		type: String,
	},
	role: {
		type: String,
		enum: ['admin', 'moderator', 'manager', 'user'],
		default: 'admin'
	},
	date: {
		type: Date,
		default: Date.now,
	}
}, {optimisticConcurrency: true});
userSchema.pre('save', async function (next) {
	if (this.isModified('password')) {
		const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
		this.password = await bcrypt.hash(this.password, salt);
	}
	next();
});
userSchema.methods.comparePassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};
module.exports = mongoose.model('UserModel', userSchema);