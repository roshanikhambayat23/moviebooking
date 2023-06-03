const {
	findAllMovies,
	findOne,
	findShows,
} = require('../controllers/movie.controller');
const movieRouter = require('express').Router();

movieRouter.get('/movies', findAllMovies);
movieRouter.get('/movies/:id', findOne);
movieRouter.get('/movies/:id/shows', findShows);

module.exports = movieRouter;
