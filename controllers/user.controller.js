const { User } = require('../models');
const { uuid } = require('uuidv4');
const { BASE36: token } = require('uuid-token-generator');
const { atob } = require('b2a');

const userCount = async () => {
	const data = await User.find().count();
	return data;
};

const findUser = async (query) => {
	const data = await User.find(query);
	return data[0];
};

const updateUser = async (query, data) => {
	const response = await User.updateOne(query, data);
	return response;
};

const checkUser = async (username, password) => {
	const response = await User.find({
		username: username,
		password: password,
	});
	return response[0];
};

exports.signUp = async (req, res) => {
	const { email_address, first_name, last_name, mobile_number, password } =
		req.body;
	try {
		const count = await userCount();

		const isRegisteredEmail = await User.find({ email: email_address });

		if (isRegisteredEmail) {
			return res
				.status(400)
				.send('Email is already registered. Try another email!');
		}

		const isRegisteredNumber = await User.find({ contact: mobile_number });

		if (isRegisteredNumber) {
			return res
				.status(400)
				.send('Mobile number is already registered. Try loggin in.');
		}

		const data = {
			userid: count + 1,
			email: email_address,
			first_name,
			last_name,
			username: first_name + last_name,
			contact: mobile_number,
			password,
			role: 'user',
			isLoggedIn: false,
			uuid: '',
			accesstoken: '',
		};
		const response = await User.create(data);
		return res.status(200).send('registered successfully!');
	} catch (err) {
		return res.status(500).send(`Internal server error`);
	}
};

exports.login = async (req, res) => {
	const { authorization } = req.headers;
	try {
		const encoded = authorization.split(' ').pop();
		const [username, password] = atob(encoded).split(':');

		const isRegisteredUsername = await User.findOne({ username: username });

		if (!isRegisteredUsername) {
			return res.status(200).send(`No such username found, Try again.`);
		}

		const data = await checkUser(username, password);
		if (!data) {
			return res.status(404).send('Wrong password, try again.');
		}
		data.uuid = uuid();
		data.accesstoken = token;
		data.isLoggedIn = true;
		const result = await updateUser({ userid: data.userid }, data);
		res.status(200).json({
			id: data.uuid,
			'access-token': data.accesstoken,
		});
	} catch (err) {
		return res.status(500).send('Internal server error!');
	}
};

exports.logout = async (req, res) => {
	const { uuid } = req.body;
	try {
		const data = await findUser({ uuid: uuid });
		if (!data) {
			return res.status(400).send('No user logged in');
		}
		data.uuid = '';
		data.accesstoken = '';
		data.isLoggedIn = false;
		const response = await updateUser({ userid: data.userid }, data);
		res.status(200).json({ message: 'Logged Out successfully.' });
	} catch (err) {
		return res.status(500).send('Internal server error');
	}
};

exports.getCouponCode = async (req, res) => {
	const { code } = req.query;
	const { authorization } = req.headers;
	try {
		const token = authorization.split(' ').pop();
		const data = await findUser({ accesstoken: token });
		if (!data) {
			res.status(400).json({ message: 'No such coupon code found.' });
		}
		const obj = data.coupens.length
			? data.coupens.filter((el) => el.id === code)
			: {};

		res.status(200).json(obj);
	} catch (error) {
		return res.status(500).send('Internal server error');
	}
};

exports.bookShow = async (req, res) => {
	const { authorization } = req.headers;
	const { customerUuid, bookingRequest } = req.body;
	try {
		console.log(authorization);
		const token = authorization.split(' ').pop();
		const uuid = customerUuid;
		const customer = await findUser({ uuid: uuid });
		bookingRequest.reference_number = 12345;
		customer.bookingRequests.push(bookingRequest);
		const response = await updateUser({ uuid: uuid }, customer);
		res.status(200).json(data.bookingRequest);
	} catch (error) {
		res.status(500).send('Internal server error');
	}
};
