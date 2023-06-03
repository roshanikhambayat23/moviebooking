const { Movie } = require('../models');

exports.findAllMovies = async (req, res) => {
	try {
		const { status, title, genres, artists, start_date, end_date } =
			req.query;
		const query = {};
		if (status === 'PUBLISHED') {
			query.published = status === 'PUBLISHED';
		}
		if (status === 'RELEASED') {
			query.released = status === 'RELEASED';
		}
		if (title) {
			query.title = { $regex: new RegExp(title, 'i') };
		}
		if (genres) {
			query.genres = { $in: genres.split(',') };
		}
		if (artists) {
			// const names = artists.split(',');
			query['artists.first_name'] = { $regex: new RegExp(artists, 'i') };
		}
		let response = await Movie.find(query);
		if (start_date) {
			let [year, month, date] = start_date.split('-');
			const startDate = [date, month, year].join('/');
			response = response.filter(
				(el) =>
					new Date(el.release_date).toLocaleDateString() > startDate,
			);
		}

		if (end_date) {
			let [year, month, date] = end_date.split('-');
			const endDate = [date, month, year].join('/');

			response = response.filter(
				(el) =>
					new Date(el.release_date).toLocaleDateString() < endDate,
			);
		}

		if (start_date && end_date) {
			let [year, month, date] = start_date.split('-');
			const startDate = [date, month, year].join('/');
			[year, month, date] = end_date.split('-');
			const endDate = [date, month, year].join('/');
			response = response.filter(
				(el) =>
					new Date(el.release_date).toLocaleDateString() >
						startDate &&
					new Date(el.release_date).toLocaleDateString() < endDate,
			);
		}

		res.status(200).json({
			status: 'success',
			message: 'OK',
			movies: response,
		});
	} catch (err) {
		console.log('Unexpected error occured');
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

exports.findOne = async (req, res) => {
	try {
		const { id } = req.params;
		const data = await Movie.findOne({ movieid: id });
		if (!data) {
			return res.status(404).json({
				status: 'failed',
				message: 'No such movieid exists.',
				movies: data,
			});
		}
		res.status(200).json({
			status: 'success',
			message: 'OK',
			movies: data,
		});
	} catch (err) {
		console.log('Unexpected Error Occured');
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

exports.findShows = async (req, res) => {
	try {
		const { id } = req.params;
		const data = await Movie.findOne({ movieid: id });
		if (!data) {
			return res.status(404).json({
				status: 'failed',
				message: 'No such movieid exists.',
				movies: null,
			});
		}
		res.status(200).json({
			status: 'success',
			message: 'OK',
			movies: data?.shows,
		});
	} catch (error) {
		console.log('Unexpected Error Occured');
		res.status(500).json({ message: 'Internal Server Error' });
	}
};
