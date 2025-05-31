import { useContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { SidebarContext } from "../../context/SideContext";
import { FaSearch, FaUser, FaVideo, FaBars } from "react-icons/fa";
import "./profileHeader.css";

function YouTubeLogo() {
    return (
        <svg
            width="40"
            height="28"
            viewBox="0 0 29 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ marginRight: "8px" }}
        >
            <g>
                <path
                    d="M14.4848 20C14.4848 20 23.5695 20 25.8229 19.4C27.0917 19.06 28.0459 18.08 28.3808 16.87C29 14.65 29 9.98 29 9.98C29 9.98 29 5.34 28.3808 3.14C28.0459 1.9 27.0917 0.94 25.8229 0.61C23.5695 0 14.4848 0 14.4848 0C14.4848 0 5.42037 0 3.17711 0.61C1.9286 0.94 0.954148 1.9 0.59888 3.14C0 5.34 0 9.98 0 9.98C0 9.98 0 14.65 0.59888 16.87C0.954148 18.08 1.9286 19.06 3.17711 19.4C5.42037 20 14.4848 20 14.4848 20Z"
                    fill="#FF0000"
                />
                <path d="M19 10L11.5 5.75V14.25L19 10Z" fill="white" />
            </g>
        </svg>
    );
}

function ProfileHeader() {
    const auth = useContext(AuthContext);
    const sidebar = useContext(SidebarContext);
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const modalRef = useRef(null);

    function handleLogoClick() {
        navigate("/");
    }

    function handleSearchChange(event) {
        setSearch(event.target.value);
    }

    function handleSearchSubmit(event) {
        event.preventDefault();
        if (search.trim()) {
            navigate("/search/videos?search=" + search.trim());
        }
    }

    function handleSignIn() {
        navigate("/signin");
    }

    function handleLogoutClick() {
        auth.logout();
        setIsProfileModalOpen(false);
        navigate("/");
    }

    function handleProfileClick() {
        setIsProfileModalOpen(false);
        navigate("/profile/" + auth.user.channel);
    }

    function handleSettingsClick() {
        setIsProfileModalOpen(false);
        navigate("/settings");
    }

    function handleVideoClick() {
        navigate("/uploadVideo");
    }

    function handleCreateChannelClick() {
        setIsProfileModalOpen(false);
        navigate("/createChannel");
    }

    function toggleProfileModal() {
        setIsProfileModalOpen(!isProfileModalOpen);
    }

    function handleClickOutside(event) {
        if (
            modalRef.current &&
            !modalRef.current.contains(event.target) &&
            event.target.id !== "profile-img"
        ) {
            setIsProfileModalOpen(false);
        }
    }

    function handleHamburgerClick() {
        sidebar.toggleSidebar();
    }

    useEffect(function () {
        document.addEventListener("mousedown", handleClickOutside);
        return function () {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="profile-header-wrapper">
            <div className="profile-header-top">
                <div className="profile-left-section">
                    <div className="profile-hamburger" onClick={handleHamburgerClick}>
                        <FaBars size={20} />
                    </div>

                    <div className="profile-logo" onClick={handleLogoClick}>
                        <YouTubeLogo />
                        <span className="profile-logo-text">MyTube</span>
                    </div>
                </div>

                <div className="profile-search-container">
                    <form onSubmit={handleSearchSubmit} className="profile-search-form">
                        <input
                            type="text"
                            placeholder="Search"
                            value={search}
                            onChange={handleSearchChange}
                            className="profile-search-input"
                        />
                        <button type="submit" className="profile-search-btn" aria-label="Search">
                            <FaSearch />
                        </button>
                    </form>
                </div>

                <div className="profile-user-section">
                    {auth.user ? (
                        <>
                            {auth.user.channel ? (
                                <button className="profile-video-btn" onClick={handleVideoClick}>
                                    + create
                                    <FaVideo style={{ fontSize: "16px" }} />
                                </button>
                            ) : null}
                            <div className="profile-box">
                                <img
                                    id="profile-img"
                                    src={auth.user.avatar}
                                    alt="profile"
                                    className="profile-img"
                                    onClick={toggleProfileModal}
                                />
                            </div>
                            <span className="profile-user-greeting">
                                Hello, {auth.user.userName}
                            </span>
                        </>
                    ) : (
                        <button className="profile-signin-btn" onClick={handleSignIn}>
                            <FaUser />
                            <span>Sign In</span>
                        </button>
                    )}
                </div>
            </div>

            {isProfileModalOpen ? (
                <div ref={modalRef} className="profile-modal">
                    <button onClick={handleProfileClick}>Profile</button>
                    <button onClick={handleSettingsClick}>Settings</button>
                    <button onClick={handleCreateChannelClick}>Create Channel</button>
                    <button onClick={handleLogoutClick} className="profile-logout-btn">
                        Logout
                    </button>
                </div>
            ) : null}
        </div>
    );
    
}

export default ProfileHeader;






// return (
//     <div className="header-wrapper">
//         <div className="header-top">
//             <div className="hamburger-menu" onClick={handleHamburgerClick}>
//                 <FaBars size={20} />
//             </div>

//             <div className="logo" onClick={handleLogoClick}>
//                 <YouTubeLogo />
//                 <span className="logo-text">MyTube</span>
//             </div>

//             <form onSubmit={handleSearchSubmit} className="search-form">
//                 <input
//                     type="text"
//                     placeholder="Search"
//                     value={search}
//                     onChange={handleSearchChange}
//                     className="search-input"
//                 />
//                 <button type="submit" className="search-btn" aria-label="Search">
//                     <FaSearch />
//                 </button>
//             </form>

//             <div className="user-section">
//                 {auth.user ? (
//                     <>
//                         {auth.user.channel ? (
//                             <button className="video-btn" onClick={handleVideoClick}>
//                                 <FaVideo />
//                             </button>
//                         ) : null}
//                         <div className="profile-box">
//                             <img
//                                 id="profile-img"
//                                 src={auth.user.avatar}
//                                 alt="profile"
//                                 className="profile-img"
//                                 onClick={toggleProfileModal}
//                             />
//                         </div>
//                         <span className="user-greeting">
//                             Hello, {auth.user.userName}
//                         </span>
//                     </>
//                 ) : (
//                     <button className="signin-btn" onClick={handleSignIn}>
//                         <FaUser />
//                         <span>Sign In</span>
//                     </button>
//                 )}
//             </div>
//         </div>

//         {isProfileModalOpen ? (
//             <div ref={modalRef} className="profile-modal">
//                 <button onClick={handleProfileClick}>Profile</button>
//                 <button onClick={handleSettingsClick}>Settings</button>
//                 <button onClick={handleCreateChannelClick}>Create Channel</button>
//                 <button onClick={handleLogoutClick} className="logout-btn">
//                     Logout
//                 </button>
//             </div>
//         ) : null}
//     </div>
// );
