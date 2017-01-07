var mongoose = require('mongoose');
mongoose.Promise = global.Promise; //Use native ES6 Promise instead of Mongoose's default

//------------------------------------------------------------------------
module.exports = {
	
	//Options
	connectionString: process.env.DATABASE_URL || 'mongodb://admin:123456@ds157278.mlab.com:57278/dack-lthd',


	//Methods
	connect: function(connectionString, callback) {

		mongoose.connect(this.connectionString, function(err) {

            if (err) {
            	console.error('cant connect to mongoDB');
            	callback(err);
            	return;
            }

            console.log('mongoDB connected');
            callback();
        });
	}
}