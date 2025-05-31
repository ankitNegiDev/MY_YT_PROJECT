import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinaryConfig.js";

// Single Cloudinary storage that handles both images and videos (resource_type depends on file type)
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        if (file.fieldname === "thumbnail") {
            return {
                folder: "youtube-clone/thumbnails",
                resource_type: "image",
                public_id: `thumbnail-${Date.now()}`
            };
        } else if (file.fieldname === "videoFile") {
            return {
                folder: "youtube-clone/videos",
                resource_type: "video",
                public_id: `video-${Date.now()}`
            };
        }
    }
});

// fileFilter checks fieldname and mimetype
function fileFilter(req, file, cb) {
    if (file.fieldname === "thumbnail") {
        // Accept only images for thumbnail
        const allowedImageTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
        if (allowedImageTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Only image files are allowed for thumbnail!"), false);
        }
    } else if (file.fieldname === "videoFile") {
        // Accept only videos for videoFile
        const allowedVideoTypes = ["video/mp4", "video/avi", "video/mkv", "video/mov", "video/webm"];
        if (allowedVideoTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Only video files are allowed for videoFile!"), false);
        }
    } else {
        cb(new Error("Unexpected field"), false);
    }
}

const upload = multer({
    storage: storage,
    limits: { fileSize: 100 * 1024 * 1024 }, // max 100MB per file..
    fileFilter: fileFilter,
});

// Define fields to accept
const uploadFields = upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "videoFile", maxCount: 1 },
]);

export default uploadFields;
