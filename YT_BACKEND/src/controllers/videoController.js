// controller layer...

import { 
    deleteVideo as deleteVideoService,
    getAllVideoOfChannel as getAllVideoOfChannelService,
    getAllVideo as getAllVideoService, 
    getVideoById as getVideoByIdService, 
    updateVideo  as updateVideoService, 
    uploadVideo as uploadVideoService
} from "../services/videoService.js";


// (1) upload video..

export async function uploadVideo(req,res){
    try{
        const {newVideo,updatedChannel}=await uploadVideoService(req.body,req.user._id);
        // const channelId=req.body.channel;
        // console.log("channel id is : ",channelId);
        // adding the video to the channel once the video is uploadded..
        // const updatedChannel = await addVideoToChannel(channelId,video._id);
        return res.status(201).json({
            success:true,
            message:"Video is uploaded sucessfully and chanel also have video forward refernce",
            data:{
                videoData:newVideo,
                channelData:updatedChannel
            }
        })
    }catch(error){
        console.log("error in controller in upload video \n");
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
}

// (2) get all video ...
export async function getAllVideo(req,res){
    try{
        const response=await getAllVideoService();
        if(response.length<=0){
            return res.status(200).json({
                success:true,
                message:"Sorry there are no video in the database please upload a video first",
                data:{
                    videoData:response
                }
            })
        }
        return res.status(200).json({
            sucess: true,
            message: "conguratualations all Videos fetched sucessfully",
            data: {
                videoData: response
            }
        })
    }catch(error){
        console.log("error occured in controoler in getallVideo : ", error);
        return res.status(500).json({
            message: "Sorry Internal server error",
            sucess: false
        })
    }
}

// (3) getVideoById....

export async function getVideoById(req,res){
    try{
        // get the id from the path params.
        const response=await getVideoByIdService(req.params.id);
        return res.status(200).json({
            success: true,
            message: `conguratualations Video with id : ${req.params.id} fetched sucessfully`,
            data: {
                videoData: response
            }
        })
    }catch(error){
        console.log("error occured in controoler get video by id: ",error);
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

// (4) getAllVideoOfChannel ---- 

export async function getAllVideoOfChannel(req,res){
    try{
        // channelid will be in the path params or in url ..
        //! const allVideos=getAllVideoOfChannelService(req.params.id); //! small bug not using await so promise will be in pending state...
        // const allVideos = await getAllVideoOfChannelService(req.params.id); //? this is for /api/video/channel/:id
        const allVideos = await getAllVideoOfChannelService(req.params.channelId); // this is for /api/video/channel/:channelId


        // console.log("all videos in controller are : ",allVideos);

        if (allVideos.length <= 0) {
            return res.status(200).json({
                success: true,
                // message: `sorry there are no videos in the database for this channelId ${req.params.id} please add data first`,
                message: `sorry there are no videos in the database for this channelId ${req.params.channelId} please add data first`,

                data: {
                    allVideosDataOfChannel:allVideos
                }
            })
        }
        return res.status(200).json({
            success: true,
            // message: `conguratualations all Videos with channelId : ${req.params.id} are fetched sucessfully`,
            message: `congratulations all Videos with channelId : ${req.params.channelId} are fetched successfully`,
            data: {
                allVideosDataOfChannel: allVideos
            }
        })

    }catch(error){
        console.log("error occured in controoler in getAllVideoOfChannel: ",error);
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

// (5) updte video ...

export async function updateVideo(req,res){
    try{
        const userId = req.user._id;
        const videoId = req.params.id;
        
        /*
        in service we already implement the checkvideoownership and channel owner ship logic ....
        //* the reason why we do it because it might be possible naa while updating ... user did not provide rest field and update only one or two ..
        // const video=await getVideoByIdService(req.params.id,req.user._id);
        // Replace empty fields with existing values
        */
        const video=await getVideoByIdService(videoId);
        const updatedData = {
            title: req.body.title !== "" ? req.body.title : video.title,
            thumbnailUrl: req.body.thumbnailUrl !== "" ? req.body.thumbnailUrl : video.thumbnailUrl,
            description: req.body.description !== "" ? req.body.description : video.description,
            category: req.body.category !== "" ? req.body.category : video.category,
        };
        const response=await updateVideoService(videoId,updatedData,userId);
        return res.status(200).json({
            success: true,
            message: "Video updated sucessfully",
            data: {
                videoData: response
            }
        })
    }catch(error){
        console.log("error occured in controoler in in update video: ", error);
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

// (6) delete video ----- 

export async function deleteVideo(req,res){
    try{
        const userId = req.user._id;
        const videoId = req.params.id;
        
        const {deletedVideo , updatedChannel}=await deleteVideoService(videoId,userId);
        return res.status(200).json({
            success: true,
            message: "Video deleted sucessfully",
            data: {
                deletedVideoData: deletedVideo,
                updatedChannelData:updatedChannel
            }
        })
    }catch(error){
        console.log("error occured in deletevideo in controller : ", error);
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