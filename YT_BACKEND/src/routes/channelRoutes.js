// channel routes..

import express from 'express';
import { authenticateToken } from '../middleware/autMiddleware.js';
import { createChannel, deleteChannelById, fetchChannelByUserId, getAllchanels, getChannelById, updateChannelById } from '../controllers/channelController.js';
import channelBannerUpload from '../middleware/channelBannerUpload.js';

const channelRouter=express.Router();

// to create the channel or when api url start with /

channelRouter.post('/', authenticateToken ,channelBannerUpload.single("banner"),createChannel); // protected route...

// to get all the chanels.. / get request.
channelRouter.get('/',authenticateToken,getAllchanels);

// to get single channel by id -> /:id get request..
channelRouter.get('/:id',authenticateToken,getChannelById);

// to get channel by userId -> /user/:userId but we will wirte /:id  -> get request..
channelRouter.get('/user/:id',authenticateToken,fetchChannelByUserId);



// to update the channel by providing channel id. -> /:id -> put request...
channelRouter.put('/:id', authenticateToken, updateChannelById);



// delete channel by giving the id...
channelRouter.delete('/:id',authenticateToken,deleteChannelById);
export default channelRouter;