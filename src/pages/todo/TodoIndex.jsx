import FrontLayout from "../../layouts/FrontLayout";
import {ButtonGroup, Col, Row, Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faTrash} from "@fortawesome/free-solid-svg-icons";
import TodoStatus from "../../constants/todoStatus";
import {useEffect, useState} from "react";
import TodoPriority from "../../constants/todoPriority";
import DefaultModal from "../../components/DefaultModal";
import DefaultToast from "../../components/DefaultToast";
import {DIRECTION} from "../../constants/sorts";
import SortButton from "../../components/SortButton";
import {Link} from "react-router-dom";
import Form from "react-bootstrap/Form";
import TodoService from "../../services/TodoService";

const tableHeaders = [
    {field: 'id', label: 'ID'},
    {field: 'title', label: 'Title'},
    {field: 'priority', label: 'Priority'},
    {field: 'status', label: 'Status'},
    {field: 'end_time', label: 'End Time'},
    {field: 'created_at', label: 'Created At'},
    {field: 'updated_at', label: 'Updated At'}
];

const TodoIndex = () => {
    const todoService = TodoService();

    const [showDeleteItemModal, setShowDeleteItemModal] = useState(false);
    const [todoId, setTodoId] = useState();
    const [showToast, setShowToast] = useState(false);
    const [sortField, setSortField] = useState();
    const [sortDirection, setSortDirection] = useState(DIRECTION.ASC);
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        setTodos(todoService.findAll());
    }, []);

    const handleDelete = (id) => {
        todoService.destroy(id);
        setTodos(todoService.findAll());
        setShowToast(true);
    }

    const handleSort = (field) => {
        const newDirection = field === sortField
            ? (sortDirection === DIRECTION.ASC ? DIRECTION.DESC : DIRECTION.ASC)
            : DIRECTION.ASC;
        setSortField(field);
        setSortDirection(newDirection);

        setTodos(todoService.sort(field, newDirection));
    }

    const handleSearch = (e) => {
        setTodos(todoService.search(e.target.value.trim()));
    }

    return (
        <FrontLayout>
            <div
                className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Todo</h1>
            </div>

            <Row className="mb-3">
                <Col md={6}>

                </Col>
                <Col md={6}>
                    <Form.Control className=""
                                  id="search_keyword"
                                  type="text"
                                  placeholder="Enter search keyword..."
                                  onChange={handleSearch}
                    />
                </Col>
            </Row>

            <div className="content-scrolling">
                <div>
                    <Table striped bordered responsive className="w-100">
                        <thead>
                        <tr>
                            {tableHeaders.map(header => (
                                <th key={header.field}>
                                    {header.label}
                                    <SortButton
                                        onField={header.field}
                                        field={sortField}
                                        direction={sortDirection}
                                        handleSort={() => handleSort(header.field)}
                                    />
                                </th>
                            ))}
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {todos.length ? todos.map((todo, index) => {
                            return (
                                <tr key={index}>
                                    <td>{todo.id}</td>
                                    <td>{todo.title}</td>
                                    <td className={`text-${TodoPriority.getColor(parseInt(todo.priority))}`}>{TodoPriority.getLabel(parseInt(todo.priority))}</td>
                                    <td className={`text-${TodoStatus.getColor(parseInt(todo.status))}`}>{TodoStatus.getLabel(parseInt(todo.status))}</td>
                                    <td>{todo.end_time}</td>
                                    <td>{todo.created_at}</td>
                                    <td>{todo.updated_at}</td>
                                    <td>
                                        <ButtonGroup>
                                            <Button as={Link} to={`/todo/${todo.id}`} variant="outline-secondary">
                                                <FontAwesomeIcon icon={faEye}/>
                                            </Button>
                                            <Button variant="outline-danger" onClick={() => {
                                                setShowDeleteItemModal(true);
                                                setTodoId(todo.id);
                                            }}>
                                                <FontAwesomeIcon icon={faTrash}/>
                                            </Button>
                                        </ButtonGroup>

                                        <DefaultModal
                                            title="Delete Todo"
                                            show={showDeleteItemModal}
                                            handleClose={() => {
                                                setShowDeleteItemModal(false)
                                            }}>
                                            <div>
                                                Are you sure want to delete this item?
                                            </div>
                                            <div>
                                                <Button variant="danger" className="mt-3 float-end" onClick={() => {
                                                    handleDelete(todoId);
                                                    setShowDeleteItemModal(false)
                                                }}>
                                                    Yes
                                                </Button>
                                            </div>
                                        </DefaultModal>
                                    </td>
                                </tr>
                            )
                        }) : (
                            <tr>
                                <td colSpan={8} className="text-center">No todo available.</td>
                            </tr>
                        )
                        }
                        </tbody>
                    </Table>
                </div>
            </div>

            <DefaultToast
                show={showToast}
                setShow={setShowToast}
                variant={"success"}
                title="Success!"
                body="Todo deleted successfully."
            />
        </FrontLayout>
    );
};

export default TodoIndex;