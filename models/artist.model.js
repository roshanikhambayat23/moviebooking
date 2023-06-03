const { model, Schema } = require('mongoose');

const artistSchema = new Schema({
	artistid: { type: Number, required: true },
	first_name: { type: String, required: true },
	last_name: { type: String, required: true },
	wiki_url: { type: String, required: true },
	profile_url: { type: String, required: true },
	movies: [{ type: Schema.Types.ObjectId, ref: 'Movie' }],
});

const Artist = model('Artist', artistSchema);

module.exports = Artist;
