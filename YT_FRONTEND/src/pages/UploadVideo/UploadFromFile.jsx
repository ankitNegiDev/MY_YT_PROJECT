// import { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../../utils/axiosInstance';
// import { AuthContext } from '../../context/AuthContext';

// import './uploadFromFile.css';

// function UploadFromFile() {
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [thumbnail, setThumbnail] = useState(null);
//     const [videoFile, setVideoFile] = useState(null);
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');

//     const { user } = useContext(AuthContext);
//     console.log("user is fro mcontes is : ",user);
//     const navigate = useNavigate();

//     async function handleSubmit(event) {
//         event.preventDefault();
//         setError('');
//         setSuccess('');

//         if (!title || !description || !thumbnail || !videoFile) {
//             setError('All fields are required.');
//             return;
//         }

//         const formData = new FormData();
//         formData.append('title', title);
//         formData.append('description', description);
//         formData.append('thumbnail', thumbnail);
//         formData.append('videoFile', videoFile);
//         formData.append('channel', user?.channel); // assuming channel is here
//         console.log("user channel is : ",user.channel);
//         console.log("user channel is id is : ===============> : ", user.channel);

//         console.log("form data in file is : ",formData);
//         for(let [keys,value] of formData.entries()){
//             console.log(keys , value);
//         }
//         try {
//             const res = await api.post('/video', formData);
//             console.log("response in file upload is : ",res);
//             setSuccess('Video uploaded successfully.');
//             setTimeout(() => navigate('/'), 1500);
//         } catch (err) {
//             console.log(err);
//             setError('Upload failed.');
//         }
//     }

//     return (
//         <form className="upload-form" onSubmit={handleSubmit}>
//             <label>Title</label>
//             <input type="text" value={title} onChange={e => setTitle(e.target.value)} />

//             <label>Description</label>
//             <textarea value={description} onChange={e => setDescription(e.target.value)} />

//             <label>Thumbnail</label>
//             <input type="file" accept="image/*" onChange={e => setThumbnail(e.target.files[0])} />

//             <label>Video File</label>
//             <input type="file" accept="video/*" onChange={e => setVideoFile(e.target.files[0])} />

//             {error && <p className="error-msg">{error}</p>}
//             {success && <p className="success-msg">{success}</p>}

//             <button type="submit">Upload</button>
//         </form>
//     );
// }

// export default UploadFromFile;


import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/axiosInstance';
import { AuthContext } from '../../context/AuthContext';

import './uploadFromFile.css';

function UploadFromFile() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [videoFile, setVideoFile] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false); // new loading state

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        setError('');
        setSuccess('');

        if (!title || !description || !thumbnail || !videoFile) {
            setError('All fields are required.');
            return;
        }

        setLoading(true);  // start loading

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('thumbnail', thumbnail);
        formData.append('videoFile', videoFile);
        formData.append('channel', user?.channel);

        console.log("form data is ::::: =======> ");
        for(let [keys,value] of formData.entries()){
            console.log(keys , value);
        }

        try {
            const res = await api.post('/video', formData);
            console.log("response after uploding is : ",res);
            setSuccess('Video uploaded successfully.');
            setTimeout(() => navigate('/'), 1500);
        } catch (err) {
            setError('Upload failed.');
            console.error(err);
        } finally {
            setLoading(false);  // stop loading regardless of success or failure
        }
    }

    return (
        <form className="upload-form" onSubmit={handleSubmit}>
            <label>Title</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} />

            <label>Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} />

            <label>Thumbnail</label>
            <input type="file" accept="image/*" onChange={e => setThumbnail(e.target.files[0])} />

            <label>Video File</label>
            <input type="file" accept="video/*" onChange={e => setVideoFile(e.target.files[0])} />

            {loading && <p className="loading-msg">Please wait, video is uploading...</p>}

            {error && <p className="error-msg">{error}</p>}
            {success && <p className="success-msg">{success}</p>}

            <button type="submit" disabled={loading}>
                {loading ? "Uploading..." : "Upload"}
            </button>
        </form>
    );
}

export default UploadFromFile;

