import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/axiosInstance";
import "./editVideo.css";

function EditVideo() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        thumbnailUrl: "",
        category: ""
    });

    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [channelId, setChannelId] = useState("");

    useEffect(function () {
        fetchVideoDetails();
    }, [id]);

    function fetchVideoDetails() {
        api.get("/video/" + id)
            .then(function (response) {
                const video = response.data.data.videoData;

                setFormData({
                    title: video.title || "",
                    description: video.description || "",
                    thumbnailUrl: video.thumbnailUrl || "",
                    category: video.category || ""
                });

                setChannelId(video.owner || "");
            })
            .catch(function (error) {
                console.error("Failed to fetch video:", error);
                setMessage("Failed to load video data.");
            })
            .finally(function () {
                setLoading(false);
            });
    }

    function handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        setErrors(function (prevErrors) {
            const updatedErrors = { ...prevErrors };
            delete updatedErrors[name];
            return updatedErrors;
        });

        setFormData(function (prev) {
            return {
                ...prev,
                [name]: value
            };
        });
    }

    function validateForm() {
        const newErrors = {};
        const youtubeUrlPattern = /^https:\/\/(www\.)?youtube\.com\/watch\?v=[\w-]{11}$/;

        if (!formData.title.trim()) {
            newErrors.title = "Title is required.";
        }

        if (formData.thumbnailUrl && !youtubeUrlPattern.test(formData.thumbnailUrl.trim())) {
            newErrors.thumbnailUrl = "Enter a valid YouTube video URL (e.g., https://www.youtube.com/watch?v=abc123xyz)";
        }

        if (!formData.category.trim()) {
            newErrors.category = "Category is required.";
        }

        return newErrors;
    }

    function handleSubmit(event) {
        event.preventDefault();
        setMessage("");
        setErrors({});
        setSubmitting(true);

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setSubmitting(false);
            return;
        }

        // Convert YouTube URL to thumbnail image URL if it's valid
        const youtubeUrlPattern = /^https:\/\/(www\.)?youtube\.com\/watch\?v=([\w-]{11})$/;
        const match = formData.thumbnailUrl.trim().match(youtubeUrlPattern);

        const updatedData = { ...formData };

        if (match) {
            const videoId = match[2];
            updatedData.thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        }

        api.put("/video/" + id, updatedData)
            .then(function () {
                setMessage("Video updated successfully!");
                setTimeout(function () {
                    // navigate(channelId ? "/profile/" + channelId : "/profile");
                    // navigate(`/profile/${channelId}`);
                    if (channelId) {
                        navigate(`/profile/${channelId}`);
                    } else {
                        console.warn("Missing channelId, redirecting to home.");
                        navigate("/");
                    }

                }, 1500);
            })
            .catch(function (error) {
                const backendMessage = error.response?.data?.message || "Something went wrong.";

                if (backendMessage.toLowerCase().includes("title")) {
                    setErrors({ title: backendMessage });
                } else if (backendMessage.toLowerCase().includes("thumbnail")) {
                    setErrors({ thumbnailUrl: backendMessage });
                } else if (backendMessage.toLowerCase().includes("category")) {
                    setErrors({ category: backendMessage });
                } else {
                    setErrors({ general: backendMessage });
                }
            })
            .finally(function () {
                setSubmitting(false);
            });
    }

    if (loading) {
        return <p className="loading">Loading video data...</p>;
    }

    return (
        <div className="edit-video-container">
            <h2 className="edit-video-title">Edit Video</h2>
            <form onSubmit={handleSubmit} className="edit-video-form">

                <label>Title:</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />
                {errors.title && <p className="error-message">{errors.title}</p>}

                <label>Description:</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                />

                <label>YouTube Video URL (for thumbnail):</label>
                <input
                    type="text"
                    name="thumbnailUrl"
                    value={formData.thumbnailUrl}
                    onChange={handleChange}
                />
                {errors.thumbnailUrl && <p className="error-message">{errors.thumbnailUrl}</p>}

                <label>Category:</label>
                <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                />
                {errors.category && <p className="error-message">{errors.category}</p>}

                {errors.general && <p className="error-message">{errors.general}</p>}

                <button type="submit" disabled={submitting}>
                    {submitting ? "Updating..." : "Update Video"}
                </button>

                {message && <p className="success-message">{message}</p>}
            </form>
        </div>
    );
}

export default EditVideo;
