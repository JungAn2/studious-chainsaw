import { NextFunction, Request, Response } from "express";
import {AuthService} from '../../services/AuthService'
import UnauthorizedException from '../../exceptions/UnauthorizedException'
import jwt from 'jsonwebtoken'

/**
 * An example of authentication middleware to create authorized views / routes.
 * 
 * @param req {Request} Express request object
 * @param res {Response} Express response object
 * @param next {NextFunction} Express next function
 */
export default async function (req: Request, res: Response, next: NextFunction) {
	// Check request headers for authorization token of some kind
	// We'll just assume the entire authorization header is the token for the example.
	const token = req.headers.authorization.split(" ")[1]


	// If the auth service doesn't validate the user	
	if (!AuthService.validate(token)) {
		return next(new UnauthorizedException());
	}

	req.user = await AuthService.findUser(token)

	// Go to the next middleware / controller
	return next()
}