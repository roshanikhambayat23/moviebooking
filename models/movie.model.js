const { Schema, model } = require('mongoose');

const artistSchema = new Schema({
	artistid: { type: Number, required: true },
	first_name: { type: String, required: true },
	last_name: { type: String, required: true },
	wiki_url: { type: String, required: true },
	profile_url: { type: String, required: true },
	movies: [{ type: Schema.Types.ObjectId, ref: 'Movie' }],
});

const showSchema = new Schema({
	id: { type: Number, required: true },
	theatre: {
		name: { type: String, required: true },
		city: { type: String, required: true },
	},
	language: { type: String, required: true },
	show_timing: { type: Date, required: true },
	available_seats: { type: String, required: true },
	unit_price: { type: Number, required: true },
});

const movieSchema = new Schema({
	movieid: { type: Number, required: true },
	title: { type: String, required: true },
	published: { type: Boolean, required: true },
	released: { type: Boolean, required: true },
	poster_url: { type: String, required: true },
	release_date: { type: Date, required: true },
	publish_date: { type: Date, required: true },
	artists: [artistSchema],
	genres: [{ type: String, required: true }],
	duration: { type: Number, required: true },
	critic_rating: { type: Number, required: true },
	trailer_url: { type: String, required: true },
	wiki_url: { type: String, required: true },
	story_line: { type: String, required: true },
	shows: [showSchema],
});

const Movie = model('Movie', movieSchema);
module.exports = Movie;
