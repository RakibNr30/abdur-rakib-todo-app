import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import {useEffect, useState} from "react";
import TodoService from "../services/TodoService";
import {Col, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import moment from "moment";
import SearchTodoItem from "./todo/SearchTodoItem";

const DefaultModal = ({show, handleClose}) => {

    const navigate = useNavigate();
    const todoService = TodoService();

    const [keyword, setKeyword] = useState("");
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        setKeyword("");
        setTodos([]);
    }, [show]);

    const handleSearch = (e) => {
        setKeyword(e.target.value.trim());
        setTodos(todoService.search(e.target.value.trim()));
    }

    return (
        <>
            <Modal size="lg" className="search-modal" show={show} onHide={handleClose}>
                <Modal.Header className="p-0">
                    <Form.Control
                        type="text"
                        placeholder="Enter keyword to search..."
                        className="search"
                        onChange={handleSearch}
                    />
                </Modal.Header>
                <Modal.Body style={{maxHeight: "70vh", overflowY: "scroll", scrollbarWidth: "none", padding: "0"}}>
                    <Row className="p-0 m-0">
                        {keyword.length < 1 &&
                            <Col md={12} className="mt-2 p-0 m-0">
                                <span className="pl-rem-1 pr-rem-1"><small>Quick view</small></span>
                                <div className="modal-search-options">
                                    <div className="option" onClick={() => {
                                        handleClose(true)
                                        navigate("/portal/today")
                                    }}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" className="quick_find__today_icon"
                                             aria-hidden="true">
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
                                        <span aria-hidden="true"><div>Today</div></span>
                                    </div>
                                    <div className="option" onClick={() => {
                                        handleClose(true)
                                        navigate("/portal/upcoming")
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                             viewBox="0 0 24 24">
                                            <path fill="currentColor" fillRule="evenodd"
                                                  d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H6Zm10 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm-3-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-5 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm9-5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-5 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm-3-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM7 8a.5.5 0 0 0 0 1h10a.5.5 0 0 0 0-1H7Z"
                                                  clipRule="evenodd"></path>
                                        </svg>
                                        <span aria-hidden="true"><div>Upcoming</div></span>
                                    </div>
                                </div>
                            </Col>
                        }

                        {todos.length > 0 &&
                            <Col md={12} className="p-0 m-0 mt-2">
                                <div>
                                    <Row className="p-0 m-0">
                                        {todos.map((item, index) => {
                                            return <Col md={12} className="mb-2" key={index}>
                                                <SearchTodoItem
                                                    todo={item}
                                                />
                                            </Col>
                                        })}
                                    </Row>
                                </div>
                            </Col>
                        }
                        {todos.length < 1 && keyword.length > 0 &&
                            <Col md={12} className="p-4">
                                No todo available...
                            </Col>
                        }
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default DefaultModal;