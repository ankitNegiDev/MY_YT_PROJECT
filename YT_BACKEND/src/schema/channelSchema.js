// creating a channel Scheam...

import mongoose from "mongoose";

const channelSchema= new mongoose.Schema({
    // name of the channel
    channelName:{
        type:String,
        required:true
    },
    // description.
    description:{
        type:String
    },
    // a url for channel banner image
    channelBanner:{
        type:String
    },
    // public_id of the channel banner image from Cloudinary
    channelBannerPublicId: {
        type: String
    },
    //a backword reference so that we know who is the owner of this channel.
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    // no of subscribers this channel have.
    subscribers:{
        type:Number,
        default:0
    },
    // forward reference like all the videos that this channel have.. so we will create a array most probabbly.
    videos:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Video' // here we set the reference to Video collection.
    }]
    

},{timestamps:true});

// now we will create a model or collection namved Channel using this channel scheam..

export const Channel=mongoose.model('Channel',channelSchema);