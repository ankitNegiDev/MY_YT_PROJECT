// (1) validation for uploading video — supports both file and YouTube flows
export async function uploadVideoValidation(req, res, next) {
    try {
        // Step 1 => Check if req.body is not empty
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Request body is empty"
            });
        }

        // Step 2 => Extract and trim all the required fields
        let { title, thumbnailUrl, channel: channelId, videoUrl } = req.body;

        if (typeof title === "string") title = title.trim();
        if (typeof thumbnailUrl === "string") thumbnailUrl = thumbnailUrl.trim();
        if (typeof channelId === "string") channelId = channelId.trim();
        if (typeof videoUrl === "string") videoUrl = videoUrl.trim();

        // Update trimmed values back
        req.body.title = title;
        req.body.thumbnailUrl = thumbnailUrl;
        req.body.channel = channelId;
        req.body.videoUrl = videoUrl;

        // Step 3 => Validate all required fields
        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Title is required"
            });
        }

        if (!channelId) {
            return res.status(400).json({
                success: false,
                message: "Channel ID is required"
            });
        }

        // Step 4 =>  validate only whne it is  provided by usser..
        if (thumbnailUrl) {
            const urlPattern = /^(https?:\/\/[^\s$.?#].[^\s]*)$/i;
            if (!urlPattern.test(thumbnailUrl)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid thumbnailUrl format"
                });
            }
        }

        // Step 5 => Checking that either video file is uploaded or videoUrl is present to make sure if uer pass the normal video then we are chekcing is video is uploded or not that means we will have cloudinary url and if user sends the normal yt url then we will have that url
        const isFileUploaded = req.files && req.files.videoFile;
        if (!isFileUploaded && !videoUrl) {
            return res.status(400).json({
                success: false,
                message: "Either video file or videoUrl (YouTube link) must be provided"
            });
        }

        // Step 6 =>> when all validations passed 
        next();
    } catch (error) {
        console.log("Error in uploadVideoValidation middleware:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}


// video update validation

export async function updateVideoValidation(req, res, next) {
    try {
        const allowedUpdates = ["title", "thumbnailUrl", "description", "category"];
        const updates = Object.keys(req.body); // we will get all keys array from the req.body ... which ideally should contain title,thumbnail .... category etc..

        // Step 1: Check if req.body is empty or not
        if (!req.body || updates.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Request body is empty, nothing to update",
            });
        }

        // Step 2: Checking if all update keys are allowed or not
        const isValidOperation = updates.every(function callback(field) {
            return allowedUpdates.includes(field)
        });

        if (!isValidOperation) {
            return res.status(400).json({
                success: false,
                message: `Invalid updates! Allowed fields are: ${allowedUpdates.join(", ")}`,
            });
        }

        // Step 3: validating specific fields if present

        if (req.body.title) {
            if (typeof req.body.title === "string") {
                req.body.title = req.body.title.trim();
            }
            if (!req.body.title) {
                return res.status(400).json({
                    success: false,
                    message: "Title cannot be empty"
                });
            }
        }

        if (req.body.thumbnailUrl) {
            if (typeof req.body.thumbnailUrl === "string") {
                req.body.thumbnailUrl = req.body.thumbnailUrl.trim();
            }
            const urlPattern = /^(https?:\/\/[^\s$.?#].[^\s]*)$/i;
            if (!urlPattern.test(req.body.thumbnailUrl)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid thumbnailUrl format"
                });
            }
        }

        // add more if needed in category.
        const allowedCategories = ["Music", "Education", "Comedy", "Entertainment", "Horror", "Science", "Jungle Surviving", "Army"];

        if (req.body.category) {
            // applying case insensitive validation .. like we are not forcing user to write category in some specific format..
            const categoryLower = req.body.category.trim().toLowerCase();

            const allowedLower = allowedCategories.map(cat => cat.toLowerCase());

            if (!allowedLower.includes(categoryLower)) {
                return res.status(400).json({
                    success: false,
                    message: `Category must be one of: ${allowedCategories.join(", ")}`,
                });
            }

            // at last normalize the category back to the original casing from allowedCategories
            const index = allowedLower.indexOf(categoryLower); // find the index of that ctegory that user write in our allowedCategory array and then set back to req.body.category..
            req.body.category = allowedCategories[index];
        }


        if (req.body.category) {
            if (!allowedCategories.includes(req.body.category)) {
                return res.status(400).json({
                    success: false,
                    message: `Category must be one of: ${allowedCategories.join(", ")}`,
                });
            }
        }


        //! do it same for other if there is requirement .... check it later .... from frented...

        // Step 4: If everything is fine, proceed
        console.log("calling next middleware from videoValidators");
        next();
    } catch (error) {
        console.error("Error in updateVideoValidation:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}
