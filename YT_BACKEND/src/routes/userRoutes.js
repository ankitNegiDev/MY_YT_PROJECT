import express from 'express';
import { deleteUser, getAllUser, getUserById, loginUser, registerUser, updateUser } from '../controllers/userController.js';
import upload from '../middleware/multer.js';
import { validateUserSignup } from '../validators/userSignupValidation.js';

const userRouter=express.Router();
console.log("user in user route ---> ");
/**
 * okey that means before the controller runs our image is uploaded to cloudinary and inside req.file we have url and then when controller runs it can accss that url and set it in db ?? naa 
 */
// for sing up or registration // /api/user/sing
// userRouter.post('/signup',upload.single('profilePhoto'),registerUser);
// userRouter.post('/signup', upload.single('profilePhoto'), validateUserSignup, registerUser);

userRouter.post('/signup', upload.single('profilePhoto'), registerUser);



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

