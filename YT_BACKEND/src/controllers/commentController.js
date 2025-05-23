// comment controller ...

import {
    createComment as createCommentService,
    deleteCommentById as deleteCommentByIdService,
    getCommentByVideoId as getComemntByVideoIdService,
    updateCommentById as updateCommentByIdService

} from "../services/commentService.js";

// create comment...

export async function createComment(req, res) {
    try {
        // destructuring or getting the valid things.
        const videoId = req.params.videoId;
        console.log("video id in create comment controller is : ", videoId);
        const { text } = req.body;
        const userId = req.user._id;
        console.log("user id in create comment controller is : ", userId);
        const {newComment,updatedVideo} = await createCommentService(text, userId, videoId);
        return res.status(201).json({
            success: true,
            message: "comment is sucessfully created",
            data: {
                commentData:newComment,
                updatedVideoData:updatedVideo
            }
        })
    } catch (error) {
        console.log("error occured in create comment in controller : ", error);
        // handeling the known error...
        if (error.status) {
            return res.status(error.status).json({
                success: false,
                message: error.message
            })
        }
        // Fallback for unexpected errors
        return res.status(500).json({
            message: "Sorry Internal server error",
            success: false
        })
    }
}


// (2) get all comments of a video by video id...

export async function getComemntByVideoId(req, res) {
    try {
        const allComments = await getComemntByVideoIdService(req.params.videoId);
        if (allComments.length <= 0) {
            return res.status(200).json({
                success: true,
                // valid only when url is /api/comments/:id like this not /:videoId
                // message: `sorry there are no comments in the database for this videoId ${req.params.id} please add comment first`,
                message: `sorry there are no comments in the database for this videoId ${req.params.videoId} please add comment first`,
                data: {
                    allCommentsOfAvideoData: allComments
                }
            })
        }
        return res.status(200).json({
            success: true,
            message: `congratulations all comments with videoId : ${req.params.videoId} are fetched successfully`,
            data: {
                allCommentsOfAvideoData: allComments
            }
        })
    } catch (error) {
        console.log("error occured in controoler in getAllCommentsByVideoId : ", error);
        if (error.status) {
            return res.status(error.status).json({
                message: error.message,
                success: false,
            })
        }
        return res.status(500).json({
            message: "Sorry Internal server error",
            success: false
        })
    }
}

// (3) update comment by id ..

export async function updateCommentById(req, res) {
    try {
        // const { commentId } = req.params;
        const commentId = req.params.id;
        const { text } = req.body;
        const updatedComment = await updateCommentByIdService(commentId, text);
        return res.status(200).json({
            message: "Comment updated successfully",
            data: {
                updatedCommentData: updatedComment
            }
        })
    } catch (error) {
        console.log("error occured in controller in update comment : ", error);
        res.status(error.status || 500).json({
            error: error.message || "Internal Server Error"
        });
    }
}

// (4) delete comment by id 
export async function deleteCommentById(req, res) {
    try {

        const {deletedComment,updatedVideo} = await deleteCommentByIdService(req.params.id);
        return res.status(200).json({
            success: true,
            message: "comment deleted sucessfully",
            data: {
                deletedCommentData: deletedComment,
                updatedVideoData: updatedVideo
            }
        })
        
    } catch (error) {
        console.log("error occured in deleteCommentById in controller : ", error);
        // handeling the known error...
        if (error.status) {
            return res.status(error.status).json({
                success: false,
                message: error.message
            })
        }
        // Fallback for unexpected errors
        return res.status(500).json({
            message: "Sorry Internal server error",
            success: false
        })
    }
}


