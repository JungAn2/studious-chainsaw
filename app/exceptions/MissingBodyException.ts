import BaseException from "./BaseException";

export default class MissingBodyException extends BaseException{
    constructor(message:string = "Body not found"){
        super(message, 404)
    }
}