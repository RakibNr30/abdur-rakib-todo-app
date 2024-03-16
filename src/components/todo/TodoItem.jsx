import {Badge, Card} from "react-bootstrap";
import TodoStatus from "../../constants/TodoStatus";
import TodoPriority from "../../constants/TodoPriority";
import RemainingTime from "../RemainingTime";
import {useState} from "react";
import TodoForm from "../../pages/todo/TodoForm";
import DefaultModal from "../DefaultModal";
import useTodoStore from "../../stores/todoStore";

const TodoItem = ({todo, serial}) => {
    const [showFormModal, setShowFormModal] = useState(false);
    const {addAllTodoToStore, getAllTodoFromStore} = useTodoStore();

    let todos = getAllTodoFromStore();

    const handleUpdate = (todo) => {
        todos = todos.map((item) => {
            if (item.id === todo.id) {
                item = todo;
            }
            return item;
        });

        addAllTodoToStore(todos);
    }

    return (
        <>
            <Card
                className={`shadow-sm border-${TodoStatus.getColor(parseInt(todo.status))}-left-5 min-height-170 cursor-pointer`}
                onClick={() => setShowFormModal(true)}
            >
                <Card.Body>
                    <div className={`mb-3`}>Todo #{serial}</div>
                    <Card.Title>{todo.title.length > 50 ? (todo.title.substring(0, 50) + "...") : todo.title}</Card.Title>
                    <Card.Text>
                        {todo.details.length > 50 ? (todo.details.substring(0, 50) + "...") : todo.details}
                    </Card.Text>
                    <div>
                        <Badge bg={TodoStatus.getColor(parseInt(todo.status))}>{TodoStatus.getLabel(parseInt(todo.status))}</Badge>
                        <Badge bg={TodoPriority.getColor(parseInt(todo.priority))} className="ms-1">{TodoPriority.getLabel(parseInt(todo.priority))} Priority</Badge>
                        <RemainingTime targetTime={todo.end_time} />
                    </div>
                </Card.Body>
            </Card>

            <DefaultModal
                title="Edit Todo"
                show={showFormModal}
                handleClose={() => {
                    setShowFormModal(false)
                }}>

                <TodoForm
                    defaultTodo={todo}
                    buttonLabel="Update"
                    handle={handleUpdate}
                    isUpdated={true}
                />
            </DefaultModal>
        </>
    )
}

export default TodoItem;