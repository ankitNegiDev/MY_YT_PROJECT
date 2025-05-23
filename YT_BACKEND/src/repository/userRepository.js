// this is will contain all user related function and basically repository layer will do db query related task..

import { User } from "../schema/userSchema.js";
import bcrypt from 'bcrypt';


// (1) creating new user in db.. (register) post request..

export async function registerUser(userData){
    // here we will save the userData in db.
    try{
        const newUser=await User.create(userData);
        return newUser;
    }catch(error){
        console.log("error in register user in repository : ",error);
        throw error;
    }
}

// (2) login the user for this we need the jwt inorder to send the token... 

// (1) we need to find the userBy email..
export async function findUserByEmailId(email) {
    try {
        const user = await User.findOne({ email });
        return user;
    } catch (error) {
        console.log("error occure in finduserbyemail in repo\n");
        throw error;
    }
}
// (1a) we need to find user by userName also since its our requirement to login the user with either userName or email.
export async function finduserByUserName(userName){
    try{
        const user=await User.findOne({userName});
        return user;
    }catch(error){
        console.log("error occur isn finduserby user anme in repo");
        throw error;
    }
}

// (2) we need compare function
export async function comparePassword(userNormalPassword, hashedPassword) {
    try {
        return await bcrypt.compare(userNormalPassword, hashedPassword);
    } catch (error) {
        console.log("error occure in compoare pass in repo\n");
        throw error;
    }
}

// (3) find user by id.. or get user by id..

export async function getUserById(userId){
    try{
        const user = await User.findById(userId).select('-password'); //this means .select('-password') we explecitley telling mongoose that hey find this user with given id but don't give me its password else give me all its details 
        return user;
    }catch(error){
        console.log("error occure in getUserById in repo\n");
        throw error; // throwing back error to service.
    }
}

// (4) get all user..

export async function getAllUser() {
    try {
        const allUsers = await User.find();
        console.log("all User are : ", allUsers);
        return allUsers;
    } catch (error) {
        console.log("error occured in repository layer and error is : ", error.message);
    }
}

// (5) find user by id and then update it.
/**
 * runValidators: true — What it does:
By default, Mongoose does not run schema validations when using update methods like:
    findByIdAndUpdate
    updateOne
    updateMany
 * This means fields like email, required, minLength, match, etc., won’t be validated unless you explicitly tell Mongoose to do so.
 * ✅ runValidators: true ensures:
Mongoose applies all the schema validation rules on the updateData before updating.
 */

export async function updateUser(userId,updateData){
    try{
        const updatedUser= await User.findByIdAndUpdate(userId,updateData,{new:true,runValidators:true}).select('-password'); // means find the user with given id and then return the new updated user  and run all validator but dont return the password means exclude password.
        return updatedUser;
    }catch(error){
        console.log("error occured in updateUser in repository layer: ",error);
        throw error;
    }
}

// (6) delete user.. by id .. using delete request..

export async function deleteUser(userId){
    try{
        const deletedUser=await User.findByIdAndDelete(userId); // here select doesn't work as intended --- read it later mongoose will throw error if we use .select('-password') inorder to exclude it from our deleted document..
        // if user does not exist then findByIdAndDelete will return null that measn we can remove the passowrd on null so we need to check
        if(!deleteUser){
            return null;
        }
        // manullay deleting password..
        deleteUser.password=undefined;
        return deleteUser;
    }catch(error){
        console.log("error occured in delete using  in repository layer: ", error);
        throw error;
    }
}

/**
 * technically, the data is deleted from the database, so we might wonder: "Why care about returning the password if it's already gone?"

✅ Yes — Technically:
If we're deleting a user, then the password stored in DB is already gone. So returning it doesn't affect your database anymore.

❗But — Why we Still Should NOT Return Password:
Even if the data is deleted:

1. Security & Privacy Best Practice
    Passwords (even hashed) should never be exposed in API responses.
    Even if it's hashed, returning it increases risk (e.g., logs, browser console, error tracking tools).

2. API Consumers Shouldn’t See Passwords
    Frontend devs, mobile apps, or third parties consuming the API don’t need the password.
    Returning it can lead to misuse, accidental logging, or confusion.

3. Audit & Compliance
    Many companies follow security standards (e.g., OWASP, GDPR).
    Exposing sensitive data, even temporarily, can break compliance rules.

4. Consistency
    If your other API responses (e.g., login, get user, etc.) never return passwords, this should behave the same.
    It keeps your API behavior predictable and safe.
 */