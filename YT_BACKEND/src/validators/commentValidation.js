export function validateCreateComment(req, res, next) {
    const { videoId } = req.params;
    console.log("video id is : ",videoId);
    const { text} = req.body;
    const userId=req.user._id;
    console.log("user id is : ",userId);

    // Simple regex to check if videoId and userId look like ObjectId (24 hex chars)
    const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

    const errors = [];

    if (!videoId || !isValidObjectId(videoId)) {
        errors.push({ field: "videoId", message: "Invalid or missing videoId" });
    }
    if (!text || typeof text !== "string" || text.trim().length === 0) {
        errors.push({ field: "text", message: "Text is required and must be a non-empty string" });
    }
    if (!userId || !isValidObjectId(userId)) {
        errors.push({ field: "userId", message: "Invalid or missing userId" });
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    console.log("calling next middle from validation");
    next();
}  


export function validateUpdateComment(req, res, next) {
    // const { commentId } = req.params;
    const commentId=req.params.id;
    console.log("comment id is : ",commentId);
    const { text } = req.body;

    // Simple regex to check if commentId looks like a MongoDB ObjectId
    const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

    // we are already cheking for id in service but its fine ---> check later which one is fine acc to project ..
    // Validate commentId
    if (!isValidObjectId(commentId)) {
        return res.status(400).json({
            error: "Invalid commentId. Must be a valid MongoDB ObjectId (24 hex characters)."
        });
    }

    // Validate text
    if (typeof text !== "string" || text.trim() === "") {
        return res.status(400).json({
            error: "Text is required and must be a non-empty string."
        });
    }

    // If all validations pass
    next();
}
