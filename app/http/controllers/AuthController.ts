import { NextFunction, Request, Response } from "express";
import { AuthService } from "../../services/AuthService";
import AuthExceptionHandler from "../../exceptions/Auth/Index";
import MissingBodyException from "../../exceptions/MissingBodyException";

/**
 * Basic controller to handle requests on /
 */
export const AuthController = {

	/**
	 * Handles the default request on /register
	 * 
	 * @param {Request} req Express request object
	 * @param {Response} res Express response object
	 * @param {NextFunction} next Express NextFunction (used for middleware)
	 */
	async login(req: Request, res: Response, next: NextFunction) {
		try {
			if (!req.body.email && !req.body.username) {
				throw new MissingBodyException()
			}
			let userEmail = req.body.email
			if (!userEmail)
				userEmail = req.body.username
			if (!req.body.password)
				throw new MissingBodyException()
			const token = await AuthService.loginValidate(userEmail, req.body.password)
			console.log(token)
			res.send(token)
			return next();
		}
		catch (e) {
			return next(e)
		}
	},
	/**
	 * Handles the default request on /register
	 * 
	 * @param req {Request} Express request object
	 * @param res {Response} Express response object
	 * @param next {NextFunction} Express NextFunction (used for middleware)
	 */
	async register(req: Request, res: Response, next: NextFunction) {
		try {
			if (!req.body.email ||
				!req.body.username ||
				!req.body.password) {
				throw new MissingBodyException()
			}
			const newUser = await AuthService.register(req.body.email, req.body.username, req.body.password);
			return (AuthController.login(req, res, next));
		}

		catch (e) {
			return next(e)
		}
	},

}