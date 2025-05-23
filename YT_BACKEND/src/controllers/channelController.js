// channel controller...
import { updateUser } from "../repository/userRepository.js";
import {
    createChannel as createChannelService,
    getAllchanels as getAllchanelsService,
    getChannelById as getChannelByIdService,
    fetchChannelByUserId as fetchChannelByUserIdService,
    updateChannelById as updateChannelByIdService,
    deleteChannelById as deleteChannelByIdService

} from "../services/channelService.js";

// (1) create channel...

export async function createChannel(req, res) {
    try {
        /*
        this is kind of validation we will apply it later in validators.
        if (!req.user || !req.user._id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: User information missing"
            });
        }else{
            console.log("req.user is : ",req.user);
        }
        */
        // User is authenticated → JWT middleware (authenticateToken) decoded the token
        // We get the user's ID from the decoded token payload (req.user.id)
        const ownerId = req.user._id;
        console.log("the owner id that we are getting from req.user.id is : ", ownerId);

        // adding owner into channel..
        const channelData = {
            ...req.body,
            owner: ownerId
        }
        // const createdChannel=await createChannelService(channelData);
        const { createdChannel, updatedUser } = await createChannelService(channelData);


        return res.status(201).json({
            success: true,
            message: "Channel created successfully",
            data: {
                channelData: createdChannel,
                updatedUserData: updatedUser
            }
        });
    } catch (error) {
        console.log("error occured in createChannel in controller : ", error);
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

// (2) get all chanells..

export async function getAllchanels(req, res) {
    try {
        const response = await getAllchanelsService();
        if (response.length <= 0) {
            return res.status(200).json({
                sucess: true,
                message: "sorry there are no channels in the database please add data first",
                data: {
                    allChannels: response
                }
            })
        }
        return res.status(200).json({
            success: true,
            message: "Congrutulations all channels are fetched sucessfully",
            data: {
                allChannels: response
            }
        })
    } catch (error) {
        console.log("error occured in controoler in getall chanelss : ", error);
        return res.status(500).json({
            message: "Sorry Internal server error",
            sucess: false
        })
    }
}

// (3) get channel by id...
export async function getChannelById(req, res) {
    try {
        const response = await getChannelByIdService(req.params.id);
        return res.status(200).json({
            sucess: true,
            message: `conguratualations Channel with id : ${req.params.id} fetched sucessfully`,
            data: {
                singleChannelData: response
            }
        })
    } catch (error) {
        console.log("error occured in controoler : ", error);
        if (error.status) {
            return res.status(error.status).json({
                message: error.message,
                sucess: false,
            })
        }
        return res.status(500).json({
            message: "Sorry Internal server error",
            sucess: false
        })
    }
}

// (4) fetch chanel by user id or get channel by user id..

export async function fetchChannelByUserId(req, res) {
    try {
        // get the id from the url params or path params
        const userId = req.params.id;
        const response = await fetchChannelByUserIdService(userId);
        return res.status(200).json({
            sucess: true,
            message: `conguratualations Channel with userId : ${req.params.id} fetched sucessfully`,
            data: {
                channelData: response
            }
        });

    } catch (error) {
        console.log("error occured in controoler in fetchchannelByUserId : ", error);
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

// (5) update channel using by its id.

export async function updateChannelById(req, res) {
    try {
        const channelId = req.params.id;
        console.log("channelId is in controller is : ", channelId);

        const userId = req.user._id; // loged in user id.
        // const userId ="682daff0505690adc3aa1986";
        console.log("user Id in controller is : ", userId);

        const updates = req.body;
        console.log("updates or req.body in controller is : ", req.body);


        // it s part of validation but .. we will see later...
        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                success: false,
                message: "No fields provided for update"
            });
        }

        const updatedChannel = await updateChannelByIdService(channelId, userId, updates);
        return res.status(200).json({
            success: true,
            message: 'Channel updated successfully',
            data: {
                updatedChannelData: updatedChannel,
            },
        });
    } catch (error) {
        console.log("error occured in controoler in updating channel : ", error);
        if (error.status) {
            return res.status(error.status).json({
                message: error.message,
                sucess: false,
            })
        }
        return res.status(500).json({
            message: "Sorry Internal server error",
            sucess: false
        })
    }
}

// delete channel by id...

export async function deleteChannelById(req, res) {
    try {
        // get the id from the req...
        const channelId = req.params.id;
        const {deletedChannel,updatedUser} = await deleteChannelByIdService(channelId);
        
        return res.status(200).json({
            message: "Channel deleted successfully",
            data: {
                deletedChannelData:deletedChannel,
                removedChannelRefereceUserData:updatedUser
            }
        });

    } catch (error) {
        console.log("error occured in controoler in updating channel : ", error);
        if (error.status) {
            return res.status(error.status).json({
                message: error.message,
                sucess: false,
            })
        }
        return res.status(500).json({
            message: "Sorry Internal server error",
            sucess: false
        })
    }
}