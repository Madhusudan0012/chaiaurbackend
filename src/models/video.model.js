import mongoose, { Schema } from "mongoose";

const videoSchema = new Schema(
    {
        videofile : {
            type : String  ,
            required : true
        },
        thumbnails: {
            
        }

}, 
{
    timestamps: true
}

)


export const Video = mongoose.model("Video" , videoSchema)