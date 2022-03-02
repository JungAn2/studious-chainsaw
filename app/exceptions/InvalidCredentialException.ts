import BaseException from "./BaseException";

export default class InvalidCredentialException extends BaseException{
    constructor(message: string = "Invalid credentials"){
        super(message, 422)
    }
}