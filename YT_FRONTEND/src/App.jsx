

// import { Route, Routes } from 'react-router-dom'
// import './App.css'
// import Header from './component/Header/Header'
// import Home from './pages/Home'
// import SignIn from './pages/SignIn'
// import SignUp from './pages/SignUp'
// import Sidebar from './component/Sidebar/Sidebar'

// function App() {

//     return (
//         <>
//             {/* <div className='bg-green-300'>Hello world </div> */}
//             <Header/>


//             <Routes>

//                 <Route>
//                     <Route path="/" element={<Home />} />
//                     <Route path='/signin' element={<SignIn/>} />
//                     <Route path='/signup' element={<SignUp/>} />
//                 </Route>
//             </Routes>
//         </>
//     )
// }

// export default App



// src/App.jsx

import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import VideoPlayer from "./pages/VideoPlayer/VideoPlayer";
import Signup from "./pages/SignUp/SignUp";
import Layout from './component/Layout/Layout'
import UploadVideo from "./pages/UploadVideo/UploadVideo";
import CreateChannel from "./pages/Channel/Channel";
import Profile from "./pages/Profile/Profile";
import EditVideo from "./component/EditVideo/EditVideo";
import Search from "./component/Search/Search";


function App() {
    return (
        <Routes>

            {/* Layout routes (with sidebar and header) */}
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
            </Route>

            {/* Standalone routes without sidebar/header */}
            {/* <Route path="/" element={<Home/>}/> */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="video/:videoId" element={<VideoPlayer />} />
            <Route path="/uploadVideo" element={<UploadVideo/>} />
            <Route path="/createChannel" element={<CreateChannel/>} />
            <Route path="/profile/:channelId" element={<Profile />} />
            <Route path="/editVideo/:id" element={<EditVideo />} />
            <Route path="/search/videos" element={<Search/>} />

        </Routes>
    );
}

export default App;
