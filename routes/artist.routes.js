const {
	// getArtists,
	findAllArtists,
} = require('../controllers/artist.controller');
const artistsRouter = require('express').Router();

// artistsRouter.get('/', getArtists);
artistsRouter.get('/artists', findAllArtists);

module.exports = artistsRouter;
