// import { useContext, useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext";
// import { FaSearch, FaUser, FaVideo } from "react-icons/fa";
// import "./header.css";

// function Header() {
//     const auth = useContext(AuthContext);
//     console.log("auth user in header is : ",auth);
//     const navigate = useNavigate();

//     const [search, setSearch] = useState("");
//     const [category, setCategory] = useState("All");
//     const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

//     const modalRef = useRef(null);


//     const categories = [
//         "All",
//         "Entertainment",
//         "Music",
//         "Education",
//         "Sports",
//         "Gaming",
//         "Lovely",
//     ];

//     function handleLogoClick() {
//         navigate("/");
//     }

//     function handleSearchChange(event) {
//         setSearch(event.target.value);
//     }

//     function handleSearchSubmit(event) {
//         event.preventDefault();

//         const params = new URLSearchParams();

//         if (search.trim() !== "") {
//             params.append("search", search.trim());
//         }
//         if (category !== "All") {
//             params.append("category", category);
//         }

//         navigate("/search/videos?" + params.toString());
//     }

//     function handleCategoryClick(cat) {
//         setCategory(cat);

//         const params = new URLSearchParams();

//         if (cat !== "All") {
//             params.append("category", cat);
//         }

//         navigate("/?" + params.toString());
//     }

//     function handleSignIn() {
//         navigate("/signin");
//     }

//     function handleLogoutClick() {
//         auth.logout();
//         setIsProfileModalOpen(false);
//         navigate("/");
//     }

//     function handleProfileClick() {
//         setIsProfileModalOpen(false);
//         console.log("user in header inside the onClick of profile is : ",auth);
//         const channelId=auth.user.channel;
//         console.log("channel id in profile is : ",channelId);
//         navigate(`/profile/${channelId}`);
//     }

//     function handleSettingsClick() {
//         setIsProfileModalOpen(false);
//         navigate("/settings");
//     }

//     function handleVideoClick() {
//         navigate("/uploadVideo");
//     }

//     function handleCreateChannelClick() {
//         setIsProfileModalOpen(false);
//         navigate("/createChannel");
//     }

//     function toggleProfileModal() {
//         setIsProfileModalOpen(!isProfileModalOpen);
//     }

//     useEffect(function () {
//         function handleClickOutside(event) {
//             if (
//                 modalRef.current &&
//                 !modalRef.current.contains(event.target) &&
//                 event.target.id !== "profile-img"
//             ) {
//                 setIsProfileModalOpen(false);
//             }
//         }

//         document.addEventListener("mousedown", handleClickOutside);
//         return function cleanup() {
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, []);

//     useEffect(function () {
//         function preventScrollDown(e) {
//             if (!isProfileModalOpen) return;
//             if (e.deltaY > 0) {
//                 e.preventDefault();
//             }
//         }

//         if (isProfileModalOpen) {
//             document.addEventListener("wheel", preventScrollDown, { passive: false });
//         }

//         return function cleanup() {
//             document.removeEventListener("wheel", preventScrollDown);
//         };
//     }, [isProfileModalOpen]);

//     function renderCategoryButtons() {
//         var buttons = [];

//         function createClickHandler(cat) {
//             return function () {
//                 handleCategoryClick(cat);
//             };
//         }

//         for (var i = 0; i < categories.length; i++) {
//             var cat = categories[i];
//             var isActive = cat === category;
//             var buttonClass = isActive ? "category-btn active" : "category-btn";

//             buttons.push(
//                 <button
//                     key={cat}
//                     onClick={createClickHandler(cat)}
//                     className={buttonClass}
//                 >
//                     {cat}
//                 </button>
//             );
//         }

//         return buttons;
//     }

//     return (
//         <div className="header-wrapper">
//             <div className="header-top">
//                 <div className="logo" onClick={handleLogoClick}>
//                     <h1>MyTube</h1>
//                 </div>

//                 <form onSubmit={handleSearchSubmit} className="search-form">
//                     <input
//                         type="text"
//                         placeholder="Search"
//                         value={search}
//                         onChange={handleSearchChange}
//                         className="search-input"
//                     />
//                     <button type="submit" className="search-btn" aria-label="Search">
//                         <FaSearch />
//                     </button>
//                 </form>

//                 <div className="user-section">
//                     {auth.user ? (
//                         <>
//                             {auth.user.channel && (
//                                 <button className="video-btn" onClick={handleVideoClick}>
//                                     <FaVideo />
//                                 </button>
//                             )}

//                             <div className="profile-box">
//                                 <img
//                                     id="profile-img"
//                                     src={auth.user.avatar}
//                                     alt={auth.user.userName + "'s profile"}
//                                     className="profile-img"
//                                     onClick={toggleProfileModal}
//                                 />
//                             </div>

//                             <span className="user-greeting">
//                                 Hello, {auth.user.userName}
//                             </span>
//                         </>
//                     ) : (
//                         <button className="signin-btn" onClick={handleSignIn}>
//                             <FaUser />
//                             <span>Sign In</span>
//                         </button>
//                     )}
//                 </div>
//             </div>

//             <div className="category-bar">
//                 {renderCategoryButtons()}
//             </div>

//             {isProfileModalOpen && (
//                 <div ref={modalRef} className="profile-modal">
//                     <button onClick={handleProfileClick}>Profile</button>
//                     <button onClick={handleSettingsClick}>Settings</button>
//                     <button onClick={handleCreateChannelClick}>Create Channel</button>
//                     <button onClick={handleLogoutClick} className="logout-btn">
//                         Logout
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Header;


//! NOTE ===> "keep in mind whenever something is behaving randomely or strangly then check for dom even removing the style if there is style present that means somewhere in ur code u made syle conflict like giving the same class unkonwlingly ... tyr to remove the css and then check if issue resolved then it is style conflict.. issue."

// ---------- search -----------

import { useContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { FaBars, FaSearch, FaUser, FaVideo } from "react-icons/fa";
import "./header.css";
import { SidebarContext } from "../../context/SideContext";


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

function Header() {
    // console.log("header is started rendering =================================== \n");
    const auth = useContext(AuthContext);
    const { toggleSidebar } = useContext(SidebarContext);
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

    const modalRef = useRef(null);

    const categories = [
        "All", "Entertainment", "Music", "Education",
        "Sports", "Gaming", "Lovely"
    ];

    function handleLogoClick() {
        navigate("/");
    }

    function handleSearchChange(event) {
        setSearch(event.target.value);
    }

    function handleSearchSubmit(event) {
        event.preventDefault();
        const params = new URLSearchParams();
        if (search.trim() !== "") {
            params.append("search", search.trim());
        }
        if (category !== "All") {
            params.append("category", category);
        }
        navigate("/search/videos?" + params.toString());
    }

    function handleCategoryClick(cat) {
        setCategory(cat);
        const params = new URLSearchParams();
        if (search.trim() !== "") {
            params.append("search", search.trim());
        }
        if (cat !== "All") {
            params.append("category", cat);
        }
        navigate("/search/videos?" + params.toString());
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
        const channelId = auth.user.channel;
        navigate(`/profile/${channelId}`);
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

    useEffect(function () {
        function handleClickOutside(event) {
            if (
                modalRef.current &&
                !modalRef.current.contains(event.target) &&
                event.target.id !== "profile-img"
            ) {
                setIsProfileModalOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return function cleanup() {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(function () {
        function preventScrollDown(e) {
            if (!isProfileModalOpen) return;
            if (e.deltaY > 0) {
                e.preventDefault();
            }
        }

        if (isProfileModalOpen) {
            document.addEventListener("wheel", preventScrollDown, { passive: false });
        }

        return function cleanup() {
            document.removeEventListener("wheel", preventScrollDown);
        };
    }, [isProfileModalOpen]);

    function renderCategoryButtons() {
        var buttons = [];

        function createClickHandler(cat) {
            return function () {
                handleCategoryClick(cat);
            };
        }

        for (var i = 0; i < categories.length; i++) {
            var cat = categories[i];
            var isActive = cat === category;
            var buttonClass = isActive ? "category-btn active" : "category-btn";

            buttons.push(
                <button
                    key={cat}
                    onClick={createClickHandler(cat)}
                    className={buttonClass}
                >
                    {cat}
                </button>
            );
        }

        return buttons;
    }

    // console.log("header is rendered ended =====================================\n");
    return (
        <div className="header-wrapper">
            <div className="header-top">
                <div className="left-section">
                    <button
                        className="hamburger-menu"
                        onClick={toggleSidebar}
                        aria-label="Toggle sidebar"
                    >
                        <FaBars />
                    </button>

                    <div className="logo" onClick={handleLogoClick}>
                        <YouTubeLogo />
                        <span className="logo-text">MyTube</span>
                    </div>
                </div>

                <div className="search-container">
                    <form onSubmit={handleSearchSubmit} className="search-form">
                        <input
                            type="text"
                            placeholder="Search"
                            value={search}
                            onChange={handleSearchChange}
                            className="search-input"
                        />
                        <button type="submit" className="search-btn" aria-label="Search">
                            <FaSearch />
                        </button>
                    </form>
                </div>

                <div className="user-section">
                    {auth.user ? (
                        <>
                            {auth.user.channel && (
                                // <button className="video-btn" onClick={handleVideoClick}>
                                //     + create
                                //     <FaVideo />
                                // </button>
                                <button className="video-btn" onClick={handleVideoClick}>
                                    + create
                                    <FaVideo style={{ fontSize: "16px" }} />
                                </button>
                            )}

                            <div className="profile-box">
                                <img
                                    id="profile-img"
                                    src={auth.user.avatar}
                                    alt={auth.user.userName + "'s profile"}
                                    className="profile-img"
                                    onClick={toggleProfileModal}
                                />
                            </div>

                            <span className="user-greeting">
                                Hello, {auth.user.userName}
                            </span>
                        </>
                    ) : (
                        <button className="signin-btn" onClick={handleSignIn}>
                            <FaUser />
                            <span>Sign In</span>
                        </button>
                    )}
                </div>
            </div>

            <div className="category-bar">
                {renderCategoryButtons()}
            </div>

            {isProfileModalOpen && (
                <div ref={modalRef} className="profile-modal">
                    <button onClick={handleProfileClick}>Profile</button>
                    <button onClick={handleSettingsClick}>Settings</button>
                    <button onClick={handleCreateChannelClick}>Create Channel</button>
                    <button onClick={handleLogoutClick} className="logout-btn">
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}

export default Header;

