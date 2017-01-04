var passport = require('passport'),
    jwt = require('jsonwebtoken'),
    auth = Utils.getConfig('authentication'),
	express = require('express'),
	authsRouter = express.Router();

//====================================================================
var Account = Utils.getModel('Account').Model;    

//====================================================================
authsRouter.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

//====================================================================
authsRouter.get('/facebook/callback', function(req, res, next) {
	passport.authenticate('facebook', function(err, account, info) {
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

authsRouter.post('/register', function(req, res, next) {
    
    var acc = new Account({
        name: req.body.name,
        email: req.body.email,
        passwordHash: Account.generateHash(req.body.password)
    });

    acc.save((err) => {
        if (err) next(err);
        res.status(200).json({id: acc._id});
    })
});

//====================================================================
authsRouter.get('/self', (req, res, next) => {
    passport.authenticate('jwt', (err, account, info) => {
        
        if (err) return next(err);
        if (info instanceof Error)
            return res.status(403).json({error: info.message});
        
        var rawAccount = account.toObject();
        delete rawAccount.passwordHash;
        res.status(200).json({account: rawAccount, message: info});
    })(req, res, next);
});

//====================================================================
module.exports = authsRouter;