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
	validate(token: String): boolean {
		if (token.length != 0) {
			return true;
		}
		return false;
	},
	/**
	 * 
	 * @param password password of a user
	 * @returns jwt token
	 */
	tokenGen({user}){
		return jwt.sign({user}, process.env.ACCESS_TOKEN)
		/*return new Promise((resolve, reject) => {
			jwt.sign({user}, process.env.ACCESS_TOKEN, function(err, token2){
				if(err) reject(err)
				else resolve(token2)
			})
		})*/
	},
	async register({user}){
		const insertUser = await prisma.user.create({
			data: user
		})
		return insertUser
	}
}