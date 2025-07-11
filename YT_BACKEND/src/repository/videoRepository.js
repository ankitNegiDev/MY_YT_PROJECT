// video repository....

/**
 * (1) first we need to create a function to upload the video or create the video -> /api/video/ -> post request..
 * (2) another function to get all video -> /api/video -> get request.
 * (3) getVideoById -> /api/video/videoId -> get request.
 * (4) get all video by channel id -> since our channel has a backword reference to we can know who is the owner of this channel. -> /api/video/channel/channelId -> get request.
 * (5) update video -> we will see later what we need to allow for update
 * (6) delete video -> 
 */

import {Video} from '../schema/videoSchema.js'

// (1) upload video or create video..
/**
 * in video we will allowed to update only  ['title', 'description', 'thumbnailUrl', 'category']
 */

export async function uploadVideo(videoData){
    try{
        const newVideo=await Video.create(videoData);
        return newVideo;
    }catch(error){
        console.log("error occured in the repository in upload video : ",error);
        throw error; // throw error back to service layer..
    }
}


// (2) get all video.. get request on /videos

/**
 *  for the first time when a user will upload video from its channel then video will have channel id right and when we will do get all video that means in db fetch all video but we can identity fy which video belongs to which channel  by just id --> that's why we are populating the channel but only channel name..
 */
export async function getAllVideo(){
    try{
        // const allVideo=await Video.find().populate("channel","channelName");
        // const allVideo = await Video.find().populate("channel", "channelName");
        const allVideo = await Video.find()
            .populate({
                path: "channel",
                select: "channelName owner", // Populate channelName + owner field
                populate: {
                    path: "owner",
                    model: "User",
                    select: "name avatar email",
                },
            });
        return allVideo;
    }catch(error){
        console.log("error occur in getAllVideo in repository : ",error);
        throw error;
    }
}

// (3) getVideo by id ...
/**
 * no protected route for it api will be /video/videoid.. bu we will send id...
 */

export async function getVideoById(videoId){
    try{
        // const video=await Video.findById(videoId).populate('channel').populate('comments');
        const video = await Video.findById(videoId)
            .populate({
                path: 'channel',
                select: 'channelName owner',  // only channel name and owner
                populate: {
                    path: 'owner',
                    model: 'User',
                    select: 'name avatar ', // only name , avatar --- eamil is not required here 
                }
            })
            .populate({
                path: 'comments',
                populate: {
                    path: 'userId',
                    model: 'User',
                    select: 'name avatar',
                }
            });

        return video;
    }catch(error){
        console.log("error occured in repository  in getVideo by id : ",error);
        throw error;
    }
}

// (4) get all video of a channel ....
export async function getAllVideoOfChannel(channelId){
    try{
        const allVideos=await Video.find({channel:channelId});
        // console.log("all videos in repository",allVideos);
        return allVideos;
    }catch(error){
        console.log("error occur in the getAllVideoOfChannel in repository layer : ",error);
        throw error; // throwing error back to service..
    }
}

// (5) update video ... of a channel ---> only loged in user . /:id -> put request..

export async function updateVideo(videoId, updateData){
    try{
        const updatedVideo= await Video.findByIdAndUpdate(videoId,updateData,{new:true});
        return updatedVideo;
    }catch(error){
        console.log("error occured in repository in updateVideo : ",error);
        throw error;
    }
}

// (6) delete video --- of a channel ---> only loged in user .. /:id -> delete request..

export async function deleteVideo(videoId){
    try{
        const deletedVideo=await Video.findByIdAndDelete(videoId);
        return deletedVideo;
    }catch(error){
        console.log("error in repository in delete video : ",error);
        throw error;
    }
}

// ----------------------------- reqirement functions..

// this we need because it might be possible naa that loged in user try to update someone other channel so we will protect it..
// Ownership check Is this video owned by this user?
export async function checkVideoOwnership(videoId, userId) {
    //! check it if there is need to convert it in string .. cureently i amd doing it later but check..
    // const videoIdStr = videoId.toString();
    // const userIdStr = userId.toString();

    console.log("userId in check video ownership : ",userId);
    // checking video ownership.. (internally we are matching the channel with user (loged in..))
    if (!userId) {
        console.error("Missing userId in checkVideoOwnership plse check for that place where from where u are calling it check its parent is it sending userId or not ...");
        const error = new Error("Internal error user not authenticated properly  Missing userId in checkVideoOwnership plse check for that place where from where u are calling checkVideoOwnership (update , delete video).. check its parent is it sending userId or not");
        error.status = 500;
        throw error;
    }

    if (!videoId) {
        console.error("Missing video in checkVideoOwnership   plse check for that place where from where u are calling checkVideoOwnerShip (update,delete video) check its parent is it sending userId or not ...");
        const error = new Error("Internal error: user not authenticated properly");
        error.status = 500;
        throw error;
    }

    const video = await Video.findById(videoId).populate('channel');

    
    if (!video) {
        const error = new Error("Video not found");
        error.status = 404;
        throw error;
    }

    const channel = video.channel;
    console.log("channel in video ownership is : ",channel);
    console.log("channel.owner in video ownership is : ",channel.owner);

    if (!channel || !channel.owner || channel.owner.toString() !== userId.toString()) {
        const error = new Error("Unauthorized: You do not own this video.");
        error.status = 403;
        throw error;
    }

    return video;
}

/**
 * keep in mind while uploading we need the channel ownership check like is this is the channel that owns the this video..
 * while updating and deleting we need channelownership and video ownership check..
 */


//! check for search functionality ..... instead of creting it in fronted crete it in backend check it later.....
//! check for do i need to give like -> incriment and decriment kind of ufnctionality for likes ?? check and for subscribe also ??? check these .....  once u done with basic mvp then think about these feature in v1...
// for now our backend is done..


// video search and filter functionality ---
/**
 * we can do it inside the getAll video but since currently we want to show all video even if the user is not loged in if we do later changes as like in real yt happen where user can't see video on homepage until he is not loged in.. something ....
 */

// export async function searchFunctionality(search,category){
//     try{
//         let query={};
//         // this is if user type something in search box and press enter..
//         if(search){
//             query.title = { $regex: search, $options: "i" }; // case-insensitive title search
//         }
//         if (category && category !== "All") {
//             query.category = category;
//         }
//         const allFilteredVideos=await Video.find(query).populate('channel');
//         return allFilteredVideos;
//     }catch(error){
//         console.log("sorry error occur in repository in search functionality",error);
//         throw error;
//     }
// }


// (7) search functionality — REPOSITORY

export async function searchFunctionality(search, category) {
    try {
        const query = {};

        if (search) {
            query.title = { $regex: search, $options: "i" }; // case-insensitive title search
        }

        if (category && category !== "All") {
            query.category = category;
        }

        // const allFilteredVideos = await Video.find(query).populate('channel');
        const allFilteredVideos = await Video.find(query)
            .populate({
                path: "channel",       // first populate the channel
                populate: {
                    path: "owner",     // then populate the owner inside the channel
                    model: "User"      // assuming the model name for user is "User"
                }
            });

        return allFilteredVideos;

    } catch (error) {
        console.log("Error in repository [searchFunctionalityRepository]:", error);
        throw error;
    }
}


// like video

// (8) like video -----

export async function likeVideo(videoId){
    try{
        const video=await Video.findById(videoId);
        console.log("video for likedby in repository is : ",video);

        /*
        ! keep in mind we are not doing it on shcema level we are chekcing for the single videeo so logic will be written service..
        // check for does user already likes or not ...
        const hasLiked=Video.likedBy.includes(userId);
        console.log("value of has liked in repository is : ",hasLiked);
        // if user already liked then remove the like count .
        if(hasLiked){
            video.likedBy.pull(userId);
            Video.likes = Video.likes-1;
        }else{
            // if user did not liked then add the like count.
            Video.likedBy.push(userId);
            Video.likes += 1;
        }
        */

        return video;
    }catch(error){
        console.log("sorry error occured in repository in livked by : ",error);
        throw error;
    }
}


// (9) dislike the video ---- 

export async function dislikeVideo(videoId){
    try {
        const video = await Video.findById(videoId);
        console.log("video for dislike in repository is : ", video);
        return video;
    } catch (error) {
        console.log("sorry error occured in repository in dislike video by : ", error);
        throw error;
    }
}