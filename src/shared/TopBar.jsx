import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
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
        <header className="navbar navbar-light sticky-top bg-light flex-md-nowrap p-0 shadow">
            <Link className="navbar-brand col-md-3 col-lg-2 me-0 px-3" to="/">TuDuDu</Link>
            <button className="navbar-toggler position-absolute d-md-none collapsed" type="button"
                    data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu"
                    aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <Nav className="me-auto px-2" style={{maxHeight: '100px'}} navbarScroll>
                <Nav.Link as={Link} to="/about">About</Nav.Link>
                <Nav.Link as={Link} to="/todo">Todo</Nav.Link>
            </Nav>

            <Form className="d-flex px-md-4 px-2">
                <Form.Check
                    type="switch"
                    id="switch"
                    label="Is API Enabled?"
                    checked={isChecked}
                    onChange={(e) => handleSwitchChange(e.target.checked)}
                />
            </Form>
        </header>
    );
}

export default TopBar;
