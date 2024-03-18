import FrontLayout from "../../layouts/FrontLayout";
import {Card, Col, Row, Table} from "react-bootstrap";
import TodoItem from "../../components/todo/TodoItem";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faKeyboard, faPlusSquare, faTimes} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useRef, useState} from "react";
import DefaultModal from "../../components/DefaultModal";
import TodoForm from "../todo/TodoForm";
import useTodoStore from "../../stores/todoStore";
import TodoService from "../../services/TodoService";
import Button from "react-bootstrap/Button";
import Todo from "../../models/Todo";
import DefaultToast from "../../components/DefaultToast";
import Form from "react-bootstrap/Form";
import useKeyboardShortcut from "../../hooks/useKeyboardShortcut";

const HomeIndex = () => {
    const todoService = TodoService();

    const {addTodoToStore, addAllTodoToStore, getAllTodoFromStore, searchTodos} = useTodoStore();
    const [existingTodo, setExistingTodo] = useState({});
    const [showFormModal, setShowFormModal] = useState(false);
    const [showUpdateFormModal, setShowUpdateFormModal] = useState(false);
    const [showClearAllModal, setShowClearAllModal] = useState(false);
    const [showKeyboardShortcutModal, setShowKeyboardShortcutModal] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [showUpdateToast, setShowUpdateToast] = useState(false);
    const [showClearAllToast, setShowClearAllToast] = useState(false);

    const searchRef = useRef(null);

    useEffect(() => {
        addAllTodoToStore(todoService.getAllTodo())
    }, []);

    const shortcuts = [
        { key: 's', altKey: true, action: () => searchRef.current && searchRef.current.focus() },
        { key: 'c', altKey: true, action: () => setShowClearAllModal(true) },
        { key: 'a', altKey: true, action: () => setShowFormModal(true) }
    ];

    useKeyboardShortcut(shortcuts);

    let todos = getAllTodoFromStore();

    const handleAdd = (todo) => {
        addTodoToStore(todo);
        setShowToast(true);
    }

    const handleUpdate = (todo) => {
        todos = todos.map((item) => {
            if (item.id === todo.id) {
                item = {...todo, updated_at: new Date().toISOString()};
            }
            return item;
        });

        addAllTodoToStore(todos);
        setShowUpdateToast(true);
    }

    const handleClear = () => {
        addAllTodoToStore([]);
        setShowClearAllToast(true);
    }

    const handleSearch = (e) => {
        searchTodos(e.target.value.trim());
    }

    return (
        <FrontLayout>
            <>
                <Row>
                    <Col md={12} className="mb-5">
                        <Button
                            className="me-2"
                            variant="primary"
                            onClick={() => setShowKeyboardShortcutModal(true)}>
                            <FontAwesomeIcon icon={faKeyboard} /> Shortcut
                        </Button>
                        <Button
                            variant="outline-danger"
                            onClick={() => setShowClearAllModal(true)}>
                            <FontAwesomeIcon icon={faTimes} /> Clear All
                        </Button>

                        <Form.Floating className="w-auto float-end">
                            <Form.Control
                                ref={searchRef}
                                id="search_keyword"
                                type="text"
                                placeholder="Search todo"
                                className="d-auto float-end"
                                onChange={handleSearch}
                            />
                            <label htmlFor="search_keyword">Search todo</label>
                        </Form.Floating>
                    </Col>

                    {todos.map((todo, index) => {
                        return (
                            <Col md={6} className="mb-3" key={index}>
                                <TodoItem
                                    todo={todo}
                                    serial={index + 1}
                                    setShow={() => {
                                        setExistingTodo(todo)
                                        setShowUpdateFormModal(true);
                                    }}
                                />
                            </Col>
                        )
                    })}

                    <Col md={6} className="mb-3">
                        <Card className={`shadow-sm min-height-170 cursor-pointer bg-dark-subtle`}
                              onClick={() => setShowFormModal(true)}
                        >
                            <Card.Body className="add-new-card">
                                <div className={`font-size-72`}>
                                    <FontAwesomeIcon icon={faPlusSquare}></FontAwesomeIcon>
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
                        defaultTodo={existingTodo}
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