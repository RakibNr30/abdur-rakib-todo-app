import {Badge, Card} from "react-bootstrap";
import TodoStatus from "../../constants/todoStatus";
import TodoPriority from "../../constants/todoPriority";
import RemainingTime from "../RemainingTime";
import moment from "moment";

const TodoItem = ({todo, showStatus = true, showPriority = true, showTimer = true, showDate = false, setShow}) => {
    return (
        <>
            <Card
                className={`shadow-sm border-${TodoStatus.getColor(parseInt(todo.status))}-left-5 item-card cursor-pointer`}
                onClick={setShow}
            >
                <Card.Body>
                    <div className="mb-2">
                        {showStatus &&
                            <Badge bg={TodoStatus.getColor(parseInt(todo.status))}
                                   className="badge-title">{TodoStatus.getLabel(parseInt(todo.status))}</Badge>
                        }
                        {showPriority &&
                            <Badge bg={TodoPriority.getColor(parseInt(todo.priority))}
                                   className="ms-1 badge-title">{TodoPriority.getLabel(parseInt(todo.priority))} Priority</Badge>
                        }
                        {showDate &&
                            <Badge bg="danger"
                                   className="ms-1 badge-title">{moment(todo.end_time).format("DD MMM YYYY")}</Badge>
                        }
                        {showTimer &&
                            <RemainingTime targetTime={todo.end_time}/>
                        }
                    </div>
                    <Card.Title
                        className="item-title">{todo.title}</Card.Title>
                    <Card.Text>
                        {todo.details}
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}

export default TodoItem;