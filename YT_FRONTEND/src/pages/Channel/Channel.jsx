// // src/pages/CreateChannel/CreateChannel.jsx

// import { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "../../utils/axiosInstance.js"; // your axios base instance
// import { AuthContext } from "../../context/AuthContext";
// import "./channel.css";

// function CreateChannel() {
//     const [channelName, setChannelName] = useState("");
//     const [description, setDescription] = useState("");
//     const [error, setError] = useState("");
//     const [success, setSuccess] = useState("");
//     const navigate = useNavigate();
//     const { user ,login} = useContext(AuthContext);
//     const accessToken=user.token;
//     console.log("Access Token after destructuring ....... :", accessToken);
//     console.log("user in createChannel component from auth context is : ",user);
//     console.log("user access token insdie the usr in create channel is : ",user.token);

//     function handleChannelNameChange(e) {
//         setChannelName(e.target.value);
//     }

//     function handleDescriptionChange(e) {
//         setDescription(e.target.value);
//     }

//     async function handleSubmit(e) {
//         e.preventDefault();
//         setError("");
//         setSuccess("");

//         if (!channelName.trim()) {
//             setError("Channel name is required.");
//             return;
//         }
//         console.log("starting call on /channel----------------------------");

//         try {
//             const response = await axios.post("/channel", {
//                 channelName: channelName,
//                 description: description
//             });
//             console.log("reponse after api call on /channel",response);

//             // const updatedUser = response.data.data.updatedUserData;
//             // console.log("updated user after creating channel is : ",updatedUser);
//             //! bug here is we are not assinging the token which is saved in user hwen user is logged in we are just updating user with channel .
//             // updatedUser.token = accessToken; // not worked 
//             const updatedUser = {
//                 ...response.data.data.updatedUserData,
//                 token: user.token // preserve original token
//             };
//             console.log("updated user is in yt is : ",updatedUser);
//             console.log("access token now in updated user is : -------------------------------------> ",updatedUser.token);
//             login(updatedUser); // Updated AuthContext + localStorage
    

//             setSuccess("Channel created successfully!");
//             setTimeout(function () {
//                 navigate("/"); // Or redirect to /profile or /uploadVideo
//             }, 1000);
//         } catch (err) {
//             console.error("Error creating channel:", err);
//             if (err.response && err.response.data) {
//                 setError(err.response.data.message || "Failed to create channel");
//             } else {
//                 setError("Network error");
//             }
//         }
//     }


//     return (
//         <div className="create-channel-wrapper">
//             <h2 className="create-channel-heading">Create Your Channel</h2>
//             <form onSubmit={handleSubmit} className="create-channel-form">
//                 <label className="label-container">
//                     <span className="label-text">
//                         Channel Name <span className="required-star">*</span>
//                     </span>
//                     <input
//                         type="text"
//                         value={channelName}
//                         onChange={handleChannelNameChange}
//                         required
//                     />
//                 </label>

//                 <label>
//                     Description
//                     <textarea
//                         value={description}
//                         onChange={handleDescriptionChange}
//                         rows="4"
//                     />
//                 </label>

//                 {error && <p className="error-msg">{error}</p>}
//                 {success && <p className="success-msg">{success}</p>}

//                 <button type="submit">Create Channel</button>
//             </form>
//         </div>
//     );
    
// }

// export default CreateChannel;



//!---- finial tested jsx -----------


// src/pages/CreateChannel/CreateChannel.jsx

// import { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "../../utils/axiosInstance.js";
// import { AuthContext } from "../../context/AuthContext";
// import "./channel.css";

// function CreateChannel() {
//     const [channelName, setChannelName] = useState("");
//     const [description, setDescription] = useState("");
//     const [error, setError] = useState("");
//     const [success, setSuccess] = useState("");
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();
//     const { user, login } = useContext(AuthContext);

//     function handleChannelNameChange(e) {
//         setChannelName(e.target.value);
//     }

//     function handleDescriptionChange(e) {
//         setDescription(e.target.value);
//     }

//     async function handleSubmit(e) {
//         e.preventDefault();
//         setError("");
//         setSuccess("");
//         setLoading(true);

//         if (!channelName.trim()) {
//             setError("Channel name is required.");
//             setLoading(false);
//             return;
//         }

//         try {
//             const response = await axios.post("/channel", {
//                 channelName: channelName,
//                 description: description,
//             });

//             const updatedUser = {
//                 ...response.data.data.updatedUserData,
//                 token: user.token,
//             };

//             login(updatedUser);
//             setSuccess("Channel created successfully!");

//             setTimeout(function () {
//                 setLoading(false);
//                 navigate("/");
//             }, 1000);
//         } catch (err) {
//             console.error("Error creating channel:", err);
//             if (err.response && err.response.data) {
//                 setError(err.response.data.message || "Failed to create channel");
//             } else {
//                 setError("Network error");
//             }
//             setLoading(false);
//         }
//     }

//     return (
//         <div className="create-channel-wrapper">
//             <h2 className="create-channel-heading">Create Your Channel</h2>
//             <form onSubmit={handleSubmit} className="create-channel-form">
//                 <label className="label-container">
//                     <span className="label-text">
//                         Channel Name <span className="required-star">*</span>
//                     </span>
//                     <input
//                         type="text"
//                         value={channelName}
//                         onChange={handleChannelNameChange}
//                         required
//                     />
//                 </label>

//                 <label>
//                     Description
//                     <textarea
//                         value={description}
//                         onChange={handleDescriptionChange}
//                         rows="4"
//                     />
//                 </label>

//                 {error && <p className="error-msg">{error}</p>}
//                 {success && <p className="success-msg">{success}</p>}

//                 <button type="submit" disabled={loading}>
//                     {loading ? (
//                         <>
//                             <span className="loading-spinner"></span>
//                             Creating Channel...
//                         </>
//                     ) : (
//                         "Create Channel"
//                     )}
//                 </button>
//             </form>
//         </div>
//     );
// }

// export default CreateChannel;



// !----- working jsx logic ----


// return (
//     <div className="create-channel-wrapper">
//         <h2>Create Your Channel</h2>
//         <form onSubmit={handleSubmit} className="create-channel-form">
//             <label>
//                 Channel Name <span style={{ color: "red" }}>*</span>
//                 <input
//                     type="text"
//                     value={channelName}
//                     onChange={handleChannelNameChange}
//                     required
//                 />
//             </label>

//             <label>
//                 Description
//                 <textarea
//                     value={description}
//                     onChange={handleDescriptionChange}
//                     rows="4"
//                 />
//             </label>

//             {error && <p className="error-msg">{error}</p>}
//             {success && <p className="success-msg">{success}</p>}

//             <button type="submit">Create Channel</button>
//         </form>
//     </div>
// );



import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axiosInstance.js";
import { AuthContext } from "../../context/AuthContext";
import "./channel.css";

function CreateChannel() {
    const [channelName, setChannelName] = useState("");
    const [description, setDescription] = useState("");
    const [bannerFile, setBannerFile] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { user, login } = useContext(AuthContext);

    function handleChannelNameChange(e) {
        setChannelName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleBannerFileChange(e) {
        setBannerFile(e.target.files[0]);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        if (!channelName.trim()) {
            setError("Channel name is required.");
            setLoading(false);
            return;
        }

        try {
            const formData = new FormData();
            formData.append("channelName", channelName);
            formData.append("description", description);
            if (bannerFile) {
                formData.append("banner", bannerFile);
            }

            const response = await axios.post("/channel", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            const updatedUser = {
                ...response.data.data.updatedUserData,
                token: user.token,
            };

            login(updatedUser);
            setSuccess("Channel created successfully!");

            setTimeout(() => {
                setLoading(false);
                navigate("/");
            }, 1000);
        } catch (err) {
            console.error("Error creating channel:", err);
            if (err.response && err.response.data) {
                setError(err.response.data.message || "Failed to create channel");
            } else {
                setError("Network error");
            }
            setLoading(false);
        }
    }

    return (
        <div className="create-channel-wrapper">
            <h2 className="create-channel-heading">Create Your Channel</h2>
            <form onSubmit={handleSubmit} className="create-channel-form" encType="multipart/form-data">
                <label className="label-container">
                    <span className="label-text">
                        Channel Name <span className="required-star">*</span>
                    </span>
                    <input
                        type="text"
                        value={channelName}
                        onChange={handleChannelNameChange}
                        required
                    />
                </label>

                <label className="label-container">
                    <span className="label-text">Description</span>
                    <textarea
                        value={description}
                        onChange={handleDescriptionChange}
                        rows="4"
                    />
                </label>

                <label className="label-container">
                    <span className="label-text">Channel Banner (optional)</span>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleBannerFileChange}
                    />
                </label>

                {error && <p className="error-msg">{error}</p>}
                {success && <p className="success-msg">{success}</p>}

                <button type="submit" disabled={loading}>
                    {loading ? (
                        <>
                            <span className="loading-spinner"></span>
                            Creating Channel...
                        </>
                    ) : (
                        "Create Channel"
                    )}
                </button>
            </form>
        </div>
    );
}

export default CreateChannel;
