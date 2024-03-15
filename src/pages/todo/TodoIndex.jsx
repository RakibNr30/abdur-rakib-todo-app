import FrontLayout from "../../layouts/FrontLayout";
import {ButtonGroup, Table} from "react-bootstrap";
import {todos} from "../../data/mock";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faPencil, faTrash} from "@fortawesome/free-solid-svg-icons";
import TodoStatus from "../../constants/TodoStatus";

export default () => {
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
                    <th>Due Time</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {todos.map((todo, index) => {
                    return (
                        <tr key={index}>
                            <td>{todo.id}</td>
                            <td>{todo.title}</td>
                            <td>{todo.priority}</td>
                            <td className={`text-${TodoStatus.getColor(todo.status)}`}>{TodoStatus.getLabel(todo.status)}</td>
                            <td>{todo.due_time}</td>
                            <td>{todo.created_at}</td>
                            <td>{todo.updated_at}</td>
                            <td>
                                <ButtonGroup aria-label="Basic example">
                                    <Button variant="outline-secondary">
                                        <FontAwesomeIcon icon={faEye} />
                                    </Button>
                                    <Button variant="outline-primary">
                                        <FontAwesomeIcon icon={faPencil} />
                                    </Button>
                                    <Button variant="outline-danger">
                                        <FontAwesomeIcon icon={faTrash} />
                                    </Button>
                                </ButtonGroup>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>
        </div>
    </FrontLayout>
  );
};
