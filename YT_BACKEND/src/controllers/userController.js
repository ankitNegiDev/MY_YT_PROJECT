// this is wehre we will recive the reuqest and get the data from the request body and call the service layer.
import validator from "validator";
import { JWT_SECRET_KEY } from "../config/serverConfig.js";
import { registerUser as registerUserService, 
        loginUser as loginUserService,
        getUserById as getUserByIdService,
        getAllUser as getAllUserService,
        updateUser as updateUserService,
        deleteUser as deleteUserService
} from "../services/userService.js";
import jwt from 'jsonwebtoken';
export async function registerUser(req,res){
    try{
        // all validation we will write either in middleware or in validators ... we will see it later..
        // getting the required data from request body.
        const {userName, email,password}=req.body;
        // Validate manually
        // if (!userName || !email || !password) {
        //     return res.status(400).json({ success: false, message: "All fields are required" });
        // }

        // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        // if (!passwordRegex.test(password)) {
        //     return res.status(400).json({ success: false, message: "Weak password" });
        // }

        // now getting the avatar or profile image url from the req.file.
        const avatar = req.file?.path;
        console.log("avatar in controller is  : ",avatar);
        // now we will pass all these details into the service layer..
        const userData={
            userName:userName,
            email:email,
            password:password,
            avatar:avatar,
        }
        const newUser=await registerUserService(userData);
        // if user registerd sucess fully then ..
        return res.status(201).json({
            success: true,
            message: "User registred Sucessfully",
            data: {
                user: newUser
            }
        })
    }catch(error){
        console.log("error occur in userController in register user : ",error);
        // Handle duplicate email or username
        if (error.code === 11000) {
            // here Object.keys() is a js method that returns the all the keys from the object in array and here error.keyValue is a object.
            const keys=Object.keys(error.keyValue); 
            const duplicateKey = keys[0]; // 0th index.
            return res.status(409).json({
                success: false,
                message: `${duplicateKey} already exists. Please use another.`,
            });
        }

        // Default server error
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

// login ---- chek for login with userName also ....... currently we implement it with email and password only...
export async function loginUser(req,res){
    try{
        // first fetch all data from the request.body..
        /*
        problem is we are expecting usrname and email but from frontend we can send them based on user input but i want to write the validation in backend so i did like this .......
        const {userName,email,password}=req.body;
        console.log("req boy in backend is : ",req.body);
        console.log("userName in backend is : ",userName);
        console.log("email in backend is : ", email);
        */
        const { loginValue, password } = req.body;
        console.log("loging valeue ::::::::: ==========> ",loginValue);

        let email = null;
        let userName = null;

        if (validator.isEmail(loginValue)) {
            email = loginValue.toLowerCase();
        } else {
            userName = loginValue;
        }
        console.log("email after validation in backend is : ",email);
        console.log("userName after validation in backend is : ",userName);

        // ---- before calling login service we need to check naa does user exist with these email/username or password if yes then don't call the login service and  ------> no need to do it becuse in service we will return naa user with channel info if it has .... and on fronted we will check if user is having channel or not something like ...........

        const user=await loginUserService(userName,email,password);
        console.log("user just before sending the reposne in login it should contain avatar ---> ",user);
        // once the login is done like if email is valid then user will be found else error will thrown in service and that error will be thrown to controller so here below line will never execute because that error will be catched by controller.
        console.log("User just before  login or creating the token:", user);
        console.log("User ID before signing token:", user._id);

        // now create the token
        const token=jwt.sign(
            // (1) payload when using _id a default naming of mongodb. then plse acces it in channel controller like htis req.user._id if we do req.user.id it will throw error.
            {
                _id:user._id,
                email:user.email
            },
            
            // if we are using id here then access it in channel controller like req.user.id not req.user_id.
            /*{
                id:user._id,
                email:user.email
            },
            */
            // (2) secret key a kind of random character..
            JWT_SECRET_KEY,
            // (3) expiry
            {
                "expiresIn" : "1d"
            }
        );
        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            // data: {
            //     user
            // }
            data:{
                user: {
                    _id: user._id,
                    userName: user.userName,
                    email: user.email,
                    avatar: user.avatar,
                    channel:user.channel // correct we are sending channel info..
                }
            }
        });
    }catch(error){
        console.log("error in controller in login \n",error);
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
}

// (3) getuser by id..

export async function getUserById(req,res){
    try{
        // get the id first .
        // const {userId}=req.params; //! error here we are passing id in route like/:id not /:userId
        const userId=req.params.id;
        // console.log("id is : ",userId);
        // console.log("req.params.id is ; ",req.params.id);
        const response=await getUserByIdService(userId);
        return res.status(200).json({
            sucess: true,
            message: `conguratualations User with id : ${req.params.id} fetched sucessfully`,
            data: {
                user: response
            }
        })
    }catch(error){
        console.log("error occured in controoler : ",error);
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

// (4) get all users..

export async function getAllUser(req,res){
    try{
        const fetchedAllUsers=await getAllUserService();
        if(fetchedAllUsers.length<=0){
            return res.status(200).json({
                sucess: true,
                message: "sorry there are no user in the database please add data first",
                data: {
                    users:fetchedAllUsers
                }
            })
        }
        return res.status(200).json({
            success:true,
            message:"congrutulations all users fetched sucessfully",
            data:{
                users:fetchedAllUsers
            }
        })
    }catch(error){
        console.log("error occured in controoler : ", error);
        return res.status(500).json({
            message: "Sorry Internal server error",
            sucess: false
        })
    }
}

// (5) update user......

export async function updateUser(req,res){
    try{
        const userId=req.params.id;
        const updatedUser=await updateUserService(userId,req.body);
        return res.status(200).json({
            sucess: true,
            message: `conguratualations User updated sucessfully`,
            data: {
                user: updatedUser
            }
        })
    }catch(error){
        console.log("error occured in controoler  in updateUser: ", error);
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


// (6) delete user.... 

export async function deleteUser(req,res){
    try{
        // extract id..
        const userId=req.params.id;
        const deletedUser=await deleteUserService(userId);
        return res.status(200).json({
            sucess: true,
            message: `conguratualations User deleted sucessfully`,
            data: {
                user: deletedUser
            }
        })
    }catch(error){
        console.log("error occured in controoler  in deleteUser: ", error);
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