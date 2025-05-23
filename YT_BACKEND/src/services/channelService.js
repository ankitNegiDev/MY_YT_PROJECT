// channel service.....

// (1) create channel..

import mongoose from "mongoose";

import { 
    fetchChannelByUserId as fetchChannelByUserIdRepository ,
    createChannel as createChannelRepository, 
    getAllChannels as getAllchanelsRepository,
    getChannelById as getChannelByIdRepository,
    updateChannelById as updateChannelByIdRepository,
    deleteChannelById as deleteChannelByIdRepository

} from "../repository/channelRepository.js";

import { updateUser } from "../repository/userRepository.js";
export async function createChannel(channelData){
    try{
        // the business logic is to check is user already have any cahnnel or not ...
        // first fetch the id from the channelData then check for valid id..
        const ownerId=channelData.owner;
        console.log("the owneer id we are getting in service is  : ",ownerId);


        // now we will check for valid id..
        if(!mongoose.Types.ObjectId.isValid(ownerId)){
            const error = new Error(`Invalid User ID format...: ${ownerId}`);
            error.status=404;
            throw error;
        }


        // if ownerId or userId is valid format then we will check is this user is having any chanel or not ..
        const isExistingChannel=await fetchChannelByUserIdRepository(ownerId);
        if(isExistingChannel){
            const error = new Error(`Sorry, the current user already has a channel named : ${isExistingChannel.channelName}`);
            error.status=400;
            throw error;
        }

        // creating new channel
        const createdChannel=await createChannelRepository(channelData);
        console.log("-------- New channel is ----- \n",createdChannel);

        // we need to update the user document of this channel owner..right because on creating the channel we will add the channel ref in user
        const updatedUser = await updateUser (ownerId,{channel:createdChannel._id});
        console.log("updated User is : ",updatedUser);
        return {createdChannel,updatedUser};
    }catch(error){
        console.log("error occur in create channel in service : ",error);
        throw error; // throwing error back to controller.
    }
}

// (2) get all channels

export async function getAllchanels(){
    try{
        const allChannels=await getAllchanelsRepository();
        return allChannels;
    }catch(error){
        console.log("eror occured in service layer and error is : ", error);
        throw error;
    }
}

// (3) get channel by id...

export async function getChannelById(id){
    try{
        if(!mongoose.Types.ObjectId.isValid(id)){
            const error = new Error(`Invalid channel ID format: ${id}`);
            error.status = 400; // Bad Request
            throw error;
        }
        const singleChannel=await getChannelByIdRepository(id);
        if(!singleChannel){
            const error = new Error(`Sorry Channel not found with ID : ${id} ... on db levle validation`);
            error.status = 404; // Not Found
            throw error;
        }
        return singleChannel;
    }catch(error){
        console.log("error occureed in service layer \n",error);
        if (error.status) {
            /*
                whatever the error caugth just throw it back to controller.. 
            */
            throw error;
        }
        // this is the case for normal internal server error those error which we don't know..io
        throw new Error(`Service Error in getChannelById : ${error.message}`);
    }
}

// (4) get cahnel by user Id..

export async function fetchChannelByUserId(id){
    try{
        // validating the id..
        if (!mongoose.Types.ObjectId.isValid(id)) {
            const error = new Error(`Invalid channel ID format: ${id}`);
            error.status = 400; // Bad Request
            throw error;
        }
        const fetchedChannel=await fetchChannelByUserIdRepository(id);
        if(!fetchedChannel){
            const error = new Error(`Sorry Channel not found for UserID : ${id} ... on db levle validation`);
            error.status = 404; // Not Found
            throw error;
        }
        return fetchedChannel;
    }catch(error){
        console.log("error occure in fetch channel by user id  in service: ",error);
        if (error.status) {
            /*
                whatever the error caugth just throw it back to controller.. 
            */
            throw error;
        }
        // this is the case for normal internal server error those error which we don't know..io
        throw new Error(`Service Error in getChannelById : ${error.message}`);
    }
}

// (5) updating the channel using channel id...

export async function updateChannelById(channelId,userId,updates){
    try{
        if (!mongoose.Types.ObjectId.isValid(channelId)) {
            const error = new Error(`Invalid channel ID format: ${channelId}  Sorry pass the correct channel id`);
            error.status = 400; // Bad Request
            throw error;
        }
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            const error = new Error(`Invalid user ID format: ${userId} Sorry u can't update the channel`);
            error.status = 400; // Bad Request
            throw error;
        }
        console.log("usesr id i: ",userId);
        // before update we will check if this chanell belong to this user which is request or not ... we might wonder that if a user is loged in then obiously that channel will be its own but just think ..... if a usser is loged in it might try to update other user channel that's why we need to check if the current channel is belong to user which is trying to perform update or not .
        const channel=await getChannelByIdRepository(channelId);
        // if no chanel is found : there might be case naa where user did not create the channel and try to update it...
        if(!channel){
            const error=new Error(`Sorry channel is not found with user having id : ${userId}`);
            error.status=404;
            throw error;
        }
        // once we found the channel then we need to check the owneership like this channel belongs to this user or not who is trying to update the channel...
        console.log("full chananel : ",channel);
        console.log("channel.owner:\n", channel.owner); // ObjectId
        console.log(" userId:", userId);               // string
        console.log("Comparison:", channel.owner._id.toString() === userId); // true or false

        if (channel.owner._id.toString() !== userId) {
            console.log("hiii");
            const error = new Error('You are not authorized to update this channel.');
            error.status = 403; // Forbidden
            throw error;
        }
        // now we will pass the updated data to repository.
        const dataNeedToBeUpdated={};
        const { channelName, description, channelBanner }= updates;
        if(channelName !== undefined){
            dataNeedToBeUpdated.channelName=channelName;
        }
        if(description !== undefined){
            dataNeedToBeUpdated.description=description;
        }
        if(channelBanner !==undefined){
            dataNeedToBeUpdated.channelBanner=channelBanner;
        }
        // passing the updated data to repository...
        const updatedChannel=await updateChannelByIdRepository(channelId,dataNeedToBeUpdated);
        return updatedChannel;
    }catch(error){
        console.log("error occured in updateChannelById in service layer...");
        throw error; // throwing error to controller... directly..
    }
}


// (6) delete chanel by id..

export async function deleteChannelById(id){
    try{
        if (!mongoose.Types.ObjectId.isValid(id)) {
            const error = new Error(`Invalid channel ID format: ${id}  Sorry pass the correct channel id`);
            error.status = 400; // Bad Request
            throw error;
        }
        // step 1=> first find the channel so that we can get its user.
        const channel=await getChannelByIdRepository(id);
        console.log("channel is in service layer that wil be deleted : ",channel);
        if(!channel){
            const error=new Error(`Sorry channel with id ${id} not found`);
            error.status=404;
            throw error;
        }

        // step 2 => now if we found the channel then delete that channel..
        const deletedChannel = await deleteChannelByIdRepository(id);
        if (!deletedChannel) {
            const error = new Error(`Sorry channel is not found with id : ${userId} or else already deleted`);
            error.status = 404;
            throw error;
        }

        // step 3 => once the chanel is deleted we need to update or remove the channel referece from user ... like set it to undefined.

        const userId = channel.owner._id;

        const updatedUser = await updateUser(userId, { $unset: { channel: "" } });

        return {deletedChannel,updatedUser};
    }catch(error){
        console.log("error in deletedchannelby id in service layer : ",error);
        throw error;
    }
}