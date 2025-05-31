// import { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../../utils/axiosInstance';
// import { AuthContext } from '../../context/AuthContext';
// import './uploadFromYt.css';

// function UploadFromYouTube() {
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [videoUrl, setVideoUrl] = useState('');
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');

//     const { user,accessToken } = useContext(AuthContext);
//     console.log("user in upload from yt is : ",user);
//     const navigate = useNavigate();

//     async function handleSubmit(event) {
//         event.preventDefault();
//         setError('');
//         setSuccess('');

//         if (!title || !description || !videoUrl) {
//             setError('All fields are required.');
//             return;
//         }
//         console.log("title is : ",title);
//         console.log("description  is : ",description);
//         console.log("video url  is : ", videoUrl);
//         console.log("user.channel is : ",user.channel);
//         console.log("access token in upload yt is : ",accessToken);

//         try {
//             const res = await api.post('/video', {
//                 title,
//                 description,
//                 videoUrl,
//                 channel: user?.channel,
//             });
//             console.log("response after api call in yt choice is : ",res);

//             setSuccess('YouTube video submitted successfully.');
//             setTimeout(() => navigate('/'), 1500);
//         } catch (err) {
//             console.error(err);
//             setError('Upload failed.');
//         }
//     }

//     return (
//         <form className="upload-form" onSubmit={handleSubmit}>
//             <label>Title</label>
//             <input type="text" value={title} onChange={e => setTitle(e.target.value)} />

//             <label>Description</label>
//             <textarea value={description} onChange={e => setDescription(e.target.value)} />

//             <label>YouTube URL</label>
//             <input type="text" value={videoUrl} onChange={e => setVideoUrl(e.target.value)} />

//             {error && <p className="error-msg">{error}</p>}
//             {success && <p className="success-msg">{success}</p>}

//             <button type="submit">Submit YouTube Video</button>
//         </form>
//     );
// }

// export default UploadFromYouTube;


//! ---- just minor fixess ----  (no functionality change) --- testing new ui cvhanes


import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/axiosInstance';
import { AuthContext } from '../../context/AuthContext';
import './uploadFromYt.css';

const UploadFromYouTube = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const { user, accessToken } = useContext(AuthContext);
    console.log("user and access token is : ",user, accessToken);
    const navigate = useNavigate();

    const handleTitleChange = function (event) {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = function (event) {
        setDescription(event.target.value);
    };

    const handleVideoUrlChange = function (event) {
        setVideoUrl(event.target.value);
    };

    const handleSubmit = async function (event) {
        event.preventDefault();
        setError('');
        setSuccess('');

        if (!title || !description || !videoUrl) {
            setError('All fields are required.');
            return;
        }

        try {
            const response = await api.post('/video', {
                title: title,
                description: description,
                videoUrl: videoUrl,
                channel: user?.channel
            });

            console.log('response after API call:', response);

            setSuccess('YouTube video submitted successfully.');
            setTimeout(function () {
                navigate('/');
            }, 1500);
        } catch (err) {
            console.error(err);
            setError('Upload failed.');
        }
    };

    return (
        <form className="upload-form" onSubmit={handleSubmit}>
            <label>Title</label>
            <input type="text" value={title} onChange={handleTitleChange} />

            <label>Description</label>
            <textarea value={description} onChange={handleDescriptionChange} />

            <label>YouTube URL</label>
            <input type="text" value={videoUrl} onChange={handleVideoUrlChange} placeholder='url : https://www.youtube.com/watch?v=Qg9LxRHLbAk' />

            {error && <p className="error-msg">{error}</p>}
            {success && <p className="success-msg">{success}</p>}

            <button type="submit">Submit YouTube Video</button>
        </form>
    );
};

export default UploadFromYouTube;

