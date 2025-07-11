// // video cart... most probablly it iwll be called from home .jsx

// import { Link } from "react-router-dom";
// import { timeSince } from "../../utils/dateFormat";


// function VideoCard({videoData}){
//     let video = videoData.videoData || videoData;
//     // console.log("Video data in VideoCard:", video);
//     return (
//         <div className="border p-2">
//             <Link to={`/video/${video._id}`}>
//                 <img
//                     src={video.thumbnailUrl}
//                     alt={video.title}
//                     className="w-full h-half object-cover"
//                 />
//                 <h3 className="font-semibold mt-2">{video.title}</h3>
//                 <p className="text-sm">{video.channel.channelName}</p>
//                 <p className="text-sm">{timeSince(video.uploadDate)}</p>
//                 <p className="text-sm text-gray-600">{video.views} views</p>
//             </Link>
//         </div>
//     );
// }

// export default VideoCard;


// /**
//  * when we pass the props from home to video card as videoData={singleVideo} it passed as in the object inside which videoData as property will exist and then in VideoCard either we have to let video=videoData.videoData or else we de-structure it.
//  *     console.log("videoData in video card is ----> ",videoData);
//     let fetchedSingleVideoData = videoData.videoData;
//     console.log("fetchedSingVideoData in video card AFTER is ----> ", fetchedSingleVideoData);
//  */




//! ----------- finial logic sucess--------------
// import { Link } from "react-router-dom";
// import { timeSince } from "../../utils/dateFormat";

// function VideoCard({ videoData }) {
//     let video = videoData.videoData || videoData;

//     return (
//         <div className="border p-2">
//             <Link to={`/video/${video._id}`}>
//                 <img
//                     src={video.thumbnailUrl}
//                     alt={video.title}
//                     className="w-full h-half object-cover"
//                 />
//                 <h3 className="font-semibold mt-2">{video.title}</h3>
//                 <p className="text-sm">{video.channel.channelName}</p>
//                 <p className="text-sm">{timeSince(video.uploadDate)}</p>
//                 <p className="text-sm text-gray-600">{video.views} views</p>
//             </Link>
//         </div>
//     );
// }

// export default VideoCard;


//! --------- applying just custom css that's it ----------

import { Link } from "react-router-dom";
import { timeSince } from "../../utils/dateFormat";
// import { AuthContext } from "../../context/AuthContext";


import "./videoCard.css";
import { formatViews } from "../../utils/viewsFormating";
// import { useContext } from "react";

function VideoCard({ videoData }) {
    let video = videoData;
    // console.log("video is : ",video);
    // const auth = useContext(AuthContext); // no use of it it wil set avatar based on the user which is loged in..
    

    return (
        <div className="video-card">
            <Link to={`/video/${video._id}`} className="video-link">
                <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="video-thumbnail"
                />
                <div className="video-info">
                    <img
                        src={video.channel.owner.avatar}
                        alt="Channel Avatar"
                        className="channel-avatar"
                    />
                    <div className="video-text-content">
                        <h3 className="video-title">{video.title}</h3>
                        <p className="video-channel">{video.channel.channelName}</p>
                        <p className="video-meta">
                        {formatViews(video.views)} views • {timeSince(video.uploadDate)}
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    );
        
}

export default VideoCard;

