import FrontLayout from "../../layouts/FrontLayout";
import {Col, Row} from "react-bootstrap";
import TodoItem from "../../components/todo/TodoItem";
import {todos} from "../../data/mock";

export default () => {
  return (
    <FrontLayout>
        <>
            <Row>
                {todos.map((todo, index) => {
                    return (
                        <Col md={4} className="mb-3" key={index}>
                            <TodoItem todo={todo} serial={index + 1} />
                        </Col>
                    )
                })}
            </Row>
        </>
    </FrontLayout>
  );
};
