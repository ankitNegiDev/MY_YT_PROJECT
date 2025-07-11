import express from 'express';
import { authenticateToken } from '../middleware/autMiddleware.js';
import { updateVideoValidation, uploadVideoValidation } from '../validators/videoValidators.js';
import { deleteVideo, dislikeVideo, getAllVideo, getAllVideoOfChannel, getVideoById, likeVideo, searchFunctionality, updateVideo, uploadVideo } from '../controllers/videoController.js';
// import uploadVideoMulter from '../middleware/uploadVideoMulter.js';
// import uploadImageMulter from '../middleware/uploadThumbnail.js';
import uploadFields from '../middleware/singleUpload.js';

const videoRouter=express.Router();

// create video... and flow is first check user is loged in or not , then check for validation are all fields for upload are provided or not , if all these checked or passed then upload video..
videoRouter.post('/', authenticateToken,uploadFields,uploadVideo);


// (2) to get all video 
videoRouter.get('/',getAllVideo);

// putting it before just to avoid any route conflict
/**
 * intially we have /channel/:channelId after /:id — Express might matches routes in order so /channel/:channelId should come before /:id to avoid conflicts. Otherwise, /channel/xyz will be treated as /:id with id = 'channel'.
 */
// (4) to get all video of a channel using channel id..
videoRouter.get('/channel/:channelId', getAllVideoOfChannel);
// videoRouter.get('/channel/:id,getAllVideoOfChannel);
/**
 ** importan to not : if url is /api/video/channel/:id -> in that case req.param.id will correctly get the id passed .. but 
 *? when the url is : /api/video/channel/:channelId -> in that case req.params.id will throw error we need to do req.params.channelId
 */

// (3) to get video by id.
videoRouter.get('/:id',getVideoById);



// (5) to update video ... 
videoRouter.put('/:id',authenticateToken,updateVideoValidation,updateVideo);

// (6) to delete video 
videoRouter.delete('/:id',authenticateToken,deleteVideo);

// (7) search functionality..

// videoRouter.get('/search/videos',searchFunctionality);
videoRouter.get('/search/videos', searchFunctionality);


// (8) like video
videoRouter.post('/:id/like', authenticateToken, likeVideo);

// (9) dislike video 
videoRouter.post('/:id/dislike',authenticateToken,dislikeVideo);


export default videoRouter;