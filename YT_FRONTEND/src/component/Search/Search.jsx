import { useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import VideoCard from "../VideoCard/VideoCard";
import ErrorPage from "../Error/Error";
import "./search.css";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { SidebarContext } from "../../context/SideContext";


function Search() {
    const {toggleSidebar } = useContext(SidebarContext);

    // getting search and category values from URL they will comes as query
    const [searchParams] = useSearchParams();

    // State to store video data, loading and error
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetching all videos whenever search parameter changes ..
    useEffect(function () {
        fetchVideos();
    }, [searchParams]);

    // amin function to fetch videos from backend..
    async function fetchVideos() {
        try {
            const search = searchParams.get("search") || "";
            const category = searchParams.get("category") || "";

            // Creating simple and readable full API URL
            const apiUrl = "/video/search/videos?search=" + search + "&category=" + category;

            // get request on our route /video/search/videos -- query params.
            const response = await axios.get(apiUrl);

            // just filter the videos data ... from the response that we got.
            const videosWithData = response.data.data.videosData.map(function (video) {
                return { videoData: video };
            });

            setVideos(videosWithData);
        } catch (err) {
            const message = err.response?.data?.message || "Error loading videos";
            setError(message);
        } finally {
            setLoading(false);
        }
    }

    // rendering all search video using videocard.
    function renderVideoCard(video) {
        return (
            <VideoCard
                key={video.videoData._id}
                videoData={video.videoData}
            />
        );
    }

    // Showing loading message
    if (loading) {
        return <p>Loading...</p>;
    }

    // Showing error page if something went wrong ---- style it later..
    if (error) {
        return (
            <ErrorPage
                title="Error"
                message={error}
                image=""
            />
        );
    }

    // Showing error page  when no results of search videos found
    if (videos.length === 0) {
        return (
            <ErrorPage
                title="No Videos Found"
                message="Try a different keyword or category."
                image=""
            />
        );
    }

    // Showing videos result..
    return (
        <>
            <Header/>
            <Sidebar toggleSidebar={toggleSidebar} />
            <h2 className="search-title">Search Results</h2>
            <div className="search-container">
                <div className="video-grid">
                    {videos.map(renderVideoCard)}
                </div>
            </div>
        </>
    );
}

export default Search;
