var express = require('express');

//------------------------------------------------------------------------
var apiRouter = Utils.getRouter('api'),
    navRouter = Utils.getRouter('nav');
    // authRouter = Utils.getRouter('auth');

//------------------------------------------------------------------------
var appRouter = express.Router();
appRouter.use('/api', apiRouter);
appRouter.use(navRouter);

//------------------------------------------------------------------------
var configObject = {
	
	appRouter: appRouter
}

//------------------------------------------------------------------------
module.exports =  configObject;