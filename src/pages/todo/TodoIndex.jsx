import FrontLayout from "../../layouts/FrontLayout";
import {ButtonGroup, Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faTrash} from "@fortawesome/free-solid-svg-icons";
import TodoStatus from "../../constants/todoStatus";
import useTodoStore from "../../stores/todoStore";
import {useEffect, useState} from "react";
import {getAllTodo} from "../../repository/todoRepository";
import TodoPriority from "../../constants/todoPriority";
import DefaultModal from "../../components/DefaultModal";
import DefaultToast from "../../components/DefaultToast";
import {DIRECTION} from "../../constants/sorts";
import SortDirection from "../../components/SortDirection";
import {Link} from "react-router-dom";

const tableHeaders = [
    { field: 'id', label: 'ID' },
    { field: 'title', label: 'Title' },
    { field: 'priority', label: 'Priority' },
    { field: 'status', label: 'Status' },
    { field: 'end_time', label: 'End Time' },
    { field: 'created_at', label: 'Created At' },
    { field: 'updated_at', label: 'Updated At' }
];

const TodoIndex = () => {

    const {addAllTodoToStore, getAllTodoFromStore, sortTodos} = useTodoStore();
    const [showDeleteItemModal, setShowDeleteItemModal] = useState(false);
    const [todoId, setTodoId] = useState();
    const [showToast, setShowToast] = useState(false);
    const [sortField, setSortField] = useState();
    const [sortDirection, setSortDirection] = useState(DIRECTION.ASC);

    useEffect(() => {
        addAllTodoToStore(getAllTodo())
    }, []);

    let todos = getAllTodoFromStore();

    const handleDelete = (id) => {
        todos = todos.filter((item) => {
            return item.id !== id;
        });

        addAllTodoToStore(todos);
        setShowToast(true);
    }

    const handleSort = (field) => {
        const newDirection = field === sortField
            ? (sortDirection === DIRECTION.ASC ? DIRECTION.DESC : DIRECTION.ASC)
            : DIRECTION.ASC;
        setSortField(field);
        setSortDirection(newDirection);
        sortTodos(field, newDirection);
    }

    return (
        <FrontLayout>
            <div className="mt-5 mb-5">
                <Table striped bordered responsive className="w-100">
                    <thead>
                    <tr>
                        {tableHeaders.map(header => (
                            <th key={header.field}>
                                {header.label}
                                <SortDirection
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