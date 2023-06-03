const express = require('express');
const cors = require('cors');
const movieRouter = require('./routes/movie.routes');
const genreRouter = require('./routes/genre.routes');
const artistRouter = require('./routes/artist.routes');
const { connect: dbConnect } = require('mongoose');
const { url } = require('./config/db.config');
const userRouter = require('./routes/user.routes');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.json({
		message: 'Welcome to Upgrad Movie booking application development.',
	});
});

// all routes
app.use('/api', movieRouter);
app.use('/api', genreRouter);
app.use('/api', artistRouter);
app.use('/api', userRouter);

// mongodb connection
dbConnect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.then(() => {
		console.log('Connected to the database!');
	})
	.catch((err) => {
		console.log('Cannot connect to the database!', err);
		process.exit();
	});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
