import TopBar from "../shared/TopBar";
import '../scss/Front.scss'
import Sidebar from "../shared/Sidebar";
import {useEffect, useState} from "react";

const FrontLayout = ({ children }) => {
    const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 992);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsCollapsed(window.innerWidth < 992);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="tudududu-app">
            <Sidebar isCollapsed={isCollapsed} />

            <main className="px-md-4 px-3">
                <TopBar toggleCollapse={toggleCollapse} />
                {children}
            </main>
        </div>
    )
}

export default FrontLayout;