var passport = require('passport'),
    jwt = require('jsonwebtoken'),
    auth = Utils.getConfig('authentication'),
	express = require('express'),
	authsRouter = express.Router();

//====================================================================
authsRouter.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

//====================================================================
authsRouter.get('/facebook/callback', function(req, res, next) {
	passport.authenticate('facebook', function(err, account) {
        if (err) return next(err);
        if (!account) return res.end('facebook fail');
        
        var token = jwt.sign({ _id: account._id }, auth.jwtConfigs.secretOrKey, { algorithm: auth.jwtConfigs.algorithms[0] });
        res.status(200).json({token: token});

  })(req, res, next);
});


//====================================================================
authsRouter.get('/local', function(req, res, next) {
    passport.authenticate('local', function(err, account, message) {
        if (err) return next(err);
        if (!account) return res.end(message);
        
        var token = jwt.sign({ _id: account._id }, auth.jwtConfigs.secretOrKey, { algorithm: auth.jwtConfigs.algorithms[0] });
        res.status(200).json({token: token});

    })(req, res, next);
});

//====================================================================
module.exports = authsRouter;