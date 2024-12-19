//only verify user exist or not 
import {asycHandler} from "../utils/asycHandler";


export const verifyJWT = asycHandler(async(req, res , next) =>{
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer" , "")
})