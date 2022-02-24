import { Prisma, PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken'
import { json } from 'stream/consumers';

const prisma = new PrismaClient()

/**
 * An example of an authorization service to validate authorization tokens, or attempt sign ins.
 */
export const AuthService = {
	/**
	 * Validates an authorization token for authentication.
	 *  
	 * @param token Authorization token attached to the HTTP header.
	 * @return {boolean} True if their token is valid, false if it isn't.
	 */
	async validate(token) {
		const user = await prisma.token.findUnique({
			where: {
				token: token
			}
		})
		return user
	},
	/**
	 * 
	 * @param password password of a user
	 * @returns jwt token
	 */
	tokenGen({user}){
		return jwt.sign({user}, process.env.ACCESS_TOKEN)
	},
	async register({user}){
		const insertUser = await prisma.user.create({
			data: user
		})
		return insertUser
	},

}