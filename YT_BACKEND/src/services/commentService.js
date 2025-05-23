// comment service..

import mongoose from "mongoose";
import {
    addCommentToVideo,
    createComment as createcommentRepository,
    deleteCommentById as deleteCommentByIdRepository,
    getCommentByVideoId as getCommentByVideoIdRepository,
    removeCommentFromVideo,
    updateCommentById as updateCommentByIdRepository

} from "../repository/commentRepository.js";

// (1) create comment.

export async function createComment(text, userId, videoId) {
    try {
        // checking userId and vidoId.
        if (!mongoose.Types.ObjectId.isValid(videoId)) {
            const error = new Error(`Sorry current video Id : ${videoId} format is not valid please write the valid mongoose id syntax`);
            error.status = 400;
            throw error;
        }
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            const error = new Error(`Sorry current user Id : ${userId} format is not valid please write the valid mongoose id syntax`);
            error.status = 400;
            throw error;
        }
        const newComment = await createcommentRepository(text, userId, videoId);
        const commentId = newComment._id;
        // now once the comment is created we need to add it in video for which it is added..
        if (!mongoose.Types.ObjectId.isValid(commentId)) {
            const error = new Error(`Invalid commentId format: ${commentId}`);
            error.status = 400;
            throw error;
        }
        // adding comment in video a reference...
        const updatedVideo = await addCommentToVideo(videoId, commentId);
        return {newComment,updatedVideo};
    } catch (error) {
        console.log("error occured in service layer : ", error);
        throw error;
    }
}


// (2) get comments by video id ...

export async function getCommentByVideoId(videoId) {
    try {
        if (!mongoose.Types.ObjectId.isValid(videoId)) {
            const error = new Error(`Sorry the video id : ${videoId} is not in valid format plese write channel id in vlaid format`);
            error.status = 404;
            throw error;
        }
        const allComments = await getCommentByVideoIdRepository(videoId);
        return allComments;
    } catch (error) {
        console.log("error in service in getcommentby video id : ", error);
        throw error;
    }
}

// (3) update comment by id ..

export async function updateCommentById(commentId,text){
    try{
        if (!mongoose.Types.ObjectId.isValid(commentId)) {
            const error = new Error(`Sorry the comment id : ${commentId} is not in valid format plese write comment id in vlaid format`);
            error.status = 404;
            throw error;
        }
        const updatedComment=await updateCommentByIdRepository(commentId,text);
        if(!updatedComment){
            const error = new Error("Comment not found");
            error.status = 404;
            throw error;
        }

        return updatedComment;
    }catch(error){
        console.log("error occure in service updateComment by id : ",error);
        throw error;
    }
}

// (4) delete comment by id ..

export async function deleteCommentById(commentId){
    try{
        if (!mongoose.Types.ObjectId.isValid(commentId)) {
            const error = new Error(`Sorry the comment id : ${commentId} is not in valid format plese write comment id in vlaid format`);
            error.status = 404;
            throw error;
        }
        const deletedComment=await deleteCommentByIdRepository(commentId);
        if (!deletedComment) {
            const error = new Error(`Comment not found in service..check for comment id : ${commentId}`);
            error.status = 404;
            throw error;
        }
        // const commentId=deletedComment._id;
        console.log("deleted comment in service is :",deletedComment);
        const videoId=deletedComment.videoId;
        const updatedVideo = await removeCommentFromVideo(videoId,commentId);
        return {deletedComment,updatedVideo};
    }catch(error){
        console.log("error occured in service deleteCommentById : ",error);
        throw error;
    }
}


/**
 ** Why to write ownership check in service layer even though we create seprate function or middleware for ownership cheks...
Ownership check in service layer acts as a defense-in-depth measure.
Sometimes you might call the service function from other places (not just HTTP routes).

Or you might forget to add middleware in some routes accidentally.

Having ownership checks in the service ensures business rules are always enforced regardless of how service is called.

Keeps your service layer self-contained and secure.

What to do about ownership check inside service?
You can safely remove the ownership check from the service for updating comments if:

You are 100% sure every route that calls the service includes the ownership middleware.

You want cleaner and faster code.

Why still consider ownership in service?
If your service might be called from other places (like background jobs, other APIs, or internal calls), having ownership check in the service ensures safety no matter how the service is used.
 */