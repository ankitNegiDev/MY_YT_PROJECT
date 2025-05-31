import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinaryConfig.js';

const videoStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'youtube-clone/videos',
        resource_type: 'video',  // important to change this for videos
        public_id: (req, file) => {
            return `video-${Date.now()}`;
        }
    }
});

const videoFileFilter = function (req, file, callbackFn) {
    const allowedTypes = ['video/mp4', 'video/avi', 'video/mkv', 'video/mov', 'video/webm'];
    if (allowedTypes.includes(file.mimetype)) {
        callbackFn(null, true);
    } else {
        callbackFn(new Error('Only video files are allowed!'), false);
    }
};

const uploadVideoMulter = multer({
    storage: videoStorage,
    limits: { fileSize: 100 * 1024 * 1024 }, // 100 MB limit
    fileFilter: videoFileFilter
});

export default uploadVideoMulter;
