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
import './sidebar.css';
import { useContext } from 'react';
import { SidebarContext } from '../../context/SideContext';

function Sidebar() {
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
        <div className={`sidebar ${isSidebarVisible ? 'expanded' : 'collapsed'}`}>
            <nav className="sidebar-nav">
                {sidebarLinks.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <Link key={index} to={item.path} className="sidebar-link" title={item.label}>
                            <Icon className="sidebar-icon" />
                            {isSidebarVisible && (
                                <span className="sidebar-label">{item.label}</span>
                            )}
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}

export default Sidebar;


