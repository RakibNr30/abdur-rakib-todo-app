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
import Todo from "../../models/Todo";
import DefaultToast from "../../components/DefaultToast";
import useStorageStore from "../../stores/storageStore";
import * as storages from "../../constants/storages";
import moment from "moment";

const TodoToday = () => {

    const {getAllTodoByDate, getTodo, saveTodo, saveAllTodo} = TodoService();
    const {setStorage, getStorage} = useStorageStore();

    const {addTodoToStore, addAllTodoToStore, addAllFilteredTodoToStore, getAllTodoFromStore} = useTodoStore();
    const [existingTodo, setExistingTodo] = useState({});
    const [showFormModal, setShowFormModal] = useState(false);
    const [showUpdateFormModal, setShowUpdateFormModal] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [showUpdateToast, setShowUpdateToast] = useState(false);
    const [showClearAllToast, setShowClearAllToast] = useState(false);

    useEffect(() => {
        if (getStorage() === storages.TYPE.LOCAL) {
            addAllFilteredTodoToStore(getAllTodoByDate(moment()))
        }
    }, []);

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

    return (
        <FrontLayout>
            <>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">Today</h1>
                </div>

                <Row>
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
            </>
        </FrontLayout>
    );
};

export default TodoToday;