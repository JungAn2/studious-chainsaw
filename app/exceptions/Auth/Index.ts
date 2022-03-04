import { NextFunction } from "express";
import DuplicationException from "../DuplicationException";
import MissingBodyException from "../MissingBodyException";

const UserExist = String(Error("UserExist"))
const MissingBody = String(Error("MissingBody"))
const NoUserInput = String(Error("NoUserInput"))
const NoPassword = String(Error("NoPassword"))


export default function AuthExceptionHandler(error: Error, next:NextFunction){
    const e = String(error)
    if(e == UserExist)
        return next(new DuplicationException())
    if(e == MissingBody)
        return next(new MissingBodyException())
    if(e == NoUserInput)
        return next(new MissingBodyException())
    if(e == NoPassword)
        return next(new MissingBodyException())
}