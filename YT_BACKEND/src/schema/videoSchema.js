// now we will create video schema..

import mongoose from "mongoose";

// a video will have : title, thumbnailUrl, description, a backwrod reference to which channel this video belongs, no of views , no of likes , no of dislikes , may be upload date, and a forward reference to comments.

const videoSchema= new mongoose.Schema({
    // title of the video...
    title:{
        type:String,
        required:true,
    },
    // thumbnail image url for the video...
    thumbnailUrl:{
        type:String,
        required:true
    },
    // description about video..
    description:{
        type:String
    },
    // category of video
    category:{
        type: String,
        // default: "Entertainment",
        default:"lovely"
    },
    // a backwrod reference to channel so that we know which channel owns this video.
    channel:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Channel',
        required:true
    },
    // total views default will be 0.
    views:{
        type:Number,
        default:0
    },
    // Number of likes ...
    likes:{
        type:Number,
        default:0
    },
    // number of dislikes..
    dislikes:{
        type:Number,
        default:0
    },
    // date when the video was uploaded..
    uploadDate:{
        type:Date,
        default:Date.now
    },
    // a forwared reference to comments like all comments on this video which is in an array..
    // we will not set it as requrired becuase it might be the case where video is not having any comments...
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    }]
});

// now we will create the model or Video collection using this schema..
export const Video=mongoose.model('Video',videoSchema);



/**
 * Minor suggestions (optional):
You might want to add indexing on channel or uploadDate later for performance if you query videos by channel or date frequently.

Consider adding a validation on URLs (thumbnailUrl) if you want strict checking (but not necessary right now).
 */