import FrontLayout from "../../layouts/FrontLayout";
import {Card, Col, Row} from "react-bootstrap";
import TodoItem from "../../components/todo/TodoItem";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusSquare, faTimes} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import DefaultModal from "../../components/DefaultModal";
import TodoForm from "../todo/TodoForm";
import useTodoStore from "../../stores/todoStore";
import {getAllTodo} from "../../repository/todoRepository";
import Button from "react-bootstrap/Button";
import Todo from "../../models/Todo";

const HomeIndex = () => {

    const {addTodoToStore, addAllTodoToStore, getAllTodoFromStore} = useTodoStore();
    const [showFormModal, setShowFormModal] = useState(false);
    const [showClearAllModal, setShowClearAllModal] = useState(false);

    useEffect(() => {
        addAllTodoToStore(getAllTodo())
    }, []);

    const todos = getAllTodoFromStore();

    const handleAdd = (todo) => {
        addTodoToStore(todo);
    }

    const handleClear = () => {
        addAllTodoToStore([]);
    }

    return (
        <FrontLayout>
            <>
                <Row>
                    <Col md={12} className="mb-5">
                        <Button variant="outline-danger" onClick={() => setShowClearAllModal(true)}><FontAwesomeIcon icon={faTimes} /> Clear All</Button>
                    </Col>

                    {todos.map((todo, index) => {
                        return (
                            <Col md={6} className="mb-3" key={index}>
                                <TodoItem
                                    todo={todo}
                                    serial={index + 1}
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
            </>
        </FrontLayout>
    );
};

export default HomeIndex;