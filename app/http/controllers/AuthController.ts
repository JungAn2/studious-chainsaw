import { NextFunction, Request, Response } from "express";
import { AuthService } from "../../services/AuthService";
import jwt from 'jsonwebtoken'
import { config } from '../../../config'
import { stringify } from "querystring";

/**
 * Basic controller to handle requests on /
 */
export const AuthController = {

	async login(req: Request, res: Response, next: NextFunction){
		if(!req.body.email){
				res.send("No email")
			}
		if(!req.body.password)
			res.send("No password")
		const validate = await AuthService.loginValidate(req.body.email, req.body.password)
		res.send(validate)
		return next();
	},

		/**
	 * Handles the default request on /
	 * 
	 * @param req {Request} Express request object
	 * @param res {Response} Express response object
	 * @param next {NextFunction} Express NextFunction (used for middleware)
	 */
		 async register(req: Request, res: Response, next: NextFunction) {
			if(!req.body.email ||
				!req.body.username ||
				!req.body.password){
					res.send("Invalid input")
				}
			const newUser = await AuthService.register(req.body.email, req.body.username, req.body.password);
			res.send(newUser)
			return next();
		} ,
	
}