// validation for video -- upload video..

// we are checking here only without title,thumbnailurl ,channel id we will not upload video..
export async function uploadVideoValidation(req, res, next) {
    try {
        // step 1 first check is req.boy  is having dta or not ..
        /**
         * Object.keys will return a array of keys and req.body is a lso a object so that means we can apply Object.keys() on it.
         */
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Request body is empty"
            })
        }

        // step 2 => if req.body is not empty then we need to extract video fileds from it ..
        let { title, thumbnailUrl, channel: channelId } = req.body;
        console.log("channel id is : ", channelId);

        // just additionaly trimming the whitespace .... i can put that in else but i go for it
        if (typeof title === "string") {
            title = title.trim();
        }
        if (typeof thumbnailUrl === "string") {
            thumbnailUrl = thumbnailUrl.trim();
        }
        if (typeof channelId === "string") {
            channelId = channelId.trim();
        }
        // updating the trimmed value back to req.body
        req.body.title = title;
        req.body.thumbnailUrl = thumbnailUrl;
        req.body.channel = channelId;
        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Sorry Title is required",
            })
        }
        /**
         * valid urls..
            http://example.com/image.jpg
            https://example.com/thumb.png

            https://www.example.com/path/to/image.jpeg

            http://subdomain.example.co.uk/assets/img.png

            https://example.com/?query=123
         */

        if (thumbnailUrl) {
            const urlPattern = /^(https?:\/\/[^\s$.?#].[^\s]*)$/i;
            if (!urlPattern.test(thumbnailUrl)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid thumbnailUrl format",
                });
            }
        }
        if (!channelId) {
            return res.status(400).json({
                success: false,
                message: "Sorry  channelId is required",
            })
        }
        // step 3 => if all validation are passed .... 
        next();
    } catch (error) {
        console.log("Error in uploadVideoValidation middleware:", error);
        return res.status(500).json(
            {
                success: false,
                message: "Internal server error"
            }
        );
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
        const isValidOperation = updates.every(function callback(field){ 
            return allowedUpdates.includes(field)
        });

        if (!isValidOperation) {
            return res.status(400).json({
                success: false,
                message: `Invalid updates! Allowed fields are: ${allowedUpdates.join(", ")}`,
            });
        }

        // Step 3: validating specific fields if present

        if (req.body.thumbnailUrl) {
            const urlPattern = /^(https?:\/\/[^\s$.?#].[^\s]*)$/i;
            if (!urlPattern.test(req.body.thumbnailUrl)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid thumbnailUrl format",
                });
            }
            req.body.thumbnailUrl=req.body.thumbnailUrl.trim();
        }
        // if(req.body.category===""){
        //     req.body.category="Entairtanment";
        // }
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
