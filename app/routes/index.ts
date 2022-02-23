/** Basic router example */

// Import express
import express from 'express';

// Import route controller(s)
import { IndexController } from '../http/controllers/IndexController';
import { UserController } from '../http/controllers/UserController';

// Create a router instance for our nested routes.
const router = express.Router();

// Assign routes to our router
router.get('/', IndexController.index);

router.get('/usr/', UserController.home)
router.post('/usr/login', UserController.login);
router.post('/usr/create', UserController.create);

// authed example
//import AuthMiddleware from '../http/middleware/AuthMiddleware';
// Everywhere below here will require authentication.
//router.use(AuthMiddleware);
//router.get('/auth', IndexController.index);

// Export the router
export default router;