// multer middleware..

// import multer --- > multer is middleware for handling multipart/form-data, which is primarily used for uploading files
import multer from 'multer';

// import cludinary storage.. -> CloudinaryStorage is a storage engine for multer that uploads files directly to Cloudinary instead of saving locally.

import { CloudinaryStorage } from 'multer-storage-cloudinary';

// import our cloudinary that we configured.

import cloudinary from '../config/cloudinaryConfig.js';


// now configuring cloudinary storage for multer..

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'youtube-clone/users',      // Cloudinary folder to save the files in
        resource_type: 'image',             // Upload files as images
        public_id: (req, file) => {         // Function to generate the public ID (filename) for each uploaded file
            return `user-${Date.now()}`;      // Example: "user-168497847"
        }
    },
});

/**
 * folder: all uploaded files will be stored inside this folder in your Cloudinary account.
 * resource_type: tells Cloudinary what kind of files to expect; here it's "image".

 * public_id: a function that returns a unique file name (public ID) for each uploaded file. Here it uses a prefix user- plus the current timestamp to avoid collisions.
 */

// Create multer instance with Cloudinary storage
// const upload = multer({ storage });
// File type validation
const fileFilter = function (req, file, callbackFn) {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
        callbackFn(null, true);
    } else {
        callbackFn(new Error('Only JPG, PNG, and WEBP images are allowed'), false);
    }
};

// Multer instance
const upload = multer({
    storage,
    limits: { fileSize: 1 * 1024 * 1024 }, // 1 MB limit
    fileFilter
});

export default upload;