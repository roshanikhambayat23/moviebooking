const { Artist } = require('../models');

exports.findAllArtists = async (req, res) => {
	try {
		const data = await Artist.find();
		res.status(200).json({ artists: data });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};
