// import { useEffect, useState, useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../../utils/axiosInstance";
// import { AuthContext } from "../../context/AuthContext";
// import "./profile.css";

// function Profile() {
//     const { channelId } = useParams();
//     console.log("channel id that we collect on profle is : ",channelId);
//     const navigate = useNavigate();
//     const { user } = useContext(AuthContext);

//     const [videos, setVideos] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [channelInfo, setChannelInfo] = useState(null); 

//     useEffect(function () {
//         fetchChannelInfo();
//         fetchChannelVideos();
//     },[channelId]);

//     async function fetchChannelInfo() {
//         try {
//             const response = await api.get(`/channel/${channelId}`);
//             console.log("repsonse of channel info is : ",response);
//             setChannelInfo(response.data.data.singleChannelData);
//         } catch (error) {
//             console.error("Error fetching channel info:", error);
//         }
//     }

//     async function fetchChannelVideos() {
//         try {
//             setLoading(true);
//             const response = await api.get("/video/channel/" + channelId);
//             const allVideos = response.data.data.allVideosDataOfChannel;
//             setVideos(allVideos);
//         } catch (error) {
//             console.error("Error fetching channel videos:", error);
//         } finally {
//             setLoading(false);
//         }
//     }

//     function handlePlay(event) {
//         const videoId = event.currentTarget.getAttribute("data-id");
//         navigate("/video/" + videoId);
//     }

//     function handleEdit(event) {
//         event.stopPropagation();
//         const videoId = event.currentTarget.getAttribute("data-id");
//         navigate("/editVideo/" + videoId);
//     }

//     async function handleDelete(event) {
//         event.stopPropagation();
//         const videoId = event.currentTarget.getAttribute("data-id");

//         const confirmDelete = window.confirm("Are you sure you want to delete this video?");
//         if (!confirmDelete) return;

//         try {
//             await api.delete("/video/" + videoId);
//             await fetchChannelVideos(); // Refresh list
//         } catch (error) {
//             console.error("Error deleting video:", error);
//         }
//     }

//     function renderVideo(video) {
//         return (
//             <div key={video._id} className="video-card">
//                 <div
//                     className="video-content"
//                     style={{ cursor: "pointer" }}
//                     data-id={video._id}
//                     onClick={handlePlay}
//                 >
//                     <img
//                         src={video.thumbnailUrl}
//                         alt={video.title}
//                         width="100%"
//                         height="250"
//                         style={{ objectFit: "cover" }}
//                     />
//                     <h4>{video.title}</h4>
//                     <p>{video.description}</p>
//                 </div>

//                 {user && user._id === channelId && (
//                     <div className="video-actions">
//                         <button data-id={video._id} onClick={handleEdit}>✏️ Edit</button>
//                         <button data-id={video._id} onClick={handleDelete}>🗑️ Delete</button>
//                     </div>
//                 )}
//             </div>
//         );
//     }

//     return (
//         <div className="channel-page">
//             {channelInfo && (
//                 <div className="channel-header">
//                     <img
//                         src={channelInfo.owner.avatar || "/default-avatar.png"}
//                         alt={channelInfo.owner.username}
//                         className="channel-avatar"
//                     />
//                     <h2>hiii {channelInfo.owner.userName}'s Channel</h2>
//                 </div>
//             )}

//             {loading ? (
//                 <p>Loading videos...</p>
//             ) : videos.length === 0 ? (
//                 <p>No videos found for this channel.</p>
//             ) : (
//                 <div className="video-grid">
//                     {videos.map(function (video) {
//                         return renderVideo(video);
//                     })}
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Profile;



// import { useEffect, useState, useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../../utils/axiosInstance";
// import { AuthContext } from "../../context/AuthContext";
// import "./profile.css";
// import { MdEdit, MdDelete } from "react-icons/md";


// function Profile() {
//     const { channelId } = useParams();
//     console.log("channel id that we collect on profle is : ", channelId);
//     const navigate = useNavigate();
//     const { user } = useContext(AuthContext);

//     const [videos, setVideos] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [channelInfo, setChannelInfo] = useState(null);

//     useEffect(function () {
//         fetchChannelInfo();
//         fetchChannelVideos();
//     }, [channelId]);

//     let response = null;
//     async function fetchChannelInfo() {
//         try {
//             response = await api.get(`/channel/${channelId}`);
//             console.log("repsonse of channel info is : ", response);
//             setChannelInfo(response.data.data.singleChannelData);
//         } catch (error) {
//             console.error("Error fetching channel info:", error);
//         }
//     }

//     async function fetchChannelVideos() {
//         try {
//             setLoading(true);
//             const response = await api.get("/video/channel/" + channelId);
//             const allVideos = response.data.data.allVideosDataOfChannel;
//             setVideos(allVideos);
//         } catch (error) {
//             console.error("Error fetching channel videos:", error);
//         } finally {
//             setLoading(false);
//         }
//     }

//     function handlePlay(event) {
//         const videoId = event.currentTarget.getAttribute("data-id");
//         navigate("/video/" + videoId);
//     }

//     function handleEdit(event) {
//         event.stopPropagation();
//         const videoId = event.currentTarget.getAttribute("data-id");
//         navigate("/editVideo/" + videoId);
//     }

//     async function handleDelete(event) {
//         event.stopPropagation();
//         const videoId = event.currentTarget.getAttribute("data-id");

//         const confirmDelete = window.confirm("Are you sure you want to delete this video?");
//         if (!confirmDelete) return;

//         try {
//             await api.delete("/video/" + videoId);
//             await fetchChannelVideos();
//         } catch (error) {
//             console.error("Error deleting video:", error);
//         }
//     }

//     console.log("user in profile is : ",user);
//     // console.log("user._id is : ",user._id);
//     // console.log("channel id is : ",channelId);
//     // console.log("channelinfo : ",channelInfo);
//     // console.log("channelinfo : ", channelInfo.owner._id);


//     // console.log("response.data.data.singlechaneldata is : ", response.data.data.singleChannelData);
//     console.log("channel info is : ",channelInfo);

//     function renderVideo(video) {
//         return (
//             <div key={video._id} className="video-card">
//                 <div
//                     className="video-content"
//                     style={{ cursor: "pointer" }}
//                     data-id={video._id}
//                     onClick={handlePlay}
//                 >
//                     <img
//                         src={video.thumbnailUrl}
//                         alt={video.title}
//                         width="100%"
//                         height="250"
//                         style={{ objectFit: "cover" }}
//                     />
//                     <h4>{video.title}</h4>
//                     <p>{video.description}</p>
//                 </div>

//                 {channelInfo && channelInfo.owner && user?._id === channelInfo.owner._id &&(
//                     <div className="video-actions">
//                         <button data-id={video._id} onClick={handleEdit}>
//                             {/* ✏️ Edit */}
//                             {/* <MdEdit size={18} /> Edit */}
//                             <span className="icon-text">
//                                 <MdEdit size={18} style={{ marginRight: "6px" }} />
//                                 Edit
//                             </span>
//                         </button>
//                         <button data-id={video._id} onClick={handleDelete}>
//                             {/* 🗑️ Delete */}
//                             {/* <MdDelete size={20} color="#e74c3c" /> Delete */}
//                             <span className="icon-text">
//                                 <MdDelete size={20} color="#e74c3c" style={{ marginRight: "6px" }} />
//                                 Delete
//                             </span>
//                         </button>
//                     </div>
//                 )}
//             </div>
//         );
//     }

//     return (
//         <div className="channel-page">
//             <>
//                 <img
//                     src={channelInfo.channelBanner || "/default-avatar.png"}
//                     alt={channelInfo.owner.userName}
//                     className="channel-avatar"
//                 />
//             {channelInfo && (
//                 <div className="channel-header">
//                     <img
//                         src={channelInfo.owner.avatar || "/default-avatar.png"}
//                         alt={channelInfo.owner.userName}
//                         className="channel-avatar"
//                     />
//                     <div className="channel-meta">
//                         <h2 className="channel-name">{channelInfo.channelName}</h2>
//                         <p className="channel-desc">{channelInfo.description}</p>
//                         <p className="channel-owner">@{channelInfo.owner.userName}</p>
//                     </div>
//                 </div>
//             )}

//             {loading ? (
//                 <p>Loading videos...</p>
//             ) : videos.length === 0 ? (
//                 <p>No videos found for this channel.</p>
//             ) : (
//                 <div className="video-grid">
//                     {videos.map(function (video) {
//                         return renderVideo(video);
//                     })}
//                 </div>
//             )}
//             </>
//         </div>

//     );
// }

// export default Profile;

// import { useEffect, useState, useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../../utils/axiosInstance";
// import { AuthContext } from "../../context/AuthContext";
// // import Sidebar from "../../component/Sidebar/Sidebar";
// import { MdEdit, MdDelete } from "react-icons/md";
// import ProfileHedader from "./ProfileHeader";
// import "./profile.css";
// import ErrorPage from "../../component/Error/Error";
// import ProfileSidebar from "./ProfileSidebar";
// // import "../../component/Sidebar/Sidebar.css";

// function Profile({isSidebarVisible=true}) {
//     const { channelId } = useParams();
//     const navigate = useNavigate();
//     const { user } = useContext(AuthContext);

//     const [videos, setVideos] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [channelInfo, setChannelInfo] = useState(null);
//     const [error, setError] = useState(false);

//     useEffect(function () {
//         fetchChannelInfo();
//         fetchChannelVideos();
//     }, [channelId]);

//     async function fetchChannelInfo() {
//         try {
//             const response = await api.get("/channel/" + channelId);
//             setChannelInfo(response.data.data.singleChannelData);
//             setError(false);
//         } catch (error) {
//             console.error("Error fetching channel info:", error);
//             setError(true);
//         }
//     }

//     async function fetchChannelVideos() {
//         try {
//             setLoading(true);
//             const response = await api.get("/video/channel/" + channelId);
//             setVideos(response.data.data.allVideosDataOfChannel);
//         } catch (error) {
//             console.error("Error fetching channel videos:", error);
//         } finally {
//             setLoading(false);
//         }
//     }

//     function handlePlay(event) {
//         const videoId = event.currentTarget.getAttribute("data-id");
//         navigate("/video/" + videoId);
//     }

//     function handleEdit(event) {
//         event.stopPropagation();
//         const videoId = event.currentTarget.getAttribute("data-id");
//         navigate("/editVideo/" + videoId);
//     }

//     async function handleDelete(event) {
//         event.stopPropagation();
//         const videoId = event.currentTarget.getAttribute("data-id");

//         const confirmDelete = window.confirm("Are you sure you want to delete this video?");
//         if (!confirmDelete) return;

//         try {
//             await api.delete("/video/" + videoId);
//             await fetchChannelVideos();
//         } catch (error) {
//             console.error("Error deleting video:", error);
//         }
//     }

//     function renderVideo(video) {
//         return (
//             <div key={video._id} className="video-card">
//                 <div
//                     className="video-content"
//                     data-id={video._id}
//                     onClick={handlePlay}
//                 >
//                     <img src={video.thumbnailUrl} alt={video.title} />
//                     <h4>{video.title}</h4>
//                     <p>{video.description}</p>
//                 </div>

//                 {channelInfo?.owner?._id === user?._id && (
//                     <div className="video-actions">
//                         <button data-id={video._id} onClick={handleEdit}>
//                             <MdEdit size={18} /> Edit
//                         </button>
//                         <button data-id={video._id} onClick={handleDelete}>
//                             <MdDelete size={20} color="#e74c3c" /> Delete
//                         </button>
//                     </div>
//                 )}
//             </div>
//         );
//     }

//     // Show error if channel not found
//     if (error) {
//         return (
//             <div className="profile-layout">
//                 <ProfileHedader />
//                 {/* <Sidebar /> */}
//                 <div className="profile-content">
//                     <div className="channel-error">
//                         <h2>Channel Not Found</h2>
//                         <p>The channel you're looking for does not exist or has been removed.Please create a new one ..</p>
//                         <p>Thank you ...</p>
//                         <button onClick={() => navigate(-1)}>Go Back</button>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <>
//             <ProfileHedader />

//             <div className="profile-layout">
//                 {/* <ProfileSidebar isSidebarVisible={isSidebarVisible} /> */}

//                 <div className="profile-content">
//                     {channelInfo && (
//                         <>
//                             <div className="channel-banner">
//                                 <img src={channelInfo.channelBanner || "/src/assets/confetti.png"} alt="Channel Banner" />
//                             </div>

//                             <div className="channel-header">
//                                 <img
//                                     src={channelInfo.owner.avatar || "/default-avatar.png"}
//                                     alt={channelInfo.owner.userName}
//                                     className="channel-avatar-profile"
//                                 />
//                                 <div className="channel-meta">
//                                     <h2>{channelInfo.channelName}</h2>
//                                     <p className="channel-username">@{channelInfo.owner.userName}</p>
//                                     <p className="channel-desc">{channelInfo.description}</p>
//                                 </div>
//                             </div>
//                         </>
//                     )}

//                     {loading ? (
//                         <p>Loading videos...</p>
//                     ) : videos.length === 0 ? (
//                         // <p className="no-video-error">No videos found for this channel.</p>
//                         <ErrorPage title="No videos found for this channel" message="Please add the video first" />
//                     ) : (
//                         <div className="video-grid">
//                             {videos.map(renderVideo)}
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </>
//     );
// }

// export default Profile;










import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/axiosInstance";
import { AuthContext } from "../../context/AuthContext";
import { MdEdit, MdDelete } from "react-icons/md";
import ProfileHedader from "./ProfileHeader";
import "./profile.css";
import ErrorPage from "../../component/Error/Error";
import ProfileSidebar from "./ProfileSidebar";
import { SidebarContext } from "../../context/SideContext";

function Profile() {
        const {toggleSidebar } = useContext(SidebarContext);
    const { channelId } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [channelInfo, setChannelInfo] = useState(null);
    const [error, setError] = useState(false);

    useEffect(function () {
        fetchChannelInfo();
        fetchChannelVideos();
    }, [channelId]);

    async function fetchChannelInfo() {
        try {
            const response = await api.get("/channel/" + channelId);
            setChannelInfo(response.data.data.singleChannelData);
            setError(false);
        } catch (error) {
            console.error("Error fetching channel info:", error);
            setError(true);
        }
    }

    async function fetchChannelVideos() {
        try {
            setLoading(true);
            const response = await api.get("/video/channel/" + channelId);
            setVideos(response.data.data.allVideosDataOfChannel);
        } catch (error) {
            console.error("Error fetching channel videos:", error);
        } finally {
            setLoading(false);
        }
    }

    function handlePlay(event) {
        const videoId = event.currentTarget.getAttribute("data-id");
        navigate("/video/" + videoId);
    }

    function handleEdit(event) {
        event.stopPropagation();
        const videoId = event.currentTarget.getAttribute("data-id");
        navigate("/editVideo/" + videoId);
    }

    async function handleDelete(event) {
        event.stopPropagation();
        const videoId = event.currentTarget.getAttribute("data-id");

        const confirmDelete = window.confirm("Are you sure you want to delete this video?");
        if (!confirmDelete) return;

        try {
            await api.delete("/video/" + videoId);
            await fetchChannelVideos();
        } catch (error) {
            console.error("Error deleting video:", error);
        }
    }

    function renderVideo(video) {
        return (
            <div key={video._id} className="video-card">
                <div className="video-content" data-id={video._id} onClick={handlePlay}>
                    <img src={video.thumbnailUrl} alt={video.title} />
                    <h4>{video.title}</h4>
                    <p>{video.description}</p>
                </div>

                {channelInfo?.owner?._id === user?._id && (
                    <div className="video-actions">
                        <button data-id={video._id} onClick={handleEdit}>
                            <MdEdit size={18} /> Edit
                        </button>
                        <button data-id={video._id} onClick={handleDelete}>
                            <MdDelete size={20} color="#e74c3c" /> Delete
                        </button>
                    </div>
                )}
            </div>
        );
    }

    // if (error) {
    //     return (
    //         <>
    //             <ProfileHedader />
    //             <div className="profile-layout">
    //                 <ProfileSidebar toggleSidebar={toggleSidebar}/>
    //                 <div className="profile-content">
    //                     <div className="channel-error">
    //                         <h2>Channel Not Found</h2>
    //                         <p>The channel you're looking for does not exist or has been removed. Please create a new one.</p>
    //                         <button onClick={() => navigate(-1)}>Go Back</button>
    //                     </div>
    //                 </div>
    //             </div>
    //         </>
    //     );
    // }
    if (error) {
        return (
            <>
                <ProfileHedader />
                <div className="flex flex-col md:flex-row min-h-screen bg-[#0f0f0f] text-white">
                    <ProfileSidebar toggleSidebar={toggleSidebar} />
                    <div className="flex-1 p-4 sm:p-6 flex items-center justify-center">
                        <div className="bg-[#1f1f1f] p-6 sm:p-8 rounded-xl shadow-lg text-center w-full max-w-sm sm:max-w-md">
                            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
                                Channel Not Found
                            </h2>
                            <p className="text-gray-400 text-sm sm:text-base mb-5 sm:mb-6">
                                The channel you're looking for does not exist or has been removed.
                                Please create a new one.
                            </p>
                            <button
                                onClick={() => navigate(-1)}
                                className="px-4 sm:px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition duration-200"
                            >
                                Go Back
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    
    

    return (
        <>
            <ProfileHedader />
            <ProfileSidebar toggleSidebar={toggleSidebar} />

            <div className="profile-layout">
                <div className="profile-content">
                    {channelInfo && (
                        <>
                            <div className="channel-banner">
                                <img src={channelInfo.channelBanner || "/assets/confetti.png"} alt="Channel Banner" />
                            </div>

                            <div className="channel-header">
                                <img
                                    src={channelInfo.owner.avatar || "/default-avatar.png"}
                                    alt={channelInfo.owner.userName}
                                    className="channel-avatar-profile"
                                />
                                <div className="channel-meta">
                                    <h2>{channelInfo.channelName}</h2>
                                    <p className="channel-username">@{channelInfo.owner.userName}</p>
                                    <p className="channel-desc">{channelInfo.description}</p>
                                </div>
                            </div>
                        </>
                    )}

                    {loading ? (
                        <p>Loading videos...</p>
                    ) : videos.length === 0 ? (
                        <ErrorPage title="No videos found for this channel" message="Please add the video first" isTrue={true} />
                    ) : (
                        <div className="video-grid">
                            {videos.map(renderVideo)}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Profile;
