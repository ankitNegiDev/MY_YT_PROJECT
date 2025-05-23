// this service layer will communicate with the repository layer and inside this service layer we will write the our business logic..

// import bcrypt from 'bcrypt';
import bcrypt from 'bcrypt';

import { 
    comparePassword,
    findUserByEmailId,
    finduserByUserName,
    registerUser as registerUserRepository,
    getUserById as getUserByIdRepository,
    getAllUser as getAllUserRepository,
    updateUser as updateUserRepository,
    deleteUser as deleteUserRepository,

} from '../repository/userRepository.js';
import mongoose from 'mongoose';
export async function registerUser(userData){
    try{
        // here we will first hash the password before passing it to repository layer inorder to save it ..
        const hashedPassword=await bcrypt.hash(userData.password,10);
        // now we need to pass this user whose password is now hashed..
        const newUserWithHashedPassword={
            userName:userData.userName,
            email:userData.email,
            password:hashedPassword,
            avatar:userData.avatar
        };

        // now passing this user to repository layer..
        const newUser=await registerUserRepository(newUserWithHashedPassword);
        // we don't want to return the hashed password we will set it to undefined..
        newUser.password=undefined;
        return newUser

    }catch(error){
        console.log("error occur in register user in service layer\n",error);
        throw error; // throwing error to controller.
    }
}

// (2) login but request will be post.. and for login what we need email and password..

export async function loginUser(userName,email,password){
    try{

        /**
         * const user=await findUserByEmailId(email) || await finduserByUserName(userName);  so assume if email  is undefined that we got from the req.body that means finduserbyemail will return null since in repository we are using findOne({email}) but there is not emil so findOne will return undefined
         */
        // const user=await findUserByEmailId(email) || await finduserByUserName(userName);

        let user = null;
        // if email exist and we found user with email then no need to check it with userName..
        if (email) {
            user = await findUserByEmailId(email);
            console.log("user by email ---- > ",user);
        }
        // if email does not exist or we got null in user from the findUserByEmailId then we will check it with userName..
        console.log("userName is : ",userName);
        if (!user && userName) {
            user = await finduserByUserName(userName);
            console.log("user got from the userName ---> ",user);
        }

        if(!user){
            const error = new Error('Invalid user email . Please enter valid email id');
            error.status = 401;
            throw error;
        }
        // once we found the user in db then we will start comparing the current password that we are getting and the password that is stored in db which we will get by user.password.
        const isValidPassword=await comparePassword(password,user.password);
        if(!isValidPassword){
            const error = new Error('Invalid password . Please enter valid password');
            error.status = 401;
            throw error;
        }
        // once the user with email found and that same user password match with incoming password in request body then we will return user details excluding password.
        return {
            //! id: user._id, // a bug... because of this req.user._id is undefined but req.user.id should there but which is not there in my case chek it late.
            /**
             * its becuse when we are returning the id:user_id from here then in controller while signing the token we are using id:user_id but we are accessing this id in channel controller like this req.user.id but it work only when we return id:user_id from here 
             */
            _id:user._id,
            userName: user.userName,
            email: user.email,
        };
    }catch(error){
        console.log("error occure in service : loging and error is : ",error);
        throw error; // throw error to controller.
    }
}

// (3) find user by id... or getUserById..

export async function getUserById(userId){
    try{
        // first we will validate the id.. it will check for only like id format is correct or not acc to mongoose ..
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            const error = new Error(`Invalid User ID format: ${userId}`);
            error.status = 400; // Bad Request
            throw error;
        }
        const user=await getUserByIdRepository(userId); // if no user found with given id then findById in repository will return null and we will get here null in service layer.
        console.log("user ins service is : ",user);
        if(!user){
            const error = new Error(`Sorry User not found with ID : ${userId} ... on db levle validation`);
            error.status = 404; // Not Found
            throw error;
        }
        return user;
    }catch(error){
        console.log("error occured in getUserById in service layer and error is : ",error);
        if (error.status) {
            /*
                whatever the error caugth just throw it back to controller.. 
            */
            throw error;
        }
        // this is the case for normal internal server error those error which we don't know..io
        throw new Error(`Service Error in getUserById in service: ${error.message}`);
    }
}

// (4) get all user..
export async function getAllUser(){
    try{
        const allUsers= await getAllUserRepository();
        return allUsers;
    }catch(error){
        console.log("eror occured in service layer and error is : ", error);
        throw error;
    }
}

// (5) update user info..

export async function updateUser(userId,updateData){
    try{
        // first we will validate the id.. it will check for only like id format is correct or not acc to mongoose ..
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            const error = new Error(`Invalid product ID format: ${userId}`);
            error.status = 400; // Bad Request
            throw error;
        }
        // then check for is there any passowrd is in updted data if yes then we need to has it..
        if(updateData.password){
            updateData.password=await bcrypt.hash(updateData.password,10);
        }
        const newUpdatedUser=await updateUserRepository(userId,updateData);
        if(!newUpdatedUser){
            const error = new Error(`Sorry User not found with ID : ${userId} ... on db levle validation`);
            error.status = 404; // Not Found
            throw error;
        }
        return newUpdatedUser;
    }catch(error){
        console.log("eror occured in service layer in update user and error is : ", error);
        throw error;
    }
}


// (6) delete user by id -> delete request..

export async function deleteUser(userId){
    try{
        // validate the id..
        if(!mongoose.Types.ObjectId.isValid(userId)){
            const error = new Error(`Invalid product ID format: ${userId}`);
            error.status = 400; // Bad Request
            throw error;
        }
        const deletedUser=await deleteUserRepository(userId);
        if(!deleteUser){
            const error = new Error(`Sorry User not found with ID : ${userId} ... on db levle validation`);
            error.status = 404; // Not Found
            throw error;
        }
        return deleteUser;
    }catch(error){
        console.log("eror occured in service layer in delete user and error is : ", error);
        throw error;
    }
}