var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var passport	= require('passport');
var config      = require('./config/database'); 
var User        = require('./app/models/user'); 
var port        = process.env.PORT || 8080;
var jwt         = require('jwt-simple');
 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
 
app.use(morgan('dev'));
 
app.use(passport.initialize());

app.get('/', function(req, res) {
  res.send('The API is at http://localhost:' + port + '/api');
});

app.listen(port);
console.log('Server is running at: http://localhost:' + port);

mongoose.connect(config.database);
 
require('./config/passport')(passport);

var apiRoutes = express.Router();
 
apiRoutes.post('/signup', function(req, res) {
  if (!req.body.name || !req.body.password) {
    res.json({success: false, msg: 'Please pass name and password.'});
  } else {
    var newUser = new User({
      name: req.body.name,
      password: req.body.password
    });
    
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
});

apiRoutes.post('/login', function(req, res) {
  User.findOne({
    name: req.body.name
  }, function(err, user) {
    if (err) throw err;
 
    if (!user) {
      res.send({success: false, msg: 'User not found.'});
    } else {
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          var token = jwt.encode(user, config.secret);
          res.json({success: true, token: 'JWT ' + token});
        } else {
          res.send({success: false, msg: 'Wrong password.'});
        }
      });
    }
  });
});

app.use('/api', apiRoutes);