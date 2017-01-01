var express = require('express');

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
apiRouter.use('/locations', locationsRouter);
apiRouter.use('/passengers', passengersRouter);
apiRouter.use('/travelclasses', travelClassesRouter);
apiRouter.use('/flights', flightsRouter);
apiRouter.use('/bookings', bookingsRouter);

//------------------------------------------------------------------------
module.exports = apiRouter;