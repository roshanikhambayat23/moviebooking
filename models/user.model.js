const { Schema, model } = require('mongoose');

const userSchema = new Schema({
	userid: { type: Number, required: true },
	email: { type: String, required: true },
	first_name: { type: String, required: true },
	last_name: { type: String, required: true },
	username: { type: String, required: true },
	contact: { type: String, required: true },
	password: { type: String, required: true },
	role: String,
	isLoggedIn: Boolean,
	uuid: String,
	accesstoken: String,
	coupens: [
		{
			id: Number,
			discountValue: Number,
		},
	],
	bookingRequests: [
		{
			reference_number: Number,
			coupon_code: Number,
			show_id: Number,
			tickets: [Number],
		},
	],
});

const User = model('User', userSchema);
module.exports = User;
