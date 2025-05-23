// comment Repository....

/**
 * we need to create 
 * we can go for /:id but just to make it more clear ... or check in fronted .. if its fine with commentId then go for it else we will change to id ... (check later)
 * (1) create comment -> /api/comment/:videoId
 * (2) get comment by video id -> /api/comment/:videoId
 * (3) update comment by comment id -> /api/comment/:commentId
 * (4) delete comment by comment id -> /api/comment/:commentId
 */


import { Comment } from '../schema/commentSchema.js';
import {Video} from '../schema/videoSchema.js';

// (1) create a comment when video id is passed ... because we will attach each comment to a specific video..

export async function createComment(text, userId, videoId) {
    try {
        const newComment = await Comment.create({ text, userId, videoId });
        return newComment;
    } catch (error) {
        console.log("error occure in repository create comment", error);
        throw error;
    }
}

// (1a) once the comment is creted we need to add it in the video for which it is created..
export async function addCommentToVideo(videoId, commentId) {
    try {
        // now first we will find the video whose id we have ...
        const updatedVideo = await Video.findByIdAndUpdate(
            videoId,
            { $push: { comments: commentId } },
            { new: true }
        );

        // checking if video is found or not ...
        if (!updatedVideo) {
            const error = new Error("Video not found");
            error.status = 404;
            throw error;
        }
        return updatedVideo;
    } catch (error) {
        console.log("error occured in addcommenttovideo in repository : ",error);
        throw error;
    }
}

// (2) get comment by video id 

export async function getCommentByVideoId(videoId){
    try{
        // const allComments=await Comment.find({videoId}).populate('userId','userName avatar').sort({timestamp:-1});
    const allComments = await Comment.find({ videoId }).populate('userId', 'username avatar').sort({ timestamp: -1 });
    return allComments;
    }catch(error){
        console.log("error occured in getComemntByVideoId in repository : ",error);
        throw error;
    }
}

// (3) update comment by id .

export async function updateCommentById(commentId,text){
    try{
        const updatedComment=await Comment.findByIdAndUpdate(commentId,{text},{new:true});
        return updatedComment;
    }catch(error){
        console.log("eror in repository in update comment",error);
        throw error;
    }
}

// (4) delete comment by id ...

export async function deleteCommentById(commentId){
    try{
        const deletedComment=await Comment.findByIdAndDelete(commentId);
        return deletedComment;
    }catch(error){
        console.log("sorry errro in repository in deletecommentbyid : ",error);
        throw error;
    }
}

// (4a) require ment when deleting a comment we need to update the video
export async function removeCommentFromVideo(videoId, commentId) {
    try {
        // Using $pull to remove the commentId from the comments array
        const updatedVideo = await Video.findByIdAndUpdate(
            videoId,
            { $pull: { comments: commentId } },
            { new: true }
        );

        return updatedVideo;
    } catch (error) {
        console.log("Error in video.repository removeCommentFromVideo:", error);
        throw error;
    }
}