// Import express
import express from 'express';
// Import AuthController
import { AuthController } from '../http/controllers/AuthController';

// Create a router instance for our nested routes.
const router = express.Router();

// Create a route for POST requests on /auth/register 
router.post('/register', AuthController.register);
router.post('/login', AuthController.login)

// Export the router
export default router;
