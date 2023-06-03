const { Genre } = require('../models');

exports.findAllGenres = async (req, res) => {
	try {
		const data = await Genre.find();
		res.status(200).json({ genres: data });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};
