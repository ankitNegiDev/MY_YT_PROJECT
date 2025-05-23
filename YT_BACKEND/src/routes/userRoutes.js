import express from 'express';
import { deleteUser, getAllUser, getUserById, loginUser, registerUser, updateUser } from '../controllers/userController.js';

const userRouter=express.Router();
console.log("user");
// for sing up or registration
userRouter.post('/signup',registerUser);

// for login ..
userRouter.post('/login',loginUser);

// getuserById -> get request.
userRouter.get('/:id',getUserById);

// get all users -> get request..
userRouter.get('/',getAllUser);

// update user -> put request...
userRouter.put('/:id',updateUser);

// delete user -> delete request..
userRouter.delete('/:id',deleteUser);


export default userRouter;