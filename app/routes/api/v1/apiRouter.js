var express = require('express');
var auth = Utils.getConfig('authentication');

//------------------------------------------------------------------------
//Endpoints
var authRouter = require('./endpoints/auth'),
	locationsRouter = require('./endpoints/locations'),
	passengersRouter = require('./endpoints/passengers'),
	travelClassesRouter = require('./endpoints/travelclasses'),
	flightsRouter = require('./endpoints/flights'),
	bookingsRouter = require('./endpoints/bookings');

//------------------------------------------------------------------------
var apiRouter = express.Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/locations', auth.checkToken, locationsRouter);
apiRouter.use('/passengers', auth.checkToken, passengersRouter);
apiRouter.use('/travelclasses', auth.checkToken, travelClassesRouter);
apiRouter.use('/flights', auth.checkToken, flightsRouter);
apiRouter.use('/bookings', auth.checkToken, bookingsRouter);

//------------------------------------------------------------------------
module.exports = apiRouter;