// import { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../../utils/axiosInstance'; // axios instance
// import { AuthContext } from '../../context/AuthContext';
// import './upload.css'; // Custom CSS

// function UploadVideo() {
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [thumbnail, setThumbnail] = useState(null);
//     const [videoFile, setVideoFile] = useState(null);
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');

//     const { user } = useContext(AuthContext);
//     console.log("user from the useContext is : ",user);
//     const navigate = useNavigate();

//     function handleTitleChange(event) {
//         setTitle(event.target.value);
//     }

//     function handleDescriptionChange(event) {
//         setDescription(event.target.value);
//     }

//     function handleThumbnailChange(event) {
//         setThumbnail(event.target.files[0]);
//     }

//     function handleVideoChange(event) {
//         setVideoFile(event.target.files[0]);
//     }

//     async function handleFormSubmit(event) {
//         event.preventDefault();
//         setError('');
//         setSuccess('');

//         if (!title || !description || !thumbnail || !videoFile) {
//             setError('Please fill in all fields and upload files.');
//             return;
//         }

//         const formData = new FormData();
//         formData.append('title', title);
//         formData.append('description', description);
//         formData.append('thumbnail', thumbnail);
//         formData.append('videoFile', videoFile);

//         try {
//             const response = await api.post('/', formData);
//             console.log("response got from the backend after making upload request is : ",response);
//             console.log("response got from the backend after making upload request and reponse.data.data is  : ", response.data.data);

//             setSuccess('Video uploaded successfully!');
//             setTitle('');
//             setDescription('');
//             setThumbnail(null);
//             setVideoFile(null);

//             // Optional: navigate to home or another page
//             setTimeout(function () {
//                 navigate('/');
//             }, 2000);

//         } catch (error) {
//             console.error('Upload failed:', error);
//             setError('Video upload failed. Please try again.');
//         }
//     }

//     return (
//         <div className="upload-container">
//             <h2>Upload Video</h2>

//             {error && <p className="error-msg">{error}</p>}
//             {success && <p className="success-msg">{success}</p>}

//             <form className="upload-form" onSubmit={handleFormSubmit}>
//                 <label>Title</label>
//                 <input
//                     type="text"
//                     value={title}
//                     onChange={handleTitleChange}
//                     placeholder="Enter video title"
//                 />

//                 <label>Description</label>
//                 <textarea
//                     value={description}
//                     onChange={handleDescriptionChange}
//                     placeholder="Enter video description"
//                 />

//                 <label>Thumbnail (Image)</label>
//                 <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleThumbnailChange}
//                 />

//                 <label>Video File (MP4)</label>
//                 <input
//                     type="file"
//                     accept="video/*"
//                     onChange={handleVideoChange}
//                 />

//                 <button type="submit">Upload Video</button>
//             </form>
//         </div>
//     );
// }

// export default UploadVideo;


import { useState } from 'react';

import './upload.css';
import UploadFromFile from './UploadFromFile';
import UploadFromYouTube from './UploadFromYouTube';

function UploadVideo() {
    const [mode, setMode] = useState('file'); // 'file' or 'youtube'

    function handleModeChange(event) {
        setMode(event.target.value);
    }

    return (
        <div className="upload-container">
            <h2>Upload Video</h2>

            <div className="upload-toggle">
                <label>
                    <input
                        type="radio"
                        value="file"
                        checked={mode === 'file'}
                        onChange={handleModeChange}
                    />
                    Upload from Device
                </label>
                <label>
                    <input
                        type="radio"
                        value="youtube"
                        checked={mode === 'youtube'}
                        onChange={handleModeChange}
                    />
                    Upload from YouTube URL
                </label>
            </div>

            {mode === 'file' ? <UploadFromFile /> : <UploadFromYouTube />}
        </div>
    );
}

export default UploadVideo;

