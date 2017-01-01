var express = require('express');
var passport = require('passport');

//------------------------------------------------------------------------
var navRouter = express.Router();

navRouter.get('/', function(req, res) {
	res.redirect('/index.html');
});

navRouter.get('/protectedData',
	passport.authenticate('jwt', {
		failureRedirect: '/',
		// successRedirect: '/blablah'
		session: false
	}),
	(req, res) => {
		res.end('important data');
	}
);

//------------------------------------------------------------------------
module.exports = navRouter;