import { PrismaClient, User } from "@prisma/client";
import DuplicationException from "../exceptions/DuplicationException";
import { config } from "../../config"
import jwt, { JwtPayload } from 'jsonwebtoken'
import NotFoundException from "../exceptions/NotFoundException";
import InvalidCredentialException from "../exceptions/InvalidCredentialException";
import UnauthorizedException from "../exceptions/UnauthorizedException";

const prisma = new PrismaClient();

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
	validate(token: string):boolean{
		try{
			jwt.verify(token, config.auth.ACCESS_TOKEN)
			return true
		}catch(e){
			return false
		}
	},

	async findUser(token):Promise<User>{
		const decoded = jwt.decode(token, {json: true})
		const user = await prisma.user.findUnique({
			where: {
				id: Number(decoded.id)
			}
		})
		return user
	},

	async checkDuplicate(email:string):Promise<void>{
		const user = await prisma.user.findFirst({
			where: {
				email
			}
		})
		if(user == null)
			return
		throw new DuplicationException()
	},
	/**
	 * Creates user object using Prisma ORM
	 * @param email 
	 * @param username 
	 * @param password 
	 * @returns user object 
	 */
	async register(email:string, username:string, password:string):Promise<User> {
		await this.checkDuplicate(email)
		const user = await prisma.user.create({
			data: {
				email: email,
				username: username,
				password: password
			}
		  })
		return user;
	} ,

	async loginValidate(emailUser, password):Promise<string>{
		const user = await prisma.user.findFirst({
			where:{
				OR: [
					{email: emailUser},
					{username: emailUser}
				]
			}
		})
		if(user == null)
			throw new NotFoundException()
			
		if(user.password != password)
			throw new DuplicationException()

		const token = this.jwtGen(user)
		return token
	},
	
	/**
	 * 
	 * @param user User to sign jwt
	 * @returns Token string
	 */
	jwtGen(user:User):string{
		const data = {
			id: user.id,
			email: user.email,
			username: user.username,
			createdAt: user.createdAt
		}
		const token = jwt.sign(data, config.auth.ACCESS_TOKEN)
		return token
	}
}