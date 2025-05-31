// import { useEffect, useState } from "react";
// import axios from "../../utils/axiosInstance";
// import CommentForm from "./CommentForm";

// function CommentList(props) {
//     const videoId = props.videoId;
//     const [comments, setComments] = useState([]);

//     useEffect(function () {
//         fetchComments();
//     }, [videoId]);

//     async function fetchComments() {
//         try {
//             const response = await axios.get(`/comments/${videoId}`);
//             console.log("response of fetch comment on /comments/videoId is : ", response);

//             const fetchedComments = Array.isArray(response.data.data.allCommentsOfAvideoData)
//                 ? response.data.data.allCommentsOfAvideoData
//                 : [];

//             setComments(fetchedComments);
//         } catch (error) {
//             console.error("Error loading comments:", error);
//         }
//     }

//     function handleAdd(newComment) {
//         setComments(function (prev) {
//             return [newComment].concat(prev);
//         });
//     }

//     async function handleDelete(commentId) {
//         try {
//             await axios.delete(`/comments/${commentId}`);
//             setComments(function (prev) {
//                 return prev.filter(function (c) {
//                     return c._id !== commentId;
//                 });
//             });
//         } catch (error) {
//             console.error("Error deleting comment:", error);
//         }
//     }

//     async function handleEdit(commentId, newText) {
//         try {
//             const response = await axios.put(`/comments/${commentId}`, { text: newText });
//             const updatedText = response.data.text;
//             setComments(function (prev) {
//                 return prev.map(function (c) {
//                     if (c._id === commentId) {
//                         return Object.assign({}, c, { text: updatedText });
//                     }
//                     return c;
//                 });
//             });
//         } catch (error) {
//             console.error("Error editing comment:", error);
//         }
//     }

//     return (
//         <div className="space-y-4">
//             <CommentForm videoId={videoId} onAdd={handleAdd} />

//             {comments.map(function (comment) {
//                 const username = comment.userId?.name || "Anonymous";
//                 return (
//                     <div key={comment._id} className="border p-2 rounded">
//                         <p><strong>{username}</strong>: {comment.text}</p>
//                         <div className="flex space-x-2 mt-1">
//                             <button
//                                 className="text-blue-600"
//                                 onClick={function () {
//                                     const newText = prompt("Edit comment:", comment.text);
//                                     if (newText) {
//                                         handleEdit(comment._id, newText);
//                                     }
//                                 }}
//                             >
//                                 Edit
//                             </button>
//                             <button
//                                 className="text-red-600"
//                                 onClick={function () {
//                                     handleDelete(comment._id);
//                                 }}
//                             >
//                                 Delete
//                             </button>
//                         </div>
//                     </div>
//                 );
//             })}
//         </div>
//     );
// }

// export default CommentList;




//! ---- finial tested but some design problem but functionality nice . -------
// import { useEffect, useState } from "react";
// import axios from "../../utils/axiosInstance";
// import CommentForm from "./CommentForm";

// function CommentList({ videoId }) {
//     const [comments, setComments] = useState([]);
//     const [editingComment, setEditingComment] = useState(null);

//     useEffect(function () {
//         fetchComments();
//     }, [videoId]);

//     async function fetchComments() {
//         try {
//             const response = await axios.get(`/comments/${videoId}`);
//             const commentArray = response?.data?.data?.allCommentsOfAvideoData;
//             setComments(Array.isArray(commentArray) ? commentArray : []);
//         } catch (error) {
//             console.error("Error loading comments:", error);
//         }
//     }

//     function handleAdd(newComment) {
//         setComments(function (prev) {
//             return [newComment].concat(prev);
//         });
//     }

//     async function handleDelete(commentId) {
//         try {
//             await axios.delete(`/comments/${commentId}`);
//             setComments(function (prev) {
//                 return prev.filter(function (c) {
//                     return c._id !== commentId;
//                 });
//             });
//         } catch (error) {
//             console.error(`Error deleting comment ${commentId}:`, error);
//         }
//     }

//     async function handleEdit(commentId, newText) {
//         try {
//             const response = await axios.put(`/comments/${commentId}`, { text: newText });
//             console.log("response of put request or edit is : ",response);
//             const updatedText = response?.data?.data.updatedCommentData.text;
//             setComments(function (prev) {
//                 return prev.map(function (c) {
//                     if (c._id === commentId) {
//                         return { ...c, text: updatedText };
//                     }
//                     return c;
//                 });
//             });
//             setEditingComment(null);
//         } catch (error) {
//             console.error(`Error editing comment ${commentId}:`, error);
//         }
//     }

//     function handleEditClick(comment) {
//         setEditingComment(comment);
//     }

//     function cancelEdit() {
//         setEditingComment(null);
//     }

//     return (
//         <div className="space-y-4">
//             <CommentForm
//                 videoId={videoId}
//                 onAdd={handleAdd}
//                 onEdit={handleEdit}
//                 editingComment={editingComment}
//                 cancelEdit={cancelEdit}
//             />

//             {comments.map(function (comment) {
//                 const username = comment.userId?.name || "Anonymous";

//                 return (
//                     <div key={comment._id} className="border p-2 rounded">
//                         <p><strong>{username}</strong>: {comment.text}</p>
//                         <div className="flex space-x-2 mt-1">
//                             <button
//                                 className="text-blue-600"
//                                 onClick={function () {
//                                     handleEditClick(comment);
//                                 }}
//                             >
//                                 Edit
//                             </button>
//                             <button
//                                 className="text-red-600"
//                                 onClick={function () {
//                                     handleDelete(comment._id);
//                                 }}
//                             >
//                                 Delete
//                             </button>
//                         </div>
//                     </div>
//                 );
//             })}
//         </div>
//     );
// }

// export default CommentList;



//! ------ working but design flaw -------

// return (
//     <div className="comment-list">
//         <CommentForm
//             videoId={videoId}
//             onAdd={handleAdd}
//             onEdit={handleEdit}
//             editingComment={editingComment}
//             cancelEdit={cancelEdit}
//         />

//         {comments.map(function (comment) {
//             // const username = comment.userId?.userName || "Anonymous";

//             return (
//                 <div key={comment._id} className="comment-item">
//                     {/* <p className="comment-text">
//                         {/* <strong className="comment-username">{username}</strong>: {comment.text} /
//                         <img src={comment.userId.avatar}>
//                         </img>
//                     </p> */}
//                     {/* <img src={comment.userId.avatar} alt="avatar" />

//                     <div className="comment-text">
//                         <span className="comment-username">
//                             {comment.userId.userName || "Anonymous"}
//                         </span>
//                         {comment.text}
//                     </div> */}
//                     <div className="comment-actions">
//                         <button
//                             className="comment-edit-button"
//                             onClick={function () {
//                                 handleEditClick(comment);
//                             }}
//                         >
//                             Edit
//                         </button>
//                         <button
//                             className="comment-delete-button"
//                             onClick={function () {
//                                 handleDelete(comment._id);
//                             }}
//                         >
//                             Delete
//                         </button>
//                     </div>
//                 </div>
//             );
//         })}
//     </div>
// );


//? ----- adding custome css .-----------



// import {useContext, useEffect, useState } from "react";
// import axios from "../../utils/axiosInstance";
// import CommentForm from "./CommentForm";
// import "./commentList.css";
// import { timeSince } from "../../utils/dateFormat";

// import { AuthContext } from "../../context/AuthContext";
// import { Link } from "react-router-dom";


// function CommentList({ videoId }) {
//     const auth = useContext(AuthContext);
//     console.log("auth user in comment is : ------------------>> -------->> ", auth);
//     const [comments, setComments] = useState([]);
//     const [editingComment, setEditingComment] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(function () {
//         fetchComments();
//     }, [videoId]);

//     // async function fetchComments() {
//     //     setIsLoading(true); 
//     //     try {
//     //         const response = await axios.get(`/comments/${videoId}`);
//     //         const commentArray = response?.data?.data?.allCommentsOfAvideoData;
//     //         setComments(Array.isArray(commentArray) ? commentArray : []);
//     //     } catch (error) {
//     //         console.error("Error loading comments:", error);
//     //     } finally {
//     //         setIsLoading(false); // Stop loading
//     //     }
//     // }
//     async function fetchComments() {
//         setIsLoading(true);
//         try {
//             const response = await axios.get(`/comments/${videoId}`);
//             console.log("repsonse of fetching all commments by video id -==================> ",response);
//             const commentArray = response?.data?.data?.allCommentsOfAvideoData;

//             // Add artificial delay (e.g., 500ms)
//             setTimeout(function () {
//                 setComments(Array.isArray(commentArray) ? commentArray : []);
//                 setIsLoading(false);
//             }, 3000);
//         } catch (error) {
//             console.error("Error loading comments:", error);
//             setIsLoading(false);
//         }
//     }

//     function handleAdd(newComment) {
//         setComments(function (prev) {
//             return [newComment].concat(prev);
//         });
//     }

//     async function handleDelete(commentId) {
//         try {
//             await axios.delete(`/comments/${commentId}`);
//             setComments(function (prev) {
//                 return prev.filter(function (c) {
//                     return c._id !== commentId;
//                 });
//             });
//         } catch (error) {
//             console.error(`Error deleting comment ${commentId}:`, error);
//         }
//     }

//     async function handleEdit(commentId, newText) {
//         try {
//             const response = await axios.put(`/comments/${commentId}`, { text: newText });
//             const updatedText = response?.data?.data.updatedCommentData.text;
//             setComments(function (prev) {
//                 return prev.map(function (c) {
//                     if (c._id === commentId) {
//                         return { ...c, text: updatedText };
//                     }
//                     return c;
//                 });
//             });
//             setEditingComment(null);
//         } catch (error) {
//             console.error(`Error editing comment ${commentId}:`, error);
//         }
//     }

//     function handleEditClick(comment) {
//         setEditingComment(comment);
//     }

//     function cancelEdit() {
//         setEditingComment(null);
//     }

//     console.log("------auth.userId is : ",auth.user._id);
//     // console.log("---------comment.userId._id is : ",comments[0].userId._id)

//     return (
//         <div className="comment-list">
//             <CommentForm
//                 videoId={videoId}
//                 onAdd={handleAdd}
//                 onEdit={handleEdit}
//                 editingComment={editingComment}
//                 cancelEdit={cancelEdit}
//             />

//             {isLoading ? (
//                 <div className="comment-loading">
//                     <div className="comment-spinner"></div>
//                     <p>Please wait, comments are loading...</p>
//                 </div>
//             ) : (
//                 comments.map(function (comment) {
//                     const user = comment.userId;
//                     console.log("user in map is : ",user);
//                     const channel = user?.channel;
//                     console.log("channel is : ",channel);
//                     return (
//                         <div key={comment._id} className="comment-item">
//                             {comment.userId?.channel ? (
//                                 <Link to={`/profile/${comment.userId.channel._id}`}>
//                                     <img
//                                         src={comment.userId.avatar}
//                                         alt="avatar"
//                                         className="comment-avatar"
//                                     />
//                                 </Link>
//                             ) : (
//                                 <img
//                                     src={comment.userId.avatar}
//                                     alt="avatar"
//                                     className="comment-avatar"
//                                 />
//                             )}
//                             <div className="comment-content">
//                                 <div className="comment-header">
//                                     <span className="comment-username">
//                                         @{comment.userId.userName || "Anonymous"}
//                                     </span>
//                                     <span className="comment-time">
//                                         • {timeSince(comment.timestamp)}
//                                     </span>
//                                 </div>
//                                 <p className="comment-text">{comment.text}</p>
//                                 {/* <p>{comment.userId._id}</p> */}
//                             </div>

//                             { auth.user && auth.user._id === comment.userId._id && (
                                
//                                 <div className="comment-actions">
//                                     <button
//                                         className="comment-edit-button"
//                                         onClick={function () {
//                                             handleEditClick(comment);
//                                         }}
//                                     >
//                                         Edit
//                                     </button>
//                                     <button
//                                         className="comment-delete-button"
//                                         onClick={function () {
//                                             handleDelete(comment._id);
//                                         }}
//                                     >
//                                         Delete
//                                     </button>
//                                 </div>
//                             )}
//                         </div>
//                     );
//                 })
//             )}
//         </div>
//     );

// }

// export default CommentList;



//! just tyring to change few things in layout --- no functionalty changes ... 

import { useContext, useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import CommentForm from "./CommentForm";
import "./commentList.css";
import { timeSince } from "../../utils/dateFormat";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

function CommentList({ videoId }) {
    const auth = useContext(AuthContext);
    const [comments, setComments] = useState([]);
    const [editingComment, setEditingComment] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(function () {
        fetchComments();
    }, [videoId]);

    async function fetchComments() {
        setIsLoading(true);
        try {
            const response = await axios.get(`/comments/${videoId}`);
            const commentArray = response?.data?.data?.allCommentsOfAvideoData;
            setTimeout(function () {
                setComments(Array.isArray(commentArray) ? commentArray : []);
                setIsLoading(false);
            }, 3000);
        } catch (error) {
            console.error("Error loading comments:", error);
            setIsLoading(false);
        }
    }

    function handleAdd(newComment) {
        setComments(function (prev) {
            return [newComment].concat(prev);
        });
    }

    async function handleDelete(commentId) {
        try {
            await axios.delete(`/comments/${commentId}`);
            setComments(function (prev) {
                return prev.filter(function (c) {
                    return c._id !== commentId;
                });
            });
        } catch (error) {
            console.error(`Error deleting comment ${commentId}:`, error);
        }
    }

    async function handleEdit(commentId, newText) {
        try {
            const response = await axios.put(`/comments/${commentId}`, { text: newText });
            const updatedText = response?.data?.data.updatedCommentData.text;
            setComments(function (prev) {
                return prev.map(function (c) {
                    if (c._id === commentId) {
                        return { ...c, text: updatedText };
                    }
                    return c;
                });
            });
            setEditingComment(null);
        } catch (error) {
            console.error(`Error editing comment ${commentId}:`, error);
        }
    }

    function handleEditClick(comment) {
        setEditingComment({ _id: comment._id, text: comment.text });
    }

    function cancelEdit() {
        setEditingComment(null);
    }

    return (
        <div className="comment-list">
            {/* Only for new comment */}
            <CommentForm
                videoId={videoId}
                onAdd={handleAdd}
            />

            {isLoading ? (
                <div className="comment-loading">
                    <div className="comment-spinner"></div>
                    <p>Please wait, comments are loading...</p>
                </div>
            ) : (
                comments.map(function (comment) {
                    const user = comment.userId;
                    const isEditing = editingComment && editingComment._id === comment._id;

                    return (
                        <div key={comment._id} className="comment-item">
                            {user?.channel ? (
                                <Link to={`/profile/${user.channel._id}`}>
                                    <img
                                        src={user.avatar}
                                        alt="avatar"
                                        className="comment-avatar"
                                    />
                                </Link>
                            ) : (
                                <img
                                    src={user.avatar}
                                    alt="avatar"
                                    className="comment-avatar"
                                />
                            )}
                            <div className="comment-content">
                                <div className="comment-header">
                                    <span className="comment-username">
                                        @{user.userName || "Anonymous"}
                                    </span>
                                    <span className="comment-time">
                                        • {timeSince(comment.timestamp)}
                                    </span>
                                </div>

                                {isEditing ? (
                                    <div className="inline-edit-form">
                                        <input
                                            type="text"
                                            value={editingComment.text}
                                            onChange={function (e) {
                                                setEditingComment({
                                                    ...editingComment,
                                                    text: e.target.value,
                                                });
                                            }}
                                            className="inline-edit-input"
                                        />
                                        <div className="inline-edit-buttons">
                                            <button
                                                onClick={function () {
                                                    handleEdit(editingComment._id, editingComment.text);
                                                }}
                                                className="inline-edit-save"
                                            >
                                                Update
                                            </button>
                                            <button
                                                onClick={cancelEdit}
                                                className="inline-edit-cancel"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="comment-text">{comment.text}</p>
                                )}
                            </div>

                            {auth.user && auth.user._id === comment.userId._id && !isEditing && (
                                <div className="comment-actions">
                                    <button
                                        className="comment-edit-button"
                                        onClick={function () {
                                            handleEditClick(comment);
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="comment-delete-button"
                                        onClick={function () {
                                            handleDelete(comment._id);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                })
            )}
        </div>
    );
}

export default CommentList;
