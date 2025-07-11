// // home page..

// import { useEffect, useState } from "react";
// import api from "../../utils/axiosInstance";
// import VideoCard from "../../component/VideoCard/VideoCard";
// function Home() {
//     // maintaining a state for video..
//     const [videos, setVideos] = useState([]);

//     // need to fetch video means api call means work that is outside the scope of our component so ---> use - useeffect.
//     useEffect(function callback() {
//         // creating a async function because downloading / fetching data can be time consuming...
//         async function fetchVideos() {
//             try {
//                 let response = await api.get('/video');
//                 console.log("response comes after /api/videos -> get request ===>  \n", response);
//                 // whatever response comes set it in videos state array.
//                 //! setVideos(response.data); // here axios gives a .data object inside which we get our data and inside that data we have a data property inside which our video data is present as a key name videoData.
//                 setVideos(response.data.data.videoData); // by doing this we will get videos array...
//             } catch (error) {
//                 console.log("error occured in while fetching all videos in home.jsx\n", error);
//             }
//         }
//         // calling this function..
//         fetchVideos();
//     }, []);

//     // now just call the video card component and pass single video to it will display eah vido info ...
//     console.log("videos in state array inside the HOMe .jsx -----> \n", videos);
//     return (
//         <>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4" >
//                 {videos.map(function callback(singleVideo) {
//                     return <VideoCard key={singleVideo._id} videoData={singleVideo} />
//                 })}
//             </div>
//         </>
//     );
// }

// export default Home;

//! --------------- testing above -----------------------

// Home.jsx

// import { useEffect, useState } from "react";
// import api from "../../utils/axiosInstance";
// import VideoCard from "../../component/VideoCard/VideoCard";
// import "./home.css";

// function Home() {
//     const [videos, setVideos] = useState([]);

//     useEffect(function callback() {
//         async function fetchVideos() {
//             try {
//                 let response = await api.get('/video');
//                 console.log("response comes after /api/videos -> get request ===>  \n", response);
//                 setVideos(response.data.data.videoData);
//             } catch (error) {
//                 console.log("error occurred in while fetching all videos in home.jsx\n", error);
//             }
//         }
//         fetchVideos();
//     }, []);

//     console.log("videos in state array inside the HOME.jsx -----> \n", videos);
//     return (
//         <div className="home-container">
//             {videos.map(function callback(singleVideo) {
//                 return <VideoCard key={singleVideo._id} videoData={singleVideo} />;
//             })}
//         </div>
//     );
// }

import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import api from "../../utils/axiosInstance";
import VideoCard from "../../component/VideoCard/VideoCard";
import "./home.css";

function Home() {
    const outletContext = useOutletContext(); // might be undefined
    const isSidebarVisible = outletContext?.isSidebarVisible ?? true; // default to true

    const [videos, setVideos] = useState([]);

    useEffect(function callback() {
        async function fetchVideos() {
            try {
                let response = await api.get('/video');
                // console.log("response comes after /api/videos -> get request ===>  \n", response);
                setVideos(response.data.data.videoData);
            } catch (error) {
                console.log("error occurred in while fetching all videos in home.jsx\n", error);
            }
        }
        fetchVideos();
    }, []);

    // console.log("videos in state array inside the HOME.jsx -----> \n", videos);

    // console.log("home page is moounted but ind production video are not fetched automatically but wait sometimes it comes ");

    return (
        <div className={`home-container ${isSidebarVisible ? 'sidebar-expanded' : 'sidebar-collapsed'}`}>
            {videos.map(function callback(singleVideo) {
                return <VideoCard key={singleVideo._id} videoData={singleVideo} />;
            })}
        </div>
    );
}

export default Home;
