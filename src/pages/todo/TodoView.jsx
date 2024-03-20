import FrontLayout from "../../layouts/FrontLayout";
import TodoService from "../../services/TodoService";
import {Link, useParams} from "react-router-dom";
import {Card, CardText, ListGroup} from "react-bootstrap";
import Error404 from "../error/Error404";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList} from "@fortawesome/free-solid-svg-icons";


const TodoView = () => {
    const  todoService = TodoService();

    const {id} = useParams();
    const todo = todoService.getTodo(id);

    if (!todo) {
        return <Error404 />
    }

    return (<FrontLayout>
        <div
            className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Todo</h1>
            <div className="btn-toolbar mb-2 mb-md-0">
                <Link to="/todo" className="btn btn-sm btn-outline-secondary">
                    <FontAwesomeIcon icon={faList} className="me-1" /> Todo List
                </Link>
            </div>
        </div>

        <div className="mt-5 mb-5">
            <Card>
                <ListGroup variant="flush">
                    {Object.entries(todo).map(([key, value]) => {
                        return (
                            <ListGroup.Item>
                                <strong className="d-block">{key.replace(/_/g, ' ').toUpperCase()}</strong>
                                <CardText>{value}</CardText>
                            </ListGroup.Item>
                        )
                    })}
                </ListGroup>
            </Card>
        </div>

    </FrontLayout>);
};

export default TodoView;