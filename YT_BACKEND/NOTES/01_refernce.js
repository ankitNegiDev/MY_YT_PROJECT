// okey that means when chanel is created it will know who is the user right ....because we are getting user id from req.use_id (means the loged in user jwt one) but initially when we create user at that time there is no chanel so user -> forward reference to channel is undefiend because no channel is exist but when channel is created then we need to update the user document since we know which user is requesting for creating new channel ..


/**
 * 🔄 Channel - User Reference Handling in MongoDB
✅ Initial User Creation
When a user signs up, the user doesn't have a channel yet.

So, the channel field in the user document is undefined or null.

✅ Channel Creation Flow
When a logged -in user creates a new channel, we:

Get the user ID from req.user._id(or channelData.owner).

Use this ID to set the owner field in the new channel.

This creates a backward reference in the channel schema:

js
Copy
Edit
owner: {
    type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
            required: true
}
So now, the channel knows which user owns it.

❌ What Doesn't Happen Automatically
MongoDB / Mongoose does NOT automatically update the user document to point to the newly created channel.

So even though the channel has an owner, the user still doesn't know about their channel.

✅ Manual Update Required
After the channel is created, we manually update the user document with the channel's _id:

js
Copy
Edit
await updateUser(userId, { channel: createdChannel._id });
This sets the forward reference in the user document.
 */