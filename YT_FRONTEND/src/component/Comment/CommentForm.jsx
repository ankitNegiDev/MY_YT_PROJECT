//! ----------------- finial tested code ----------- 
// import { useState, useEffect } from "react";
// import axios from "../../utils/axiosInstance";

// function CommentForm({ videoId, onAdd, onEdit, editingComment, cancelEdit }) {
//     const [text, setText] = useState("");

//     useEffect(function () {
//         setText(editingComment?.text || ""); // ?. is called optional channing if value then set it else set nothing (return undefined..) when there is null or undefine.
//     }, [editingComment]);

//     async function handleSubmit(event) {
//         event.preventDefault();

//         if (!text.trim()) return;

//         if (editingComment) {
//             try {
//                 await onEdit(editingComment._id, text);
//                 setText("");
//             } catch (error) {
//                 console.error("Error updating comment:", error);
//             }
//         } else {
//             try {
//                 const response = await axios.post(`/comments/${videoId}`, { text });
//                 const newComment = response?.data?.data?.commentData;
//                 if (newComment) {
//                     onAdd(newComment);
//                     setText("");
//                 }
//             } catch (error) {
//                 console.error("Error posting comment:", error);
//             }
//         }
//     }

//     return (
//         <form onSubmit={handleSubmit} className="flex items-center space-x-2 mb-4">
//             <input
//                 type="text"
//                 placeholder="Add a comment..."
//                 value={text || ""}
//                 onChange={function (e) { setText(e.target.value); }}
//                 className="border px-2 py-1 rounded flex-grow"
//             />
//             <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">
//                 {editingComment ? "Update" : "Post"}
//             </button>
//             {editingComment && (
//                 <button
//                     type="button"
//                     onClick={function () {
//                         setText(""); // Optional: reset input
//                         cancelEdit();
//                     }}
//                     className="bg-gray-300 px-3 py-1 rounded"
//                 >
//                     Cancel
//                 </button>
//             )}
//         </form>
//     );
// }

// export default CommentForm;


//! --------- now just writing the custom css ----------

// import { useState, useEffect } from "react";
// import axios from "../../utils/axiosInstance";
// import './commentForm.css';
// function CommentForm({ videoId, onAdd, onEdit, editingComment, cancelEdit }) {
//     const [text, setText] = useState("");

//     useEffect(function () {
//         setText(editingComment?.text || "");
//     }, [editingComment]);

//     async function handleSubmit(event) {
//         event.preventDefault();

//         if (!text.trim()) return;

//         if (editingComment) {
//             try {
//                 await onEdit(editingComment._id, text);
//                 setText("");
//             } catch (error) {
//                 console.error("Error updating comment:", error);
//             }
//         } else {
//             try {
//                 const response = await axios.post(`/comments/${videoId}`, { text });
//                 console.log("reponse after posting a comment : ",response);
//                 const newComment = response?.data?.data?.commentData;
//                 if (newComment) {
//                     onAdd(newComment);
//                     setText("");
//                 }
//             } catch (error) {
//                 console.error("Error posting comment:", error);
//             }
//         }
//     }

//     return (
//         <form onSubmit={handleSubmit} className="comment-form">
//             <input
//                 type="text"
//                 placeholder="Add a comment..."
//                 value={text || ""}
//                 onChange={function (e) { setText(e.target.value); }}
//                 className="comment-input"
//             />

//             <div className="comment-button-group">
//                 <button type="submit" className="comment-button">
//                     {editingComment ? "Update" : "Post"}
//                 </button>

//                 {editingComment && (
//                     <button
//                         type="button"
//                         onClick={function () {
//                             setText("");
//                             cancelEdit();
//                         }}
//                         className="cancel-button"
//                     >
//                         Cancel
//                     </button>
//                 )}
//             </div>
//         </form>
    
//     );
// }

// export default CommentForm;


//! just added a feature inorder to prevent the empty comments ---- although we are handeling it on backend and in frontend but just added the disabled property untile there is no text in the input fieled.

import { useState, useEffect } from "react";
import axios from "../../utils/axiosInstance";
import './commentForm.css';

function CommentForm({ videoId, onAdd, onEdit, editingComment, cancelEdit }) {
    const [text, setText] = useState("");

    useEffect(function () {
        setText(editingComment?.text || "");
    }, [editingComment]);

    async function handleSubmit(event) {
        event.preventDefault();
        const trimmedText = text.trim();

        if (!trimmedText) return;

        try {
            if (editingComment) {
                await onEdit(editingComment._id, trimmedText);
            } else {
                const response = await axios.post(`/comments/${videoId}`, { text: trimmedText });
                const newComment = response?.data?.data?.commentData;
                if (newComment) {
                    onAdd(newComment);
                }
            }
            setText("");
        } catch (error) {
            console.error("Error submitting comment:", error);
        }
    }

    function handleCancel() {
        setText("");
        cancelEdit();
    }

    return (
        <form onSubmit={handleSubmit} className="comment-form">
            <label htmlFor="comment-input" className="sr-only">Comment</label>
            <input
                id="comment-input"
                type="text"
                placeholder="Add a comment..."
                value={text}
                onChange={function (e) { setText(e.target.value); }}
                className="comment-input"
                autoComplete="off"
            />

            <div className="comment-button-group">
                <button type="submit" className="comment-button" disabled={!text.trim()}>
                    {editingComment ? "Update" : "Post"}
                </button>

                {editingComment && (
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="cancel-button"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
}

export default CommentForm;
