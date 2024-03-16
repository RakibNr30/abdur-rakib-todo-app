import FrontLayout from "../../layouts/FrontLayout";
import {ButtonGroup, Table} from "react-bootstrap";
import {todos} from "../../data/mock";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faPencil, faTrash} from "@fortawesome/free-solid-svg-icons";
import TodoStatus from "../../constants/TodoStatus";
import useTodoStore from "../../stores/todoStore";
import {useEffect} from "react";
import {getAllTodo} from "../../repository/todoRepository";
import TodoPriority from "../../constants/TodoPriority";

export default () => {

    const {addAllTodoToStore, getAllTodoFromStore} = useTodoStore();

    useEffect(() => {
        addAllTodoToStore(getAllTodo())
    }, []);

    const todos = getAllTodoFromStore();

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
                                        <Button variant="outline-primary">
                                            <FontAwesomeIcon icon={faPencil}/>
                                        </Button>
                                        <Button variant="outline-danger">
                                            <FontAwesomeIcon icon={faTrash}/>
                                        </Button>
                                    </ButtonGroup>
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
        </FrontLayout>
    );
};
