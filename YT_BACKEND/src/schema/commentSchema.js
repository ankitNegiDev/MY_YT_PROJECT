// now creating the comment schema...

import mongoose from "mongoose";

// a comemnt will ahve : text or content , a backword reference to user who posted this comment, and a timestamp when this comment was added..

// Comment schema:
// - text: the content of the comment (required)
// - userId: backward reference to the User who posted this comment (required)
// - timestamp: when the comment was created, defaults to current date/time

const commentSchema= new mongoose.Schema({
    text:{
        type:String,
        required:true
    },
    videoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video',  // or whatever your video collection is named
        required: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,// storing ObjectId referencing User document
        ref: 'User', // reference to User collection for population
        required:true
    },
    timestamp:{
        type:Date,
        default: Date.now // sets default timestamp to current time
    }
});

// now we will create the Comment collection using this chema..

export const Comment=mongoose.model('Comment',commentSchema);