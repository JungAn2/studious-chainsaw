import { NextFunction, Request, Response } from "express";
import { AuthService } from "../../services/AuthService";
import jwt from 'jsonwebtoken'
import { config } from '../../../config'
import { stringify } from "querystring";
import { isStringObject } from "util/types";

/**
 * Basic controller to handle requests on /
 */
export const AuthController = {

	/**
	 * 
	 * @param {Request} req Express request object
	 * @param {Response} res Express response object
	 * @param {NextFunction} next Express NextFunction (used for middleware)
	 */
	async login(req: Request, res: Response, next: NextFunction){
		let data = null
		if(!req.body.email){
			if(!req.body.username){
				res.send("No input")
			}
			data = req.body.username
		}
		else
			data = req.body.email
		if(!req.body.password)
			res.send("No password")
		const validate = await AuthService.loginValidate(data, req.body.password)
		//Sending if it is returning exception handler
		if(!isStringObject(validate)){
			res.send(validate)
			return next()
		}
		//Send string if it is token string
		res.send(String(validate))
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