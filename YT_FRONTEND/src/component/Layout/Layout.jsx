// // Layout.jsx

// import { Outlet } from "react-router-dom";
// import Sidebar from "../Sidebar/Sidebar";
// import Header from "../Header/Header";
// import { useState } from "react";

// function Layout() {

//     const [isSidebarVisible, setSidebarVisible] = useState(true);

//     function toggleSidebar() {
//         setSidebarVisible(!isSidebarVisible);
//     }

//     return (
//         <div className="flex flex-col min-h-screen">
//             <Header toggleSidebar={toggleSidebar} />

//             <div className="flex flex-grow">
//                 <Sidebar isSidebarVisible={isSidebarVisible} />

//                 {/* Page content rendered here */}
//                 <main className="flex-grow p-4 bg-[#f9f9f9] text-black dark:bg-[#181818] dark:text-white">
//                     <Outlet />
//                 </main>
//             </div>
//         </div>
//     );
// }

import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { useContext } from "react";
import { SidebarContext } from "../../context/SideContext";
import Header from "../Header/Header";

function Layout() {
    const { isSidebarVisible, toggleSidebar } = useContext(SidebarContext);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <div className="flex flex-grow">
                <Sidebar toggleSidebar={toggleSidebar} />

                <main
                    className={`flex-grow bg-[#f9f9f9] text-black dark:bg-[#181818] dark:text-white transition-all duration-300 ${isSidebarVisible ? 'ml-[220px]' : 'ml-[72px]'
                        }`}
                >
                    {/* Pass the sidebar state to all children */}
                    <Outlet context={{ isSidebarVisible }} />
                </main>
            </div>
        </div>
    );
}

export default Layout;
