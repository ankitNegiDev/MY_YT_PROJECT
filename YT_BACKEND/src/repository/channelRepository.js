// channel repository..
/**
* **functionality we need**

    * `(1) create a channel` post req api will be like -> localhost:port/api/channel
    *? we are creating a addition get request to fetch all chanel for my testing purpose...
    * `(2) get chanel by id` Get request  GET /api/channel/:id
    * `(3) get chanel by userId` get request   GET /api/channel/user/:userId
    * `(4) update channel` -> put request   PUT /api/channel/:id
    * `(5) delete dchannel` -> delete request.  DELETE /api/channel/:id

    ** we will need one more function which will find the channel by the userid or owner id.. using this function in service we will get to know does current user which want to create a channel does it have any channel or not...

 */

import { Channel } from '../schema/channelSchema.js';
// import {Video} from '../schema/videoSchema.js';



// (1) creating a channel --- post request...

export async function createChannel(channelData){
    try{
        const channel=await Channel.create(channelData);
        return channel;
    }catch(error){
        console.log("error in rep in createChannel :",error);
        throw error;
    }
}

// (2) getAllChannels () get request...

export async function getAllChannels(){
    try{
        const allChannels=await Channel.find();
        return allChannels;
    }catch(error){
        console.log("error in getAllchanels in repository layer",error);
        throw error;
    }
}

// (3) get chanel by id ->> get request id will comes in url..


export async function getChannelById(id){
    try{
        const singleChannel=await Channel.findById(id).populate('owner').populate('videos'); // populating owner info and video info..
        return singleChannel;
    }catch(error){
        console.log("error occured in the getChannelById in repository layer : ",error);
        throw error;
    }
}




// (4) finding chanel using user id.. or get channel using user Id..
/**
 * it can be helpful when anyone cliek on profile then we will show selected user chanel details as like it happen in real yt

 * perfect real-world use case:

When anyone clicks on a user’s profile, we will fetch the channel info using that user’s ID via this API (GET /api/channel/user/:userId).

Then we will display the channel details (name, banner, description, subscribers, videos, etc.), just like YouTube does.

It ties user profiles to their channel seamlessly, giving a smooth UX.
*! Q => dont u think getting chanel by user id that means a cahnnel will have video so we need to populate the video also right initally it will be empty but later when user add the video then we need to populate it
When we will fetch a channel by userId, it’s very useful to populate the videos array so you can get full video details instead of just video IDs.
 */

export async function fetchChannelByUserId(userId) {
    try {
        const channel = await Channel.findOne({ owner: userId }).populate('videos');
        console.log("channel in rpeository is : ",channel);
        return channel;
    } catch (error) {
        console.log("error occur in repos in fetchChannelByuserId helper function : ", error);
        throw error;
    }
}

// (5) update channel put request -> /channel/id
/**
 *  use case breakdown for the update channel API (PUT /api/channel/:id):
    ** Use Case for Update Channel
     * Purpose:
        * Allow the channel owner to update the channel’s editable information.

     *? Allowed updates:
            channelName
            description
            channelBanner

    * we could allow updates to other non-critical fields if you add more later.

    ** Not allowed to update:
        * subscribers is managed internally (not by user) — usually it should not be updated directly by the user.
        * owner — because the channel ownership should never change through this API.
        * _id — the channel’s unique identifier must remain immutable.
        * videos — normally videos are added/deleted via separate APIs, not through channel update.
        * subscribers — should be managed automatically by the system (when users subscribe/unsubscribe).

    * Security:
        * Typically, you want to verify that the requester is the owner of the channel before allowing the update.
        * If a user is logged in and has created a channel, that user will have an authentication token (like a JWT). When the user makes a request to update the channel, we authenticate the request by verifying the token. Then, we check if the user ID encoded in the token matches the owner field of the channel. Only if they match do we allow the update. This ensures that only the owner of the channel can update its information.
    * Response:
        * Return the updated channel data.
 */

// Using { $set: updateData } means only those fields inside updateData will be updated, leaving other fields intact.

export async function updateChannelById(id,updateData){
    try{
        const updatedChannel=await Channel.findByIdAndUpdate(id,{$set:updateData},{new:true});
        return updatedChannel;
    }catch(error){
        console.error('Error in updateChannelById:', error);
        throw error;
    }
}



// (6) deleteChanel by id ....
export async function deleteChannelById(id){
    try{
        const deletedChannel=await Channel.findByIdAndDelete(id); // delete the whole channel.
        return deletedChannel;
    }catch(error){
        console.log("error in delete channelby id  repository: ",error);
        throw error;
    }
}





// -------------------- extra requirement of video collection to update the channel becuse we need to set the video reference in the channel like to which channel this video belongs...
/**
 * updateChannelById() uses $set, which is meant for replacing/updating fields.

 * For pushing to an array (videos[]), we should use $push, not $set.
 */

// push a new video ID into channel's videos array
export async function addVideoToChannel(channelId, videoId) {
    try {
        const updatedChannel = await Channel.findByIdAndUpdate(
            channelId,
            { $push: { videos: videoId } },
            { new: true }
        );
        return updatedChannel;
    } catch (error) {
        console.error("Error in addVideoToChannel:", error);
        throw error;
    }
}

// additonal requirement to remove the video from the chanel ..... i can do this logic directly where it is need but .. to make sepration of concern i am creating another function..

export async function removeVideoFromChannel(channelId, videoId) {
    try{
        const updatedChannel= await Channel.findByIdAndUpdate(channelId,{$pull:{videos: videoId}}, {new:true});
        return updatedChannel;
    }catch(error){
        console.log("error in removeVideofrom channel : ",error);
        throw error;
    }
}


// we need a channel ownership 
export async function checkChannelOwnership(channelId, userId) {
    const channel = await Channel.findById(channelId);

    if (!channel) {
        const error = new Error("Channel not found in ownership check for channel id is it correct or not");
        error.status = 404;
        throw error;
    }

    if (channel.owner.toString() !== userId.toString()) {
        const error = new Error("Unauthorized: You do not own this channel.");
        error.status = 403;
        throw error;
    }

    return channel;
}







/**
 *todo =>  imp point :  
    * if we see channel crud there are fetchChannelbyuserid and getchannelby id  when these two will runned then they populate (owner and video) ..... but think think suppose that if user did not call any one of it can after creation the channel it go for upation then still channel.owner will ahve full user info becuase in chanelService file in updateChanelById we are calling getChannelByIdRepository(channelId) this which is nothing but getChannelById (channel id) () in repository and it do populate the video and owner ......... 

 */