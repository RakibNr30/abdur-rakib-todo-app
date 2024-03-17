import FrontLayout from "../../layouts/FrontLayout";
import {RedirectFunction} from "react-router-dom";
import {getTodo} from "../../repository/todoRepository";
import {useParams} from "react-router-dom";
import {Card, CardText, ListGroup} from "react-bootstrap";
import Error404 from "../error/Error404";


const TodoView = () => {
    const {id} = useParams();

    const todo = getTodo(id);

    if (!todo) {
        return <Error404 />
    }

    return (<FrontLayout>
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