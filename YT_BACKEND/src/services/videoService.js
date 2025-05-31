// video service ..

import mongoose from "mongoose";
import {
    checkVideoOwnership,
    deleteVideo as deleteVideoRepository,
    dislikeVideo as dislikeVideoRepository,
    getAllVideoOfChannel as getAllVideoOfChannelRepository,
    getAllVideo as getAllVideoRepository,
    getVideoById as getVideoByIdRepository,
    likeVideo as likeVideoRepository,
    searchFunctionality as searchFunctionalityRepository,
    updateVideo as updateVideoRepository,
    uploadVideo as uploadVideoRepository
} from "../repository/videoRepository.js"
import { addVideoToChannel, checkChannelOwnership, removeVideoFromChannel } from "../repository/channelRepository.js";
import { extractYouTubeVideoId } from "../utils/extractVideoId.js";
import { Channel } from "../schema/channelSchema.js";
import { getValidThumbnailUrl } from "../utils/extractThumbnail.js";
// import { Video } from "../schema/videoSchema.js";
// import { Channel } from "../schema/channelSchema.js";
/**
 * YouTube has two common URL formats for videos:
    ** (1) Standard URL:
        https://www.youtube.com/watch?v=nI8EYE3WtV0
        The video ID is in the query parameter v.

        *? eg -> 
        Protocol: https://
        Full domain name (including subdomain): www.youtube.com   -->> Specifies the protocol (secure HTTP) used to access the resource.
        Subdomain: www  -->> A subdivision of the domain, often used to indicate “World Wide Web.” It's optional and part of the full domain.
        Domain: youtube.com   --->> The main website name (YouTube's domain).
        Pathname  --> /watch --> The path on the website, points to the "watch" page.
        Query string ---> ?v=nI8EYE3WtV0  ->>Extra parameters sent to the page — here, v is the video ID parameter.

    ** (2) Shortened URL:
        https://youtu.be/nI8EYE3WtV0
        The video ID is in the path after the domain.
        
        *? eg -> 
            https://youtu.be/nI8EYE3WtV0
            protocol is https:
            hostname is youtu.be
            pathname is /nI8EYE3WtV0 — notice it always starts with a slash /
            This slash separates the domain and the path.
            doing slice(1) means takes string char from index 1 to end so here at index 0 is /
 */
// (1) upload video..
export async function uploadVideo(videoData, userId, videoFile, thumbnailFile) {
    try {

        console.log("video data in service is : ",videoData);
        // 0. Find the channel for this user (only one channel assumed here)
        const userChannel = await Channel.findOne({ owner: userId });

        if (!userChannel) {
            const error = new Error("User does not have a channel. Please create a channel before uploading videos.");
            error.status = 400;
            throw error;
        }

        // Setting channel id internally a kind of backword reference.........
        videoData.channel = userChannel._id.toString();

        const channelId = videoData.channel;
        if (!mongoose.Types.ObjectId.isValid(channelId)) {
            const error = new Error(`Sorray video Id format is incorrect plse write in mongodb format`);
            error.status = 400;
            throw error;
        }
        console.log("channel id is : ", channelId);

        // now just to double sure we will check is it same channel that we dound in db on which we are adding the videos
        /*const existingChannel = await Channel.findById(channelId);
        if (!existingChannel) {
            const error = new Error(`Sorry, channel not found with ID: ${channelId}`);
            error.status = 404;
            throw error;
        }
        we created a seprate function for checking ownership instead of writing this code at multiple places..
        */

        // step 1 => checking the channel ownership...
        await checkChannelOwnership(channelId, userId) // if not owner then it will throw error and we wil catch it.

        /*
        // step 2 => oncde the chanel ownership is okey then we will extract video id from the yt url.
        const extractedVideoId = extractYouTubeVideoId(videoData.videoUrl);
        if (!extractedVideoId) {
            const error = new Error("Invalid YouTube URL. Could not extract video ID.");
            error.status = 400;
            throw error;
        }
        // step 3 => once we get the videoId then we will set it 
        videoData.videoId = extractedVideoId;

        //step 4 => after the videoId we need to set the thumbnail url based on videoId..
        videoData.thumbnailUrl = `https://img.youtube.com/vi/${extractedVideoId}/hqdefault.jpg`;
        */

        // new logic to handel both either upload video by yt url and uplodaing file 
        // Case 1 => if user choose  direct file upload
        if (videoFile) {
            videoData.videoUrl = videoFile.path;                  // Cloudinary video URL
            videoData.videoPublicId = videoFile.filename;         // Cloudinary public ID
            videoData.uploadType = "upload";
        }
        // Case 2 => if usr choose youTube link upload
        else if (videoData.videoUrl) {
            const extractedVideoId = extractYouTubeVideoId(videoData.videoUrl);
            if (!extractedVideoId) {
                const error = new Error("Invalid YouTube URL. Could not extract video ID.");
                error.status = 400;
                throw error;
            }

            videoData.videoId = extractedVideoId;
            videoData.thumbnailUrl = `https://img.youtube.com/vi/${extractedVideoId}/hqdefault.jpg`;
            videoData.uploadType = "youtube";
        } else {
            const error = new Error("Either video file or YouTube URL must be provided.");
            error.status = 400;
            throw error;
        }

        // handling thumbnail upload........
        if (thumbnailFile) {
            videoData.thumbnailUrl = thumbnailFile.path;             // Cloudinary thumbnail URL
            videoData.thumbnailPublicId = thumbnailFile.filename;   // Cloudinary public ID
        }
        // step 5 => upload the video
        const newVideo = await uploadVideoRepository(videoData);


        // step 6 => adding the video to the channel once the video is uploadded..
        const updatedChannel = await addVideoToChannel(channelId, newVideo._id);
        return { newVideo, updatedChannel };
    } catch (error) {
        console.log("error occure in service in uploadVideo : ", error);
        throw error;
    }
}

// (2) get all video ...
export async function getAllVideo() {
    try {
        const allVideos = await getAllVideoRepository();
        return allVideos;
    } catch (error) {
        console.log("error occured in service layer in get all video : ", error);
        throw error; // throwing error back to controller..
    }
}

// (3) get video by id..
export async function getVideoById(videoId) {
    try {
        // validating the id..
        if (!mongoose.Types.ObjectId.isValid(videoId)) {
            const error = new Error(`Sorray video Id format is incorrect plse write in mongodb format`);
            error.status = 400;
            throw error;
        }
        const video = await getVideoByIdRepository(videoId);
        if (!video) {
            const error = new Error(`Sorry no video found with videoId : ${videoId}`);
            error.status = 404;
            throw error;
        }
        return video;
    } catch (error) {
        console.log("error occured in service in getVideoByid : ", error);
        throw error;
    }
}

// (4) get all video of a channel ..
export async function getAllVideoOfChannel(channelId) {
    try {
        // validating id ..
        if (!mongoose.Types.ObjectId.isValid(channelId)) {
            const error = new Error(`Sorry the channel id : ${channelId} is not in valid format plese write channel id in vlaid format`);
            error.status = 404;
            throw error;
        }
        const allVideos = await getAllVideoOfChannelRepository(channelId);
        // console.log("all videos in service layer _---> ",allVideos);
        return allVideos;
    } catch (error) {
        console.log("error occured in the service --- getAllVideoOfChannel");
        throw error;
    }
}

// (5) update video....

// export async function updateVideo(videoId, updateData, userId) {
//     try {
//         /*if (!mongoose.Types.ObjectId.isValid(userId)) {
//             const error = new Error(`Sorry current user Id : ${userId} format is not valid please write the valid mongoose id syntax`);
//             error.status = 400; // bad request
//             throw error;
//         }
//         */
//         if (!mongoose.Types.ObjectId.isValid(videoId)) {
//             const error = new Error(`Sorry current video Id : ${videoId} format is not valid please write the valid mongoose id syntax`);
//             error.status = 400; // bad request
//             throw error;
//         }
//         // checking explicitely the userId is passed from the controller or not because previously i was not passing 
//         // if (!userId) {
//         //     console.error("Missing userId in checkVideoOwnership");
//         //     const error = new Error("Internal error: user not authenticated properly");
//         //     error.status = 500;
//         //     throw error;
//         // }
//         await checkVideoOwnership(videoId, userId);

//         const updatedVideo = await updateVideoRepository(videoId, updateData);
//         if (!updatedVideo) {
//             const error = new Error(`Sorry no video found in the database for this videoId : ${videoId}`);
//             error.status = 404;
//             throw error;
//         }
//         return updatedVideo;
//     } catch (error) {
//         console.log("error occured in the service : update video and error is : ", error);
//         throw error; // throwing error back to controole.
//     }
// }


export async function updateVideo(videoId, updateData, userId) {
    try {
        if (!mongoose.Types.ObjectId.isValid(videoId)) {
            const error = new Error(`Invalid video ID format: ${videoId}`);
            error.status = 400;
            throw error;
        }

        await checkVideoOwnership(videoId, userId);

        const existingVideo = await getVideoById(videoId); // needed to fallback to old values

        const newData = {
            title: updateData.title !== "" ? updateData.title : existingVideo.title,
            description: updateData.description !== "" ? updateData.description : existingVideo.description,
            category: updateData.category !== "" ? updateData.category : existingVideo.category,
            thumbnailUrl: updateData.thumbnailUrl !== ""
                ? getValidThumbnailUrl(updateData.thumbnailUrl)
                : existingVideo.thumbnailUrl,
        };

        const updatedVideo = await updateVideoRepository(videoId, newData);

        if (!updatedVideo) {
            const error = new Error(`No video found for ID: ${videoId}`);
            error.status = 404;
            throw error;
        }

        return updatedVideo;
    } catch (error) {
        console.log("Error in updateVideo service:", error);
        throw error;
    }
}


// (6) video service ...

export async function deleteVideo(videoId, userId) {
    try {
        if (!mongoose.Types.ObjectId.isValid(videoId)) {
            const error = new Error(`Sorry current video Id : ${videoId} format is not valid please write the valid mongoose id syntax`);
            error.status = 400;
            throw error;
        }
        // Checking videoownership
        await checkVideoOwnership(videoId, userId);
        const deletedVideo = await deleteVideoRepository(videoId);
        if (!deletedVideo) {
            const error = new Error(`Sorry video with id  ${videoId} not found or already deleted`);
            error.status = 404; // not found
            throw error;
        }
        const channelId = deletedVideo.channel;
        console.log("channel id in service is : ", channelId);
        const updatedChannel = await removeVideoFromChannel(channelId, videoId)
        return { deletedVideo, updatedChannel };
    } catch (error) {
        console.log("error in service in deletevideo and error is : ", error);
        throw error;
    }
}


// (7) search functionality....

// export async function searchFunctionality(search, category) {
//     try {
//         const allFilteredVideos = await searchFunctionalityRepository(search, category);
//         if (allFilteredVideos.length === 0) {
//             // when array is empty...
//             let errorMessage = "Sorry, no videos found";

//             if (search && category && category !== "All") {
//                 errorMessage = `No videos found for search "${search}" and category "${category}"`;
//             } else if (search) {
//                 errorMessage = `No videos found for search "${search}"`;
//             } else if (category && category !== "All") {
//                 errorMessage = `No videos found for category "${category}"`;
//             }

//             const error = new Error(errorMessage);
//             error.status = 404;
//             throw error;
//         }
//         return allFilteredVideos;
//     } catch (error) {
//         console.log("error occur in service layer in search functionality : ", error);
//         throw error;
//     }
// }


// (7) search functionality — SERVICE


export async function searchFunctionality(search, category) {
    try {
        const allFilteredVideos = await searchFunctionalityRepository(search, category);

        if (allFilteredVideos.length === 0) {
            let errorMessage = "Sorry, no videos found";

            if (search && category && category !== "All") {
                errorMessage = `No videos found for search "${search}" and category "${category}"`;
            } else if (search) {
                errorMessage = `No videos found for search "${search}"`;
            } else if (category && category !== "All") {
                errorMessage = `No videos found for category "${category}"`;
            }

            const error = new Error(errorMessage);
            error.status = 404;
            throw error;
        }

        return allFilteredVideos;

    } catch (error) {
        console.log("Error in service [searchFunctionalityService]:", error);
        throw error;
    }
}


// (8) liked by video .......
/**
 * there might be a question why we are chekcing for video exist or not becsuase in frontend a video will only be shown when it exsit but to make sure that our backend work correctly it might be caase when we manually send the videoId...and we send videoId that is deelte directly on likeed video route in that case our code will break in backend so to just make sure that code does not breake we will check for video id .. and obisouly in frontend a video will only come on videoplayer page when it exist --- but this is only valid in fronted.. kal ko hum like video wale route pe request dierectly bhii to bez saktae hae naa...
 */

export async function likeVideo(videoId,userId){
    try{
        // a simple validation to check videoId..
        if(!mongoose.Types.ObjectId.isValid(videoId)){
            const error = new Error(`Sorry current video Id : ${videoId} format is not valid please write the valid mongoose id syntax`);
            error.status = 400;
            throw error;
        }
        const video=await likeVideoRepository(videoId);
        // checking if video is not found then ..
        if(!video){
            const error=new Error(`Sorry the video on which we want to like is most likely deleted or does not exist`);
            error.status=404;
            throw error; // catught by catch and then throw to controller...
        }

        // first check is current user already liked or not ..
        // const hasLiked= Video.likedBy.includes(userId); // here we are directly querying on shcema it would be better if we do it in repository and return value of hasLiked in service. --- no need to return hasLiked in service --- write whole logici n repository.. ---- no no we are chekcing for single video so indeed logic will be in searvice..

        // step 1 check user did liked already or not 

        // const hasLiked= video.likedBy.includes(userId);
        // if (hasLiked) {
        //     // If user already liked, remove the like (toggle off)
        //     video.likedBy.pull(userId);
        //     video.likes -= 1;
        // } else {
        //     // If not liked, add like
        //     video.likedBy.push(userId);
        //     video.likes += 1;
        // } 
        
        const hasLiked = video.likedBy.includes(userId);
        const hasDisliked = video.dislikedBy.includes(userId); // Make sure 'dislikedBy' array exists in your schema

        if (hasLiked) {
            // User already liked, so remove the like (toggle off)
            video.likedBy.pull(userId);
            video.likes -= 1;
        } else {
            // Add like
            video.likedBy.push(userId);
            video.likes += 1;

            // If user had disliked before, remove that
            if (hasDisliked) {
                video.dislikedBy.pull(userId);
                video.dislikes -= 1;
            }
        }
        // keep in mind we need to send the updated video that has like and dislike count ..

        // Save updated video
        await video.save();  // IMPORTANT to Save changes in DB
        return video;
    }catch(error){
        console.log("srrory errro occurend in searvice of liked by : ",error);
        throw error;
    }
}

// (9) dislike video 

export async function dislikeVideo(videoId, userId){
    try{
        if(!mongoose.Types.ObjectId.isValid(videoId)){
            const error = new Error(`Sorry current video Id : ${videoId} format is not valid please write the valid mongoose id syntax`);
            error.status = 400;
            throw error;
        }
        const video=await dislikeVideoRepository(videoId,userId);
        if(!video){
            const error=new Error(`sorray the video which we want is most likely deleted or disliked already`);
            error.status=404;
            throw error;
        }

        // const hasDisliked= video.dislikedBy.includes(userId);
        // if (hasDisliked) {
        //     // if User already disliked then remove dislike
        //     video.dislikedBy.pull(userId);
        //     video.dislikes -= 1;
        // } else {
        //     // if user did not then add dislike ocunt.
        //     video.dislikedBy.push(userId);
        //     video.dislikes += 1;
        // }

        const hasDisliked = video.dislikedBy.includes(userId);
        const hasLiked = video.likedBy.includes(userId);

        if (hasDisliked) {
            // Toggle off dislike
            video.dislikedBy.pull(userId);
            video.dislikes -= 1;
        } else {
            // Add dislike
            video.dislikedBy.push(userId);
            video.dislikes += 1;

            // Remove like if already liked
            if (hasLiked) {
                video.likedBy.pull(userId);
                video.likes -= 1;
            }
        }
        await video.save();
        return video;
    }catch(error){
        console.log("srrory errro occurend in searvice of dislike by : ", error);
        throw error;
    }
}