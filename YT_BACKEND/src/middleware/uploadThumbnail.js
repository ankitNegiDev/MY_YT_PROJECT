import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinaryConfig.js';

const imageStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'youtube-clone/thumbnails',
        resource_type: 'image',
        public_id: function (req, file) {
            return `thumbnail-${Date.now()}`;
        }
    }
});

const imageFileFilter = function (req, file, callbackFn) {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
        callbackFn(null, true);
    } else {
        callbackFn(new Error('Only image files are allowed!'), false);
    }
};

const uploadImageMulter = multer({
    storage: imageStorage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
    fileFilter: imageFileFilter
});

export default uploadImageMulter;
