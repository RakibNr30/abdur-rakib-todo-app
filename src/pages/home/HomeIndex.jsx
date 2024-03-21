import FrontLayout from "../../layouts/FrontLayout";
import {Card, Col, Row, Table} from "react-bootstrap";
import TodoItem from "../../components/todo/TodoItem";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faKeyboard, faCalendarPlus, faTimes} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useRef, useState} from "react";
import DefaultModal from "../../components/DefaultModal";
import TodoForm from "../todo/TodoForm";
import Button from "react-bootstrap/Button";
import Todo from "../../models/Todo";
import DefaultToast from "../../components/DefaultToast";
import Form from "react-bootstrap/Form";
import useKeyboardShortcut from "../../hooks/useKeyboardShortcut";
import TodoService from "../../services/TodoService";

const HomeIndex = () => {
    const todoService = TodoService();

    const [showFormModal, setShowFormModal] = useState(false);
    const [showUpdateFormModal, setShowUpdateFormModal] = useState(false);
    const [showClearAllModal, setShowClearAllModal] = useState(false);
    const [showKeyboardShortcutModal, setShowKeyboardShortcutModal] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [showUpdateToast, setShowUpdateToast] = useState(false);
    const [showClearAllToast, setShowClearAllToast] = useState(false);
    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState({});

    const searchRef = useRef(null);

    const shortcuts = [
        {key: 's', altKey: true, action: () => searchRef.current && searchRef.current.focus()},
        {key: 'c', altKey: true, action: () => setShowClearAllModal(true)},
        {key: 'a', altKey: true, action: () => setShowFormModal(true)}
    ];

    useKeyboardShortcut(shortcuts);

    useEffect(() => {
        setTodos(todoService.findAll());
    }, []);

    const handleAdd = (todo) => {
        todoService.save(todo);
        setTodos(todoService.findAll())
        setShowToast(true);
    }

    const handleUpdate = (todo) => {
        todoService.update(todo);
        setTodos(todoService.findAll())
        setShowUpdateToast(true);
    }

    const handleClear = () => {
        todoService.saveAll([]);
        setTodos(todoService.findAll())
        setShowClearAllToast(true);
    }

    const handleSearch = (e) => {
        setTodos(todoService.search(e.target.value.trim()));
    }

    return (
        <FrontLayout>
            <>
                <div className="breadcrumb d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">
                        Todo
                        <span className="d-block mt-1"><FontAwesomeIcon icon={faCheckCircle}/> {`${todos.length} tasks`}</span>
                    </h1>
                    {/*<div className="btn-toolbar mb-2 mb-md-0">
                        <div className="btn-group me-2">
                            <button type="button" className="btn btn-sm btn-outline-secondary">Share</button>
                            <button type="button" className="btn btn-sm btn-outline-secondary">Export</button>
                        </div>
                        <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle">
                            <span data-feather="calendar"></span>
                            This week
                        </button>
                    </div>*/}
                </div>

                <Row>
                    <Col md={12} className="mb-5">
                        <Row>
                            <Col md={6}>
                                <Button
                                    className="me-2"
                                    variant="primary"
                                    onClick={() => setShowKeyboardShortcutModal(true)}>
                                    <FontAwesomeIcon icon={faKeyboard}/> Shortcut
                                </Button>
                                <Button
                                    variant="outline-danger"
                                    onClick={() => setShowClearAllModal(true)}>
                                    <FontAwesomeIcon icon={faTimes}/> Clear All
                                </Button>
                            </Col>
                            <Col md={6}>
                                <Form.Floating className="search">
                                    <Form.Control
                                        ref={searchRef}
                                        id="search_keyword"
                                        type="text"
                                        placeholder="Search todo"
                                        onChange={handleSearch}
                                    />
                                    <label htmlFor="search_keyword">Search todo</label>
                                </Form.Floating>
                            </Col>
                        </Row>
                    </Col>

                    {todos.map((item, index) => {
                        return (
                            <Col lg={3} md={4} sm={6} className="mb-3" key={index}>
                                <TodoItem
                                    todo={item}
                                    serial={index + 1}
                                    setShow={() => {
                                        setTodo(item)
                                        setShowUpdateFormModal(true);
                                    }}
                                />
                            </Col>
                        )
                    })}

                    <Col lg={3} md={4} sm={6} className="mb-3">
                        <Card className={`shadow-sm min-height-170 cursor-pointer bg-dark-subtle add-new`}
                              onClick={() => setShowFormModal(true)}
                        >
                            <Card.Body className="add-new-card">
                                <div className={`font-size-72`}>
                                    <FontAwesomeIcon icon={faCalendarPlus} className="text-secondary"></FontAwesomeIcon>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <DefaultModal
                    title="Add Todo"
                    show={showFormModal}
                    handleClose={() => {
                        setShowFormModal(false)
                    }}>

                    <TodoForm
                        todoFor="upcoming"
                        defaultTodo={new Todo}
                        buttonLabel="Add"
                        setShowFormModal={setShowFormModal}
                        handle={handleAdd}
                    />
                </DefaultModal>

                <DefaultModal
                    title="Edit Todo"
                    show={showUpdateFormModal}
                    handleClose={() => {
                        setShowUpdateFormModal(false)
                    }}>

                    <TodoForm
                        todoFor="upcoming"
                        defaultTodo={todo}
                        buttonLabel="Update"
                        handle={handleUpdate}
                        isUpdate={true}
                    />
                </DefaultModal>

                <DefaultModal
                    title="Clear All Todo"
                    show={showClearAllModal}
                    handleClose={() => {
                        setShowClearAllModal(false)
                    }}>
                    <div>
                        Are you sure want to clear all todos?
                    </div>
                    <div>
                        <Button variant="danger" className="mt-3 float-end" onClick={() => {
                            handleClear();
                            setShowClearAllModal(false)
                        }}>
                            Yes
                        </Button>
                    </div>
                </DefaultModal>

                <DefaultModal
                    title="Keyboard Shortcuts"
                    show={showKeyboardShortcutModal}
                    handleClose={() => {
                        setShowKeyboardShortcutModal(false)
                    }}>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Action</th>
                            <th>Shortcut</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Search Focus</td>
                            <td>ALT + S</td>
                        </tr>
                        <tr>
                            <td>Add New</td>
                            <td>ALT + A</td>
                        </tr>
                        <tr>
                            <td>Clear All</td>
                            <td>ALT + C</td>
                        </tr>
                        </tbody>
                    </Table>
                </DefaultModal>

                <DefaultToast
                    show={showToast}
                    setShow={setShowToast}
                    variant={"success"}
                    title="Success!"
                    body="Todo added successfully."
                />

                <DefaultToast
                    show={showUpdateToast}
                    setShow={setShowUpdateToast}
                    variant={"success"}
                    title="Success!"
                    body="Todo updated successfully."
                />

                <DefaultToast
                    show={showClearAllToast}
                    setShow={setShowClearAllToast}
                    variant={"success"}
                    title="Success!"
                    body="Todo list cleared successfully."
                />
            </>
        </FrontLayout>
    );
};

export default HomeIndex;