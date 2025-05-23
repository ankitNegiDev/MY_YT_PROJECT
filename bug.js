//! (1) while protecting the routes of channel i am missing to pass the payload as id also and that's why we are not getting the id..

//! (2) mistakenly return the {createdChannel , updatedUser} fron the service and destructure it {newChannel , updatedUser} in controller .. which cause not so show channel data when loged in user created the channel. 


//! (3) a small bug in updateChanelById -> where previously i populated the full user info inside the channel for future usecase and here while updating to check weather this channel which user want to update is belonged to that user or not in that case we are doing if(channel.owner.tostring !==userId) but it should be if(channel.owner._id.tostring!==userId){throw erro}else -> move ahed..
