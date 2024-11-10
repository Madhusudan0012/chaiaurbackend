import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoSchema = new Schema(
    {
        videofile : {
            type : String  ,//cloudinary url
            required : true
        },
        thumbnails: {
            type : String  ,//cloudinary url
            required : true
            
        },
        title: {
            type : String  ,
            required : true
            
        },
        description: {
            type : String  ,
            required : true
            
        },
        duration: {
            type : Number ,//cloudinary url
            required : true
            
        }, 
        views:{
            type : Number,
            default: 0
        },
        isPublished :{
            type: Boolean,
            default: true
        }, 
        owner:{
            type: Schema.Types.ObjectId,
            ref : "User"
        }

}, 
{
    timestamps: true
}

)

export const Video = mongoose.model("Video" , videoSchema)//refrece ke liye we use capital V
