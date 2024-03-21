import FrontLayout from "../../layouts/FrontLayout";
import {Card, Col, Row} from "react-bootstrap";
import TodoItem from "../../components/todo/TodoItem";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faCalendarPlus} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import DefaultModal from "../../components/DefaultModal";
import TodoForm from "../todo/TodoForm";
import Todo from "../../models/Todo";
import DefaultToast from "../../components/DefaultToast";
import moment from "moment";
import TodoService from "../../services/TodoService";
import {dayLabel} from "../../utils/dateUtil";

const TodoToday = () => {
    const todoService = TodoService();

    const [showFormModal, setShowFormModal] = useState(false);
    const [showUpdateFormModal, setShowUpdateFormModal] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [showUpdateToast, setShowUpdateToast] = useState(false);
    const [todo, setTodo] = useState({});
    const [todos, setTodos] = useState([]);
    const [overdueTodos, setOverdueTodos] = useState([]);

    useEffect(() => {
        setTodos(todoService.findAllByDate(moment(), false));
        setOverdueTodos(todoService.findAllOverdueByDate(moment()));
    }, []);

    const handleAdd = (todo) => {
        todoService.save(todo);
        setTodos(todoService.findAllByDate(moment(), false));
        setOverdueTodos(todoService.findAllOverdueByDate(moment()));
        setShowToast(true);
    }

    const handleUpdate = (todo) => {
        todoService.update(todo);
        setTodos(todoService.findAllByDate(moment(), false));
        setOverdueTodos(todoService.findAllOverdueByDate(moment()));
        setShowUpdateToast(true);
    }

    return (
        <FrontLayout>
            <>
                <div className="breadcrumb d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">
                        Today
                        <span className="d-block mt-1"><FontAwesomeIcon icon={faCheckCircle} /> {`${todos.length + overdueTodos.length} tasks`}</span>
                    </h1>
                </div>

                <Row>
                    {overdueTodos.length > 0 &&
                        <Col className="col-6">
                            <Row>
                                <Col md={12} className="mb-3">
                                    <h5>Overdue ({overdueTodos.length})</h5>
                                </Col>
                                <Col md={12}>
                                    <Row>
                                        {overdueTodos.map((item, index) => {
                                            return (
                                                <Col md={6} className="mb-3" key={index}>
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
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    }
                    <Col className="col-6">
                        <Row>
                            <Col md={12} className="mb-3">
                                <h5>{moment().format("DD MMM")} - {dayLabel(moment())} ({todos.length})</h5>
                            </Col>
                            <Col md={12}>
                                <Row>
                                    {todos.map((item, index) => {
                                        return (
                                            <Col md={6} className="mb-3" key={index}>
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
                                    <Col md={6} className="mb-3">
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
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <DefaultModal
                    title="Add Todo"
                    show={showFormModal}
                    handleClose={() => {
                        setShowFormModal(false)
                    }}>

                    <TodoForm
                        todoFor="today"
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
                        todoFor="today"
                        defaultTodo={todo}
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