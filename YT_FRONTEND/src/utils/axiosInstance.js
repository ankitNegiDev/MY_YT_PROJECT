// Step 1: Importing axios library from axios
import axios from 'axios';

// Step 2: Creating an axios instance with a base URL (its just for our productiviey)
// this base URL will be added before every api endpoint automatically
// For example if api is :  api.get('/videos') -> actually becomes 'http://localhost:5000/api/videos'
let api = axios.create({
    baseURL: 'https://my-yt-project.onrender.com/api'
});

// Step 3: Adding a request interceptor
// This function runs BEFORE every request is sent
//! read about it later...
api.interceptors.request.use(function (config) {

    // Simply geting the 'user' object from localStorage
    // This is where we assume that user details (like token) are saved after login ... check for it
    let user = JSON.parse(localStorage.getItem('user'));
    // let user = null;
    // try {
    //     const storedUser = localStorage.getItem('user');
    //     user = storedUser ? JSON.parse(storedUser) : null;
    // } catch (error) {
    //     console.error("Error parsing user from localStorage", error);
    //     user = null;
    // }

    // If user and token exist then add Authorization header to request
    // This is needed for protected API routes where token verification is required
    if (user && user.token) {
        config.headers.Authorization = 'Bearer ' + user.token;
    }
    // console.log("config object before calling api is : ",config);

    //  Returning the modified config so Axios can continue with the request
    return config;
});

// Step 4: Exporting the customized axios instance so that it can be used anywhere in our project
export default api;
