import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";

const DefaultModal = ({show, handleClose}) => {
    return (
        <>
            <Modal size="lg" show={show} onHide={handleClose}>
                <Modal.Header>
                    <Form.Control
                        type="text"
                        placeholder="Enter keyword to search..."
                        autoFocus
                    />
                </Modal.Header>
                <Modal.Body>
                    <ul>
                        <li>Item 1</li>
                        <li>Item 2</li>
                        <li>Item 3</li>
                        <li>Item 4</li>
                        <li>Item 5</li>
                    </ul>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default DefaultModal;