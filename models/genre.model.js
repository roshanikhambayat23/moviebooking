const { model, Schema } = require('mongoose');

const genreSchema = new Schema({
	genreid: { type: Number, required: true },
	genre: { type: String, required: true },
});

const Genre = model('Genre', genreSchema);

module.exports = Genre;
