// Import config to setup the global configuration object.
import { config } from './config'
import express from 'express';

const app = express();

import bodyParser from 'body-parser'
app.use(bodyParser.json())

/** Import routers from ``app/routes/index`` **/
import indexRouter from './app/routes/index';
import authRouter from './app/routes/auth';

/** Uses json body parsing */
app.use(express.json());

/** Configure application to use routers **/
app.use('/', indexRouter);
app.use('/auth', authRouter);

/** Global Middleware Example */
import ExampleMiddleware from './app/http/middleware/ExampleMiddleware'

/** Using the middleware on all routes */
app.use(ExampleMiddleware);

/** Using a custom error handler */
import ExceptionHandler from './app/exceptions/ExceptionHandler';
app.use(ExceptionHandler);

/** Fire up server **/
app.listen(config.app.port, () => {
  console.log("Server started");
});