import { NextFunction, Request, Response } from "express";

const jwt = require('jsonwebtoken')
/**
 * Basic controller to handle requests on /
 */
export const IndexController = {
	/**
	 * Handles the default request on /
	 * 
	 * @param req {Request} Express request object
	 * @param res {Response} Express response object
	 * @param next {NextFunction} Express NextFunction (used for middleware)
	 */
	index(req: Request, res: Response, next: NextFunction) {
		res.send("Welcome to Rathma's express.js / typescript template.");

		return next();
	} ,
	/**
	 * 
	 * @param req Request user name and password
	 * @param res Respond to object
	 * @param next None for next function
	 */
	login(req, res, next){
		const username = req.body.username
		const user = {name: username}

		const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
		res.json({token: token})
		return next();
	}
}