var express = require('express');
var passport = require('passport');

//------------------------------------------------------------------------
var navRouter = express.Router();

navRouter.use(function(req, res) {
	res.sendFile(Utils.root_path + '/public/build/index.html');
});

navRouter.get('/protectedData', (req, res, next) => {
	
	passport.authenticate('jwt', {
		failureRedirect: '/',
		// successRedirect: '/blablah'
		session: false
	}),
	(req, res) => {
		res.end('important data');
	}
});


//------------------------------------------------------------------------
module.exports = navRouter;