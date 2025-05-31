import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinaryConfig.js';

console.log("banner upload working ---- -> ");

function getBannerStorage() {
    return new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
            folder: 'youtube-clone/channel-banners',
            resource_type: 'image',
            public_id: function (req, file) {
                return 'banner-' + Date.now(); // a unique channel banner id 
            }
        }
    });
}

function bannerFileFilter(req, file, callbackFn) {
    var allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
        callbackFn(null, true);
    } else {
        callbackFn(new Error('Only image files are allowed!'), false);
    }
}

function createBannerUpload() {
    return multer({
        storage: getBannerStorage(),
        limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
        fileFilter: bannerFileFilter
    });
}

export default createBannerUpload();
