import {Badge, Card} from "react-bootstrap";
import TodoStatus from "../../constants/todoStatus";
import TodoPriority from "../../constants/todoPriority";
import RemainingTime from "../RemainingTime";
import moment from "moment";

const TodoItem = ({todo, serial, showStatus = true, showPriority = true, showTimer = true, showDate = false, setShow}) => {
    return (
        <>
            <Card
                className={`shadow-sm border-${TodoStatus.getColor(parseInt(todo.status))}-left-5 min-height-170 cursor-pointer`}
                onClick={setShow}
            >
                <Card.Body>
                    <div className={`mb-3`}>Todo #{serial}</div>
                    <Card.Title className="item-title">{todo.title.length > 50 ? (todo.title.substring(0, 50) + "...") : todo.title}</Card.Title>
                    <Card.Text>
                        {todo.details.length > 50 ? (todo.details.substring(0, 50) + "...") : todo.details}
                    </Card.Text>
                    <div>
                        {showStatus &&
                            <Badge bg={TodoStatus.getColor(parseInt(todo.status))} className="badge-title">{TodoStatus.getLabel(parseInt(todo.status))}</Badge>
                        }
                        {showPriority &&
                            <Badge bg={TodoPriority.getColor(parseInt(todo.priority))} className="ms-1 badge-title">{TodoPriority.getLabel(parseInt(todo.priority))} Priority</Badge>
                        }
                        {showDate &&
                            <Badge bg="danger" className="ms-1 badge-title">{moment(todo.end_time).format("DD MMM YYYY")}</Badge>
                        }
                        {showTimer &&
                            <RemainingTime targetTime={todo.end_time} />
                        }
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}

export default TodoItem;