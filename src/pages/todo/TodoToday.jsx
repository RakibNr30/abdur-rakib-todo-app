import FrontLayout from "../../layouts/FrontLayout";
import {Col, Row} from "react-bootstrap";
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
import AddNewButton from "../../components/AddNewButton";
import {DIRECTION} from "../../constants/sorts";
import ToolbarDropdown from "../../components/ToolbarDropdown";

const TodoToday = () => {
    const todoService = TodoService();

    const [showFormModal, setShowFormModal] = useState(false);
    const [showUpdateFormModal, setShowUpdateFormModal] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [showUpdateToast, setShowUpdateToast] = useState(false);
    const [todo, setTodo] = useState({});
    const [todos, setTodos] = useState([]);
    const [overdueTodos, setOverdueTodos] = useState([]);
    const [sortField, setSortField] = useState();
    const [sortDirection, setSortDirection] = useState(DIRECTION.ASC);

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

    const handleSort = (field) => {
        const newDirection = field === sortField
            ? (sortDirection === DIRECTION.ASC ? DIRECTION.DESC : DIRECTION.ASC)
            : DIRECTION.ASC;
        setSortField(field);
        setSortDirection(newDirection);

        setTodos(todoService.sort(field, newDirection, todos));
        setOverdueTodos(todoService.sort(field, newDirection, overdueTodos));
    }

    return (
        <FrontLayout>
            <>
                <div
                    className="breadcrumb d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">
                        Today
                        <span className="d-block mt-1"><FontAwesomeIcon
                            icon={faCheckCircle}/> {`${todos.length + overdueTodos.length} tasks`}</span>
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

                <div className="list-scrolling">
                    {overdueTodos.length > 0 &&
                        <div className="list-scrolling-items width-320 mb-3">
                            <Row className="m-0 p-0">
                                <Col md={12} className="mb-3">
                                    <h5 className="date-title">Overdue ({overdueTodos.length})</h5>
                                </Col>
                                <Col md={12}>
                                    <div className="list-items">
                                        {overdueTodos.map((item, index) => {
                                            return (
                                                <div className="mb-3" key={index}>
                                                    <TodoItem
                                                        todo={item}
                                                        serial={index + 1}
                                                        setShow={() => {
                                                            setTodo(item)
                                                            setShowUpdateFormModal(true);
                                                        }}
                                                    />
                                                </div>
                                            )
                                        })}
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    }
                    <div className="list-scrolling-items width-320 mb-3">
                        <Row className="m-0 p-0">
                            <Col md={12} className="mb-3">
                                <h5 className="date-title">{moment().format("DD MMM")} - {dayLabel(moment())} ({todos.length})</h5>
                            </Col>
                            <Col md={12}>
                                <div className="list-items">
                                    {todos.map((item, index) => {
                                        return (
                                            <div className="mb-3" key={index}>
                                                <TodoItem
                                                    todo={item}
                                                    serial={index + 1}
                                                    setShow={() => {
                                                        setTodo(item)
                                                        setShowUpdateFormModal(true);
                                                    }}
                                                />
                                            </div>
                                        )
                                    })}
                                    <Col md={12} className="mb-3">
                                        <AddNewButton handleClick={() => {
                                            setShowFormModal(true)
                                        }} />
                                    </Col>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>

                <DefaultModal
                    title="Add Todo"
                    show={showFormModal}
                    handleClose={() => {
                        setShowFormModal(false)
                    }}>

                    <TodoForm
                        dueDate={{
                            min: moment().format(),
                            max: moment().format(),
                        }}
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
                        dueDate={{
                            min: moment().format(),
                            max: moment().format(),
                        }}
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