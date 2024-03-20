import TopBar from "../shared/TopBar";
import '../scss/Front.scss'
import Sidebar from "../shared/Sidebar";

const FrontLayout = ({ children }) => {
    return (
        <>
            <TopBar />

            <Sidebar />

            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 px-2">
                {children}
            </main>
        </>
    )
}

export default FrontLayout;