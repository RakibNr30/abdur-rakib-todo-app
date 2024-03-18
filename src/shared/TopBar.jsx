import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from "react-router-dom";
import useStorageStore from "../stores/storageStore";
import {useEffect, useState} from "react";
import * as storages from "../constants/storages";

const TopBar = () => {
    const {setStorage, getStorage} = useStorageStore();
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        setIsChecked(getStorage() === storages.TYPE.API);
    }, [getStorage]);

    const handleSwitchChange = (checked) => {
        setIsChecked(checked);
        setStorage(checked ? storages.TYPE.API : storages.TYPE.LOCAL);
        window.location.reload();
    };

    return (
        <Navbar expand="lg" className="bg-body-secondary">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    TODO
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll"/>
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" style={{maxHeight: '100px'}} navbarScroll>
                        <Nav.Link as={Link} to="/about">About</Nav.Link>
                        <Nav.Link as={Link} to="/todo">Todo</Nav.Link>
                    </Nav>

                    <Form className="d-flex">
                        <Form.Check
                            type="switch"
                            id="switch"
                            label="Is API Enabled?"
                            checked={isChecked}
                            onChange={(e) => handleSwitchChange(e.target.checked)}
                        />
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default TopBar;
