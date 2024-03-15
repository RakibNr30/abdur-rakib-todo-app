import {Card} from "react-bootstrap";

export default ({todo, serial}) => {
    return (
        <Card border="primary">
            <Card.Header>Todo #{serial}</Card.Header>
            <Card.Body>
                <Card.Title>{todo.title}</Card.Title>
                <Card.Text>
                    {todo.details.length > 50 ? (todo.details.substring(0, 50) + "...") : todo.length}
                </Card.Text>
            </Card.Body>
            <Card.Footer>

            </Card.Footer>
        </Card>
    )
}