import BaseException from "./BaseException";

export default class DuplicationException extends BaseException{
    constructor(message: string = "Duplication"){
        super(message, 403)
    }
}