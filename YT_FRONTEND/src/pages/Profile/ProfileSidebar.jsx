import {
    MdHome,
    MdExplore,
    MdSubscriptions,
    MdVideoLibrary,
    MdHistory,
    MdWatchLater,
    MdThumbUp,
} from 'react-icons/md';
import { Link } from 'react-router-dom';
import './profileSidebar.css';
import { useContext } from 'react';
import { SidebarContext } from '../../context/SideContext';

function ProfileSidebar() {
    const { isSidebarVisible } = useContext(SidebarContext);

    const sidebarLinks = [
        { label: "Home", icon: MdHome, path: "/" },
        { label: "Explore", icon: MdExplore, path: "/explore" },
        { label: "Subscriptions", icon: MdSubscriptions, path: "/subscriptions" },
        { label: "Library", icon: MdVideoLibrary, path: "/library" },
        { label: "History", icon: MdHistory, path: "/history" },
        { label: "Watch Later", icon: MdWatchLater, path: "/watch-later" },
        { label: "Liked Videos", icon: MdThumbUp, path: "/liked" },
    ];
    

    return (
        <div className={`profile-sidebar ${isSidebarVisible ? 'profile-expanded' : 'profile-collapsed'}`}>
            <nav className="profile-sidebar-nav">
                {sidebarLinks.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <Link key={index} to={item.path} className="profile-sidebar-link" title={item.label}>
                            <Icon className="profile-sidebar-icon" />
                            {isSidebarVisible && (
                                <span className="profile-sidebar-label">{item.label}</span>
                            )}
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}

export default ProfileSidebar;
