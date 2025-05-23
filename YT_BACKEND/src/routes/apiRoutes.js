// this is the central api routes from where we will redirect the request to differnt router.

import express from 'express';
import commentRouter from './commentRoutes.js';
import videoRouter from './videoRoutes.js';
import userRouter from './userRoutes.js';
import channelRouter from './channelRoutes.js';

const apiRouter=express.Router();

// (1)
// if api url start with /user then handel it with user router.
apiRouter.use('/user', userRouter);

// (2)
// if the api url start with /channel then handel it with channel route.
apiRouter.use('/channel', channelRouter);

// (3)
// if api url start with /video then handel it with video router.
apiRouter.use('/video', videoRouter);

// (4)
// if api url start with /comments then handel it with commentRouter.
apiRouter.use('/comments',commentRouter);








export default apiRouter;

