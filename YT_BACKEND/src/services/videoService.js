// video service ..

import mongoose from "mongoose";
import { 
    checkVideoOwnership,
    deleteVideo as deleteVideoRepository,
    getAllVideoOfChannel as getAllVideoOfChannelRepository,
    getAllVideo as getAllVideoRepository,
    getVideoById as getVideoByIdRepository,
    updateVideo as updateVideoRepository,
    uploadVideo as uploadVideoRepository 
} from "../repository/videoRepository.js"
import { addVideoToChannel, checkChannelOwnership, removeVideoFromChannel } from "../repository/channelRepository.js";
// import { Channel } from "../schema/channelSchema.js";

// (1) upload video..
export async function uploadVideo(videoData,userId){
    try{
        const channelId=videoData.channel;
        if(!mongoose.Types.ObjectId.isValid(channelId)){
            const error = new Error(`Sorray video Id format is incorrect plse write in mongodb format`);
            error.status = 400;
            throw error;
        }
        console.log("channel id is : ",channelId);

        // now just to double sure we will check is it same channel that we dound in db on which we are adding the videos
        /*const existingChannel = await Channel.findById(channelId);
        if (!existingChannel) {
            const error = new Error(`Sorry, channel not found with ID: ${channelId}`);
            error.status = 404;
            throw error;
        }
        we created a seprate function for checking ownership instead of writing this code at multiple places..
        */
        // checking the channel ownership...
        await checkChannelOwnership(channelId,userId)
        

        const newVideo = await uploadVideoRepository(videoData);

        
        // adding the video to the channel once the video is uploadded..
        const updatedChannel = await addVideoToChannel(channelId,newVideo._id);
        return {newVideo,updatedChannel};
    }catch(error){
        console.log("error occure in service in uploadVideo : ",error);
        throw error;
    }
}

// (2) get all video ...
export async function getAllVideo(){
    try{
        const allVideos=await getAllVideoRepository();
        return allVideos;
    }catch(error){
        console.log("error occured in service layer in get all video : ",error);
        throw error; // throwing error back to controller..
    }
}

// (3) get video by id..
export async function getVideoById(videoId){
    try{
        // validating the id..
        if(!mongoose.Types.ObjectId.isValid(videoId)){
            const error=new Error(`Sorray video Id format is incorrect plse write in mongodb format`);
            error.status=400;
            throw error;
        }
        const video=await getVideoByIdRepository(videoId);
        if(!video){
            const error=new Error(`Sorry no video found with videoId : ${videoId}`);
            error.status=404;
            throw error;
        }
        return video;
    }catch(error){
        console.log("error occured in service in getVideoByid : ",error);
        throw error;
    }
}

// (4) get all video of a channel ..
export async function getAllVideoOfChannel(channelId){
    try{
        // validating id ..
        if(!mongoose.Types.ObjectId.isValid(channelId)){
            const error=new Error(`Sorry the channel id : ${channelId} is not in valid format plese write channel id in vlaid format`);
            error.status=404;
            throw error;
        }
        const allVideos=await getAllVideoOfChannelRepository(channelId);
        // console.log("all videos in service layer _---> ",allVideos);
        return allVideos;
    }catch(error){
        console.log("error occured in the service --- getAllVideoOfChannel");
        throw error;
    }
}

// (5) update video....

export async function updateVideo(videoId,updateData,userId){
    try{
        /*if (!mongoose.Types.ObjectId.isValid(userId)) {
            const error = new Error(`Sorry current user Id : ${userId} format is not valid please write the valid mongoose id syntax`);
            error.status = 400; // bad request
            throw error;
        }
        */
        if(!mongoose.Types.ObjectId.isValid(videoId)){
            const error=new Error(`Sorry current video Id : ${videoId} format is not valid please write the valid mongoose id syntax`);
            error.status=400; // bad request
            throw error;
        }
        // checking explicitely the userId is passed from the controller or not because previously i was not passing 
        // if (!userId) {
        //     console.error("Missing userId in checkVideoOwnership");
        //     const error = new Error("Internal error: user not authenticated properly");
        //     error.status = 500;
        //     throw error;
        // }
        await checkVideoOwnership(videoId, userId);

        const updatedVideo=await updateVideoRepository(videoId,updateData);
        if(!updatedVideo){
            const error=new Error(`Sorry no video found in the database for this videoId : ${videoId}`);
            error.status=404;
            throw error;
        }
        return updatedVideo;
    }catch(error){
        console.log("error occured in the service : update video and error is : ",error);
        throw error; // throwing error back to controole.
    }
}

// (6) video service ...

export async function deleteVideo(videoId,userId){
    try{
        if (!mongoose.Types.ObjectId.isValid(videoId)) {
            const error = new Error(`Sorry current video Id : ${videoId} format is not valid please write the valid mongoose id syntax`);
            error.status = 400;
            throw error;
        }
        // Checking videoownership
        await checkVideoOwnership(videoId, userId);
        const deletedVideo=await deleteVideoRepository(videoId);
        if(!deletedVideo){
            const error = new Error(`Sorry video with id  ${videoId} not found or already deleted`);
            error.status=404; // not found
            throw error;
        }
        const channelId=deletedVideo.channel;
        console.log("channel id in service is : ",channelId);
        const updatedChannel=await removeVideoFromChannel(channelId,videoId)
        return {deletedVideo,updatedChannel};
    }catch(error){
        console.log("error in service in deletevideo and error is : ",error);
        throw error;
    }
}