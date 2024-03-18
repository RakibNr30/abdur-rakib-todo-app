import TopBar from "../shared/TopBar";
import Container from "react-bootstrap/Container";
import '../scss/Front.scss'

const FrontLayout = ({ children }) => {
    return (
        <>
            <TopBar />
            <Container className="container-fluid mt-5 mb-5">
                {children}
            </Container>
        </>
    )
}

export default FrontLayout;