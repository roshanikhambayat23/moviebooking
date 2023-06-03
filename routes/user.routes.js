const userRouter = require('express').Router();
const {
	signUp,
	login,
	logout,
	getCouponCode,
	bookShow,
} = require('../controllers/user.controller');

userRouter.post('/auth/signup', signUp);
userRouter.post('/auth/login', login);
userRouter.post('/auth/logout', logout);

userRouter.get('/auth/coupons', getCouponCode);
userRouter.post('/auth/bookings', bookShow);

module.exports = userRouter;
