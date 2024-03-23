import FrontLayout from "../../layouts/FrontLayout";
import {Col, Row} from "react-bootstrap";
import TodoItem from "../../components/todo/TodoItem";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import DefaultModal from "../../components/DefaultModal";
import TodoForm from "../todo/TodoForm";
import Todo from "../../models/Todo";
import DefaultToast from "../../components/DefaultToast";
import moment from "moment";
import TodoService from "../../services/TodoService";
import todoStatus from "../../constants/todoStatus";
import {DIRECTION} from "../../constants/sorts";
import ToolbarDropdown from "../../components/ToolbarDropdown";

const TodoCompleted = () => {
    const todoService = TodoService();

    const [showFormModal, setShowFormModal] = useState(false);
    const [showUpdateFormModal, setShowUpdateFormModal] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [showUpdateToast, setShowUpdateToast] = useState(false);
    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState({});
    const [sortField, setSortField] = useState();
    const [sortDirection, setSortDirection] = useState(DIRECTION.ASC);

    useEffect(() => {
        setTodos(todoService.findAllByStatus(todoStatus.completed));
    }, []);

    const handleUpdate = (todo) => {
        todoService.update(todo);
        setTodos(todoService.findAllByStatus(todoStatus.completed));
        setShowUpdateToast(true);
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
                        Completed
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

                <div className="content-scrolling">
                    <Row className="m-0">
                        {todos.map((item, index) => {
                            return (
                                <Col lg={3} md={4} sm={6} className="mb-3" key={index}>
                                    <TodoItem
                                        todo={item}
                                        serial={index + 1}
                                        showTimer={false}
                                        showStatus={false}
                                        showDate={true}
                                        setShow={() => {
                                            setTodo(item)
                                            setShowUpdateFormModal(true);
                                        }}
                                    />
                                </Col>
                            )
                        })}
                        {todos.length < 1 &&
                            <Col md={12} className="p-0">Not completed todo found.</Col>
                        }
                    </Row>
                </div>

                <DefaultModal
                    title="Edit Todo"
                    show={showUpdateFormModal}
                    handleClose={() => {
                        setShowUpdateFormModal(false)
                    }}>

                    <TodoForm
                        defaultTodo={todo}
                        buttonLabel="Update"
                        handle={handleUpdate}
                        isUpdate={true}
                    />
                </DefaultModal>

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

export default TodoCompleted;