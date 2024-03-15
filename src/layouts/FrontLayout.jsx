import TopBar from "../shared/TopBar";
import Container from "react-bootstrap/Container";
import '../Front.css'

export default ({ children }) => {
    return (
        <>
            <TopBar />
            <Container className="container-fluid mt-5 mb-5">
                {children}
            </Container>
        </>
    )
}