import { Comment } from "../schema/commentSchema.js";


export async function checkCommentOwnership(req, res, next) {
    try {
        const commentId = req.params.id;
        console.log("comment id is : ",req.params.id);
        console.log("comment id is -----> ",commentId);
        const userIdFromToken = req.user._id;

        const comment = await Comment.findById(commentId);
        console.log("comment in ownership is : ",comment);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found in ownership' });
        }

        if (comment.userId.toString() !== userIdFromToken) {
            return res.status(403).json({ message: 'You are not the owner of this comment' });
        }

        next();
    } catch (error) {
        return res.status(500).json({ message: 'Ownership check failed', error: error.message });
    }
}
