import { asyncHandler } from "../utils/asycHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User } from "../models/user.model.js"
import {Apiresponse} from "../utils/ApiResponse.js"

const registerUser = asyncHandler( async ( req, res)=>{
    //get a details from frontend
    //validations- not empty
    //check if user already exist or not 
    //check from username , email
    //check for images , check for avatar 
     //upload image on cloudinary
     //Create user Object - create entry in db
     //remove password and refresh token field from response
     //check for user creation 
     //return response 
     //return res
     //Step by Step write what we can do 
       


    const{fullname , email , username , password } = req.body
    console.log("email:" , email );
    console.log("password" , password );

    if([
        fullname , email , username , password 
    ].some((field)=> field?.trim() === "") 
)   {
    throw new ApiError(400 , "All fields are required");

    }

    
    const existedUser = User.findOne({
        $or: [{username} , {email}]
    })
    console.log(existedUser);


    if(existedUser){
        throw new ApiError(409 , "User with Email or username already exist")
    }
     
   const avatarLocalPath =  req.files?.avatar[0]?.path;
//    console.log(avatarLocalPath);
   const coverImageLocalPath = req.files?.coverImage[0]?.path;

   if(!avatarLocalPath){
    throw new ApiError(400 , "Avatar file is required")
   }

    const avatar = await uploadCloudinary(avatarLocalPath)
    const coverImage = await uploadCloudinary(coverImageLocalPath)


    if(!avatar){
        throw new ApiError(400 , "Avatar file is required")
    }

    const User = await User.create({
        fullname, 
        avatar :   avatar.url , 
        coverImage : coverImage.url || "",
        email, 
        password,
        username : username.toLowerCase()
    })

    const createdUser = await User.findById(User._id).select(
        "-password -refreshToken"
    )
    if(!createdUser){
        throw new ApiError(500 , "Something went wrong with the software developer" )
    }

    return res.status(201).json(
        new ApiResponse(200 , createdUser ,  "User Registerd Successfully ")
    );
})


export {
    registerUser,
}
