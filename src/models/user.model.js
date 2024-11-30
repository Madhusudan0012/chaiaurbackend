import mongoose , {Schema} from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const userSchema = new Schema(
    {
        username :  {
            type : String, 
            required : true, 
            unique : true , 
            lowercase : true , 
            trim : true, 
            index : true
        },
        email :  {
            type : String, 
            required : true, 
            unique : true , 
            lowercase : true , 
            trim : true
            
        },
        fullname :  {
            type : String, 
            required : true, 
            trim : true, 
            
        },
        avatar :  {
            type : String,  //cloudary url 
            required : true, 
            
            
        },
        coverImage :{
            type: String, 


        }, 
        watchHistory: [
            {
                type : Schema.Types.ObjectId ,
                ref : "Video"
            }
        ], 
        password : {
            type : String, 
            required : [true , "Password is Required "]

        }, 
        refreshTokens :{
            type : String
        }
},{
    timestamps : true
}
)

userSchema.pre("save" , async  function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password , 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password , this.password)
}

// const jwt = require('jsonwebtoken');

userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET, // Ensure this secret key is set in your environment variables
        { expiresIn: process.env.ACCESS_TOKEN_SECRET }     // Optional: Set an expiration time for the token
    );
};



userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET, // Ensure this secret key is set in your environment variables
        { expiresIn: process.env.REFRESH_TOKEN_SECRET }     // Optional: Set an expiration time for the token
    );
    
}
export const User = mongoose.model("User" , userSchema);
