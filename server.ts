// Import config to setup the global configuration object.
import { config } from './config'
import express from 'express';

const app = express();

/** Setup request body parsing */
import bodyParser from 'body-parser'
app.use(bodyParser.json())

/** Import routers from ``app/routes/index`` **/
import indexRouter from './app/routes/index';
import authRouter from './app/routes/auth';
import projectRouter from './app/routes/project'
import taskRouter from './app/routes/task'

/** Configure application to use routers **/
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/projects', projectRouter)
app.use('/projects/:pid/tasks', taskRouter)

/** Using a custom error handler */
import ExceptionHandler from './app/exceptions/ExceptionHandler';
app.use(ExceptionHandler);

/** Fire up server **/
app.listen(config.app.port, () => {
  console.log("Server started");
});