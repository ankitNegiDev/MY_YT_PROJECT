// creatin the userScheam ....

import mongoose  from "mongoose";

const userSchema=new mongoose.Schema({
    // userName must be unique and required.
    userName:{
        type:String,
        required:true,
        unique:true
    },

    // useremail must be unique and requried.
    email:{
        type:String,
        required:true,
        unique:true
    },
    // don't forbet to hash the password before storing into the db.
    password:{
        type:String,
        required:true,
    },
    avatar:{
        type:String,
    },
    // Forward reference to the Channel document
    // This means a User *has* one Channel linked by ObjectId
    /**
     * mongoose.Schema.Types.ObjectId it means we are telling mongoose that this User collection will store here the Id of another Collection whom i will refer it currently we are refering it to the Channel collection.
        channel: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Channel'
        }
     ** we're telling Mongoose that : 
        * "This field will store the ID (_id) of a document from the Channel collection."
        * So in the User document  channel will hold the ObjectId of a Channel document.
        * Later, we can use Mongoose's .populate('channel') to fetch the full channel data based on that ID.
     */

    channel: {
        type: mongoose.Schema.Types.ObjectId, // ObjectId type to reference another MongoDB document
        ref: 'Channel' // Refers to the 'Channel' model for population
    }
},{timestamps:true});

// creating the User collection using this userSchema...
export const User=mongoose.model('User',userSchema);
