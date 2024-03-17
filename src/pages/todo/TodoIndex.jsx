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

export default () => {

    const {addAllTodoToStore, getAllTodoFromStore} = useTodoStore();
    const [showDeleteItemModal, setShowDeleteItemModal] = useState(false);
    const [todoId, setTodoId] = useState();
    const [showToast, setShowToast] = useState(false);

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

    return (
        <FrontLayout>
            <div className="mt-5 mb-5">
                <Table striped bordered responsive className="w-100">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>End Time</th>
                        <th>Created At</th>
                        <th>Updated At</th>
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
                                        <Button variant="outline-secondary">
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
