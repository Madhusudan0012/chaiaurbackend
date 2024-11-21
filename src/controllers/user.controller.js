import { asyncHandler } from "../utils/asycHandler.js";

const registerUser = asyncHandler( async ( req, res)=>{
    //get a details from frontend
    //validations- not empty
    //check if user already exist or not 
    //check from username , email
     //upload image on cloudinary
     //Create user Object - create entry in db
     //remove password and refresh token field from response
     //check for user creation 
     //return response 
     //return res
    const{fullname , email , username , password } = req.body
    console.log("email: " , email );
    



})


export {
    registerUser,
}
