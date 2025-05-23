import express from 'express';
import { createComment, deleteCommentById, getComemntByVideoId, updateCommentById } from '../controllers/commentController.js';
import { validateCreateComment, validateUpdateComment } from '../validators/commentValidation.js';
import { authenticateToken } from '../middleware/autMiddleware.js';
import { checkCommentOwnership } from '../middleware/commentOwnerShip.js';


const commentRouter=express.Router();

// (1) crete comment -> post
commentRouter.post('/:videoId',authenticateToken,validateCreateComment,createComment);

// (2) get all comments of a video -> get ..
commentRouter.get('/:videoId', getComemntByVideoId)

// (3) update comments by id ..
commentRouter.put('/:id',authenticateToken,checkCommentOwnership,validateUpdateComment,updateCommentById);

// (4) delete comments by id ..
commentRouter.delete('/:id',authenticateToken,checkCommentOwnership,deleteCommentById);


export default commentRouter;