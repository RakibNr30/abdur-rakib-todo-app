import FrontLayout from "../../layouts/FrontLayout";
import {Card, Col, Row} from "react-bootstrap";
import TodoItem from "../../components/todo/TodoItem";
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

const TodoUpcoming = () => {
    const todoService = TodoService();

    const [showFormModal, setShowFormModal] = useState(false);
    const [showUpdateFormModal, setShowUpdateFormModal] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [showUpdateToast, setShowUpdateToast] = useState(false);
    const [upcomingTodos, setUpcomingTodos] = useState([]);
    const [todo, setTodo] = useState({});
    const [dueDate, setDueDate] = useState({min: moment().format()});
    const [sortField, setSortField] = useState();
    const [sortDirection, setSortDirection] = useState(DIRECTION.ASC);

    useEffect(() => {
        setUpcomingTodos(todoService.findAllUpcoming());
    }, []);

    const handleAdd = (todo) => {
        todoService.save(todo);
        setUpcomingTodos(todoService.findAllUpcoming());
        setShowToast(true);
    }

    const handleUpdate = (todo) => {
        todoService.update(todo);
        setUpcomingTodos(todoService.findAllUpcoming());
        setShowUpdateToast(true);
    }

    const handleSort = (field) => {
        const newDirection = field === sortField
            ? (sortDirection === DIRECTION.ASC ? DIRECTION.DESC : DIRECTION.ASC)
            : DIRECTION.ASC;
        setSortField(field);
        setSortDirection(newDirection);

        setUpcomingTodos(todoService.findAllUpcoming(field, newDirection));
    }

    return (
        <FrontLayout>
            <>
                <div
                    className="breadcrumb d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">
                        Upcoming
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
                    {upcomingTodos.map(({date, todos}, dateIndex) => {
                        return (
                            <div className="list-scrolling-items min-width-320 mb-3" key={dateIndex}>
                                <Row className="m-0 p-0">
                                <Col md={12} className="mb-3">
                                        <h5 className="date-title">{moment(date).format("DD MMM")} - {dayLabel(date)} ({todos.length})</h5>
                                    </Col>
                                    <Col md={12}>
                                        {todos.map((item, index) => {
                                            return (
                                                <div className="list-items mb-3"  key={index}>
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
                                    </Col>
                                    <Col md={12} className="mb-3">
                                        <AddNewButton handleClick={() => {
                                            setDueDate({min: date, max: date})
                                            setShowFormModal(true)
                                        }} />
                                    </Col>
                                </Row>
                            </div>
                        )
                    })}
                </div>

                <DefaultModal
                    title="Add Todo"
                    show={showFormModal}
                    handleClose={() => {
                        setShowFormModal(false)
                    }}>

                    <TodoForm
                        dueDate={dueDate}
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
                        dueDate={dueDate}
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

export default TodoUpcoming;