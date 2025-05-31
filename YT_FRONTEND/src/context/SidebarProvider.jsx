
import { useState } from "react";
import { SidebarContext } from "./SideContext";
function SidebarProvider(props) {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true); // default: visible

    function toggleSidebar() {
        setIsSidebarVisible(function callback(prev) {
            return !prev;
        });
    }

    return (
        <SidebarContext.Provider value={{ isSidebarVisible: isSidebarVisible, toggleSidebar: toggleSidebar }}>
            {props.children}
        </SidebarContext.Provider>
    );
}

export default SidebarProvider;
