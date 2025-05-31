// import React, { useEffect, useState } from "react";
// import axios from "../../utils/axiosInstance";
// import { useParams } from "react-router-dom";

// function VideoPlayer() {
//     const { videoId } = useParams(); // this is your MongoDB video _id (NOT YouTube videoId)
//     console.log("video id is : ", videoId);

//     const [video, setVideo] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [comments, setComments] = useState([]);

//     console.log(`/video/${videoId}`);
//     useEffect(() => {
//         async function fetchVideoAndComments() {
//             try {
//                 // Fetch the video document by its _id (MongoDB id)
//                 const videoResponse = await axios.get(`/video/${videoId}`);
//                 // const videoResponse = await axios.get("http://localhost:3000/api/video/683164de86589917f131e42d");
//                 // console.log("video response from backend : ",videoResponse);
//                 // console.log("videoresponse . data is : ",videoResponse.data);
//                 // console.log("videoresponse . data.data is : ", videoResponse.data.data);

//                 const videoData = videoResponse.data.data.videoData; // adjust based on your API response
//                 // console.log("videodata is ------------------------------------> \n\n",videoData);
//                 setVideo(videoData);

//                 // Now fetch comments for this video
//                 const commentsResponse = await axios.get(`/comments/${videoId}`);
//                 setComments(Array.isArray(commentsResponse.data.comments) ? commentsResponse.data.comments : []);

//                 setLoading(false);
//             } catch (error) {
//                 console.error("Error fetching video or comments:", error);
//                 setLoading(false);
//             }
//         }

//         fetchVideoAndComments();
//     }, [videoId]);

//     if (loading) {
//         return <div>Loading video...</div>;
//     }

//     if (!video) {
//         return <div>Video not found.</div>;
//     }


//     // Now embed YouTube with video.videoId (the YouTube id inside your video document)
//     return (
//         <div>
//             <h1>{video.title}</h1>
//             <iframe
//                 width="560"
//                 height="315"
//                 src={`https://www.youtube.com/embed/${video.videoId}`}
//                 title={video.title}
//                 frameBorder="0"
//                 allowFullScreen
//             ></iframe>

//             <h2>Comments</h2>
//             {comments.length ? (
//                 comments.map(comment => (
//                     <div key={comment._id} className="comment">
//                         <p><strong>{comment.user}</strong>: {comment.text}</p>
//                     </div>
//                 ))
//             ) : (
//                 <p>No comments yet.</p>
//             )}
//         </div>
//     );
// }

// export default VideoPlayer;




// import { useEffect, useState } from "react";
// import axios from "../../utils/axiosInstance";
// import { useParams } from "react-router-dom";

// function VideoPlayer() {
//     const { videoId } = useParams(); // MongoDB video _id
//     const [video, setVideo] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [comments, setComments] = useState([]);

//     useEffect(() => {
//         async function fetchVideoAndComments() {
//             try {
//                 const videoResponse = await axios.get(`/video/${videoId}`);
//                 const videoData = videoResponse.data.data.videoData;
//                 setVideo(videoData);

//                 const commentsResponse = await axios.get(`/comments/${videoId}`);
//                 setComments(Array.isArray(commentsResponse.data.comments) ? commentsResponse.data.comments : []);

//                 setLoading(false);
//             } catch (error) {
//                 console.error("Error fetching video or comments:", error);
//                 setLoading(false);
//             }
//         }

//         fetchVideoAndComments();
//     }, [videoId]);

//     if (loading) {
//         return <div>Loading video...</div>;
//     }

//     if (!video) {
//         return <div>Video not found.</div>;
//     }

//     // Conditional rendering based on uploadType
//     const isYoutube = video.uploadType === "youtube";

//     return (
//         <div>
//             <h1>{video.title}</h1>

//             {isYoutube ? (
//                 // YouTube iframe player
//                 <iframe
//                     // width="560"
//                     // height="315"
//                     // src={`https://www.youtube.com/embed/${video.videoId}`}
//                     // title={video.title}
//                     // frameBorder="0"
//                     // allowFullScreen
//                     width="560"
//                     height="315"
//                     src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1`}
//                     title={video.title}
//                     frameBorder="0"
//                     allow="autoplay; encrypted-media"
//                     allowFullScreen
//                 ></iframe>
//             ) : (
//                 // Cloudinary or uploaded video player
//                 <video
//                     // width="560"
//                     // height="315"
//                     // controls
//                     // src={video.videoUrl}
//                     // poster={video.thumbnailUrl}
//                     // autoPlay
//                         width="560"
//                         height="315"
//                         controls
//                         autoPlay
//                         src={video.videoUrl}
//                         poster={video.thumbnailUrl}
//                 >
//                     Your browser does not support the video tag.
//                 </video>
//             )}

//             {/* Add video description here */}
//             {video.description && (
//                 <p style={{ marginBottom: "1rem", whiteSpace: "pre-wrap" }}>
//                     {video.description}
//                 </p>
//             )}


//             <h2>Comments</h2>
//             {comments.length ? (
//                 comments.map(comment => (
//                     <div key={comment._id} className="comment">
//                         <p><strong>{comment.user}</strong>: {comment.text}</p>
//                     </div>
//                 ))
//             ) : (
//                 <p>No comments yet.</p>
//             )}
//         </div>
//     );
    
// }

// export default VideoPlayer;


// import { useEffect, useState } from "react";
// import axios from "../../utils/axiosInstance";
// import { useParams } from "react-router-dom";

// function VideoPlayer() {
//     const { videoId } = useParams();
//     console.log("video id in videoplayer  : ",videoId);
//     const [video, setVideo] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [comments, setComments] = useState([]);

//     useEffect(() => {
//         async function fetchVideoAndComments() {
//             try {
//                 const videoResponse = await axios.get(`/video/${videoId}`);
//                 const videoData = videoResponse.data.data.videoData;
//                 setVideo(videoData);

//                 const commentsResponse = await axios.get(`/comments/${videoId}`);
//                 setComments(
//                     Array.isArray(commentsResponse.data.comments)
//                         ? commentsResponse.data.comments
//                         : []
//                 );

//                 setLoading(false);
//             } catch (error) {
//                 console.error("Error fetching video or comments:", error);
//                 setLoading(false);
//             }
//         }

//         fetchVideoAndComments();
//     }, [videoId]);

//     if (loading) {
//         return <div>Loading video...</div>;
//     }

//     if (!video) {
//         return <div>Video not found.</div>;
//     }

//     const isYoutube = video.uploadType === "youtube";

//     return (
//         <div>
//             <h1>{video.title}</h1>

//             {isYoutube ? (
//                 <iframe
//                     key={videoId} // remount on video change
//                     width="560"
//                     height="315"
//                     src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1`}
//                     title={video.title}
//                     frameBorder="0"
//                     allow="autoplay; encrypted-media"
//                     allowFullScreen
//                 ></iframe>
//             ) : (
//                 <video
//                     key={videoId} // remount on video change
//                     width="560"
//                     height="315"
//                     controls
//                     autoPlay
//                     src={video.videoUrl}
//                     poster={video.thumbnailUrl}
//                 >
//                     Your browser does not support the video tag.
//                 </video>
//             )}

//             <h2>Description</h2>
//             <p>{video.description}</p>

//             <h2>Comments</h2>
//             {comments.length ? (
//                 comments.map((comment) => (
//                     <div key={comment._id} className="comment">
//                         <p>
//                             <strong>{comment.user}</strong>: {comment.text}
//                         </p>
//                     </div>
//                 ))
//             ) : (
//                 <p>No comments yet.</p>
//             )}
//         </div>
//     );
// }

// export default VideoPlayer;



//! ------ below is finial working code ------------------

// import { useContext, useEffect, useState } from "react";
// import axios from "../../utils/axiosInstance";
// import { useParams } from "react-router-dom";
// import CommentList from "../../component/Comment/CommentList";
// import { AuthContext } from "../../context/AuthContext";


// function VideoPlayer() {
//     console.log("video player ::::: ");
//     const auth = useContext(AuthContext);
    
//     const { videoId } = useParams();
//     const [video, setVideo] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         async function fetchVideo() {
//             try {
//                 const videoResponse = await axios.get(`/video/${videoId}`);
//                 console.log("video resopnse is : --------_> ",videoResponse);
//                 const videoData = videoResponse.data.data.videoData;
//                 setVideo(videoData);
//                 setLoading(false);
//             } catch (error) {
//                 console.error("Error fetching video:", error);
//                 setLoading(false);
//             }
//         }

//         fetchVideo();
//     }, [videoId]);

//     if (loading) return <div>Loading video...</div>;
//     if (!video) return <div>Video not found.</div>;

//     const isYoutube = video.uploadType === "youtube";

//     return (
//         <div className="p-4">
//             <h1 className="text-xl font-bold mb-4">{video.title}</h1>

//             {isYoutube ? (
//                 <iframe
//                     key={videoId}
//                     width="560"
//                     height="315"
//                     src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1`}
//                     title={video.title}
//                     frameBorder="0"
//                     allow="autoplay; encrypted-media"
//                     allowFullScreen
//                 ></iframe>
//             ) : (
//                 <video
//                     key={videoId}
//                     width="560"
//                     height="315"
//                     controls
//                     autoPlay
//                     src={video.videoUrl}
//                     poster={video.thumbnailUrl}
//                 >
//                     Your browser does not support the video tag.
//                 </video>
//             )}

//             <h2>{video.title}</h2>
//             {/* user avatar  -> channel name  -> subscribe button --> like dislike button  -> share -> download button (keep static all button for right now..) */}
//             <div>
//                 <img
//                     src={auth.user.avatar}
//                     alt="Channel Avatar"
//                     className="channel-avatar"
//                 />
//                 <p>{video.channel.channelName}</p>
//                 <button>Subscribe</button>
//                 <div>
//                     {/* like and dislike button */}
//                 </div>
//                 {/* share button */}
//                 {/* download button */}
//             </div>

//             <h2 className="text-lg font-semibold mt-4">Description</h2>
//             <p>{video.description}</p>

//             {/* 🧩 Comment Section */}
//             <h2 className="text-lg font-semibold mt-6 mb-2">Comments</h2>
//             <CommentList videoId={videoId} />
//         </div>
//     );
// }

// export default VideoPlayer;






//! --------------- just adding custom css and no like and dislike functionality ------------




import { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import { Link, useParams } from "react-router-dom";
// import CommentList from "../../component/Comment/CommentList";
// import { AuthContext } from "../../context/AuthContext";
import "./videoPlayer.css";
import CommentList from "../../component/Comment/CommentList";
import ProfileHeader from "../Profile/ProfileHeader";
import ProfileSidebar from "../Profile/ProfileSidebar";
// import Header from '../../component/Header/Header'
// import Sidebar from '../../component/Sidebar/Sidebar'


function VideoPlayer() {
    console.log("video player ::::: ");
    // const auth = useContext(AuthContext); // no need becuse we want to show na which user posted this video naa kii kon user loged in hae.
    
    const { videoId } = useParams();
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchVideo() {
            try {
                const videoResponse = await axios.get(`/video/${videoId}`);
                console.log("video resopnse is : ==================> ",videoResponse);
                const videoData = videoResponse.data.data.videoData;
                console.log("video data is : ",videoData);
                setVideo(videoData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching video:", error);
                setLoading(false);
            }
        }

        fetchVideo();
    }, [videoId]);

    if (loading) return <div>Loading video...</div>;
    if (!video) return <div>Video not found.</div>;

    const isYoutube = video.uploadType === "youtube";
    // console.log("video.channel is : ",video.channel._id);
    const channelId=video.channel._id;

    // liek and dislike funcitonality 
    // this is for when the like and dislie is updated in db .........
    async function fetchVideo() {
        try {
            const videoResponse = await axios.get(`/video/${videoId}`);
            const videoData = videoResponse.data.data.videoData;
            setVideo(videoData);
        } catch (error) {
            console.error("Error fetching video:", error);
        } finally {
            setLoading(false);
        }
    }
    async function handleLike() {
        try {
            // const res = await axios.post(`/video/${videoId}/like`);
            await axios.post(`/video/${videoId}/like`); // this will do changes in db and we now fetch agian the videos.
            fetchVideo();

            // console.log("responseo f like is : ",res);
            // const updatedVideo = res.data.data.updateVideoData;
            // setVideo(updatedVideo); // update video state with new like count
        } catch (err) {
            console.error("Error liking video:", err);
        }
    }

    async function handleDislike() {
        try {
            // const res = await axios.post(`/video/${videoId}/dislike`);
            await axios.post(`/video/${videoId}/dislike`);
            fetchVideo();

            // const updatedVideo = res.data.data.updateVideoData;
            // setVideo(updatedVideo); // update video state with new dislike count
        } catch (err) {
            console.error("Error disliking video:", err);
        }
    }
    
    return (
        <>
            <ProfileHeader />
            <div className="video-player-layout">
                <ProfileSidebar />
                <main className="video-player-main-content">
                    <div className="video-player-container">
                        <div className="video-wrapper">
                            {isYoutube ? (
                                <iframe
                                    key={videoId}
                                    className="video-frame"
                                    src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1`}
                                    title={video.title}
                                    frameBorder="0"
                                    allow="autoplay; encrypted-media"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <video
                                    key={videoId}
                                    className="video-frame"
                                    controls
                                    autoPlay
                                    src={video.videoUrl}
                                    poster={video.thumbnailUrl}
                                >
                                    Your browser does not support the video tag.
                                </video>
                            )}
                        </div>


                        <h1 className="video-main-title">{video.title}</h1>

                        <div className="video-details-row">
                            <div className="channel-info">
                                <Link to={`/profile/${channelId}`}>
                                    <img
                                        src={video.channel.owner.avatar}
                                        alt="Channel Avatar"
                                        className="channel-avatar"
                                    />
                                </Link>
                                <div className="channel-meta">
                                    <p className="channel-name">{video.channel.channelName}</p>
                                </div>
                                <button className="subscribe-button">Subscribe</button>
                            </div>

                            <div className="video-actions">
                                <button className="action-button" onClick={handleLike}>
                                    👍 Like {video.likes}
                                </button>
                                <button className="action-button" onClick={handleDislike}>
                                    👎 Dislike {video.dislikes}
                                </button>
                                <button className="action-button">🔗 Share</button>
                                <button className="action-button">⬇️ Download</button>
                            </div>
                        </div>

                        <div className="video-description">
                            <h2 className="section-title">Description</h2>
                            <p>{video.description}</p>
                        </div>

                        <div className="video-comments">
                            <h2 className="section-title">Comments</h2>
                            <CommentList videoId={videoId} />
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
    
}

export default VideoPlayer;
