var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var Account = Utils.getModel('Account').Model;

//------------------------------------------------------------------------
// Facebook Authentication
passport.use('facebook', new FacebookStrategy({
    clientID: '1891628951058910',
    clientSecret: 'bb29ae226aad14d8c4a9c95e969039f5',
    callbackURL: "http://localhost:1337/facebook/callback",
    profileFields: ['id', 'email', 'name']
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    Account
        .findOne({email: profile.emails[0].value})
        .exec((err, account) => {
            if (err) return cb(err);
            if (!account) {

                var acc = new Account({
                    name: profile.name.givenName,
                    email: profile.emails[0].value
                });
            
                acc.save((err) => {
                    if (err) return cb(err);
                    cb(null, acc);
                })
            } else {
                cb(null, account);
            }
        });
  }
));

//------------------------------------------------------------------------
// Local Authentication
var LocalStrategy = require('passport-local').Strategy;

passport.use('local', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function(email, password, done) {
        Account
            .findOne({email: email})
            .exec((err, account) => {
                if (err) return done(err);
                if (!account) return done(null, false, 'Khong tim thay');
                if (!account.validPassword(password)) return done(null, false, 'Sai password');
                done(null, account);
            });
    }
));

//------------------------------------------------------------------------
// Jwt Authentication
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwtConfigs = {
    jwtFromRequest: ExtractJwt.fromHeader('access_token'),
    secretOrKey: '123456',
    algorithms: ['HS256']
};

passport.use('jwt', new JwtStrategy(
    jwtConfigs,
    function(jwt_payload, done) {

        Account
            .findById(jwt_payload._id)
            .exec((err, account) => {
                if (err) return done(err);
                if (!account) return done(null, false, 'Failed authentication');
                done(null, account);
            });
}));

module.exports = {
    jwtConfigs: jwtConfigs,
    checkToken: function(req, res, next) {
        passport.authenticate('jwt', (err, account, info) => {
            if (err) return next(err);
            if (!account) {
                return res.status(401).json({message: info});
            }

            req.account = account;
            next();
        })(req, res, next);
    }
}