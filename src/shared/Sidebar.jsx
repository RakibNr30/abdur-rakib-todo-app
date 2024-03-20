import '../scss/Sidebar.scss'
import {Link, useLocation} from "react-router-dom";
import moment from "moment";

const Sidebar = () => {
    const path = useLocation().pathname;

    return (
        <div className="container-fluid">
            <div className="row">
                <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                    <div className="position-sticky pt-3">
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <button className="nav-link add-todo-btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                         viewBox="0 0 24 24">
                                        <path fill="currentColor" fillRule="evenodd"
                                              d="M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11Zm-.711-16.5a.75.75 0 1 1 1.5 0v4.789H17.5a.75.75 0 0 1 0 1.5h-4.711V17.5a.75.75 0 0 1-1.5 0V12.79H6.5a.75.75 0 1 1 0-1.5h4.789V6.5Z"
                                              clipRule="evenodd"></path>
                                    </svg>
                                    <span className="ms-2">Add Todo</span>
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link search-todo-btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                         viewBox="0 0 24 24">
                                        <path fill="currentColor" fillRule="evenodd"
                                              d="M16.29 15.584a7 7 0 1 0-.707.707l3.563 3.563a.5.5 0 0 0 .708-.707l-3.563-3.563ZM11 17a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"
                                              clipRule="evenodd"></path>
                                    </svg>
                                    <span className="ms-2">Search</span>
                                </button>
                            </li>
                            <li className="nav-item">
                                <Link to="/app/today" className={`nav-link ${path === "/app/today" ? "active" : ""}`}>
                                    <svg width="24" height="24" viewBox="0 0 24 24">
                                        <g fill="currentColor" fillRule="evenodd">
                                            <path fillRule="nonzero"
                                                  d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H6zm1 3h10a.5.5 0 1 1 0 1H7a.5.5 0 0 1 0-1z"></path>
                                            <text
                                                fontFamily="-apple-system, system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'"
                                                fontSize="9" transform="translate(4 2)" fontWeight="500">
                                                <tspan x="8" y="15" textAnchor="middle">{moment().date()}</tspan>
                                            </text>
                                        </g>
                                    </svg>
                                    <span className="ms-2">Today</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/app/upcoming" className={`nav-link ${path === "/app/upcoming" ? "active" : ""}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                         viewBox="0 0 24 24">
                                        <path fill="currentColor" fillRule="evenodd"
                                              d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H6Zm10 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm-3-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-5 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm9-5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-5 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm-3-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM7 8a.5.5 0 0 0 0 1h10a.5.5 0 0 0 0-1H7Z"
                                              clipRule="evenodd"></path>
                                    </svg>
                                    <span className="ms-2">Upcoming</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/app/completed" className={`nav-link ${path === "/app/completed" ? "active" : ""}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                         viewBox="0 0 24 24">
                                        <path fill="currentColor" fillRule="evenodd"
                                              d="M12 21.001a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-1a8 8 0 1 1 0-16 8 8 0 0 1 0 16Zm-4.354-8.104a.5.5 0 0 1 .708 0l2.146 2.147 5.146-5.147a.5.5 0 0 1 .708.708l-5.5 5.5a.5.5 0 0 1-.708 0l-2.5-2.5a.5.5 0 0 1 0-.708Z"
                                              clipRule="evenodd"></path>
                                    </svg>
                                    <span className="ms-2">Completed</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/app/expired" className={`nav-link ${path === "/app/expired" ? "active" : ""}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                         viewBox="0 0 24 24">
                                        <path fill="currentColor" fillRule="evenodd"
                                              d="M4.854 5.354a1.974 1.974 0 0 0-.272 2.453.5.5 0 1 1-.843.538 2.974 2.974 0 0 1 4.106-4.106.5.5 0 0 1-.536.843 1.976 1.976 0 0 0-2.455.272Zm11.839-.272a1.974 1.974 0 0 1 2.725 2.727.5.5 0 1 0 .844.536 2.976 2.976 0 0 0-4.107-4.106.5.5 0 1 0 .538.843Zm.245 13.063A7.47 7.47 0 0 1 12 20c-1.891 0-3.619-.7-4.938-1.855l-1.708 1.709a.5.5 0 1 1-.708-.708l1.709-1.708a7.5 7.5 0 1 1 11.29 0l1.709 1.708a.5.5 0 1 1-.708.707l-1.708-1.708ZM12 19a6.5 6.5 0 1 1 0-13 6.5 6.5 0 0 1 0 13Zm0-11v4h2.5a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5V8a.5.5 0 1 1 1 0Z"
                                              clipRule="evenodd"></path>
                                    </svg>
                                    <span className="ms-2">Expired</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    );
}

export default Sidebar;
