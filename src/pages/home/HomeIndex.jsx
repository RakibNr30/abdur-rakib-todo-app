import FrontLayout from "../../layouts/FrontLayout";
import {Card, Col, Dropdown, DropdownButton, Row, Table} from "react-bootstrap";
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
import {DIRECTION} from "../../constants/sorts";
import ToolbarDropdown from "../../components/ToolbarDropdown";

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
    const [sortField, setSortField] = useState();
    const [sortDirection, setSortDirection] = useState(DIRECTION.ASC);

    const searchRef = useRef(null);

    const shortcuts = [
        {key: 'f', action: () => searchRef.current && searchRef.current.focus()},
        {key: 'r', action: () => setShowClearAllModal(true)},
        {key: 'n', action: () => setShowFormModal(true)}
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

    const handleSort = (field) => {
        const newDirection = field === sortField
            ? (sortDirection === DIRECTION.ASC ? DIRECTION.DESC : DIRECTION.ASC)
            : DIRECTION.ASC;
        setSortField(field);
        setSortDirection(newDirection);

        setTodos(todoService.sort(field, newDirection, todos));
    }

    return (
        <FrontLayout>
            <>
                <div
                    className="breadcrumb d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">
                        Todo
                        <span className="d-block mt-1"><FontAwesomeIcon icon={faCheckCircle}/> {`${todos.length} tasks`}</span>
                    </h1>
                    <div className="btn-toolbar mb-2 mb-md-0">
                        <ToolbarDropdown
                            model={new Todo()}
                            field={sortField}
                            direction={sortDirection}
                            handleSort={handleSort}
                        />
                    </div>
                </div>

                <Row className="mb-3 m-0">
                    <Col md={6}>
                        <Button
                            className="me-2 btn-sm"
                            variant="primary"
                            onClick={() => setShowKeyboardShortcutModal(true)}>
                            <FontAwesomeIcon icon={faKeyboard}/> Shortcut
                        </Button>
                        <Button
                            variant="outline-danger btn-sm"
                            onClick={() => setShowClearAllModal(true)}>
                            <FontAwesomeIcon icon={faTimes}/> Remove All
                        </Button>
                    </Col>
                    <Col md={6}>
                        <Form.Control
                            ref={searchRef}
                            id="search_keyword"
                            type="text"
                            placeholder="Enter search keyword..."
                            className="dt-search"
                            onChange={handleSearch}
                        />
                    </Col>
                </Row>

                <div className="content-scrolling">
                    <Row className="m-0">
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
                            <Card className={`shadow-sm min-height-146 cursor-pointer bg-dark-subtle add-new`}
                                  onClick={() => setShowFormModal(true)}
                            >
                                <Card.Body className="add-new-card">
                                    <div className={`font-size-72`}>
                                        <FontAwesomeIcon icon={faCalendarPlus}
                                                         className="text-secondary"></FontAwesomeIcon>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>

                    </Row>
                </div>

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
                    title="Remove All Todo"
                    show={showClearAllModal}
                    handleClose={() => {
                        setShowClearAllModal(false)
                    }}>
                    <div>
                        Are you sure want to remove all todos?
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
                            <td>ALT + F</td>
                        </tr>
                        <tr>
                            <td>Add New</td>
                            <td>ALT + N</td>
                        </tr>
                        <tr>
                            <td>Remove All</td>
                            <td>ALT + R</td>
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