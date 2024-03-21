import FrontLayout from "../../layouts/FrontLayout";
import {Col, Row} from "react-bootstrap";
import TodoItem from "../../components/todo/TodoItem";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import moment from "moment";
import TodoService from "../../services/TodoService";

const TodoExpired = () => {
    const todoService = TodoService();

    const [todos, setTodos] = useState([]);

    useEffect(() => {
        setTodos(todoService.findAllOverdueUntilDate(moment()));
    }, []);

    return (
        <FrontLayout>
            <>
                <div className="breadcrumb d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">
                        Today
                        <span className="d-block mt-1"><FontAwesomeIcon icon={faCheckCircle} /> {`${todos.length} tasks`}</span>
                    </h1>
                </div>

                <Row>
                    {todos.map((item, index) => {
                        return (
                            <Col lg={3} md={4} sm={6} className="mb-3" key={index}>
                                <TodoItem
                                    todo={item}
                                    serial={index + 1}
                                    showTimer={false}
                                    showDate={true}
                                />
                            </Col>
                        )
                    })}
                </Row>
            </>
        </FrontLayout>
    );
};

export default TodoExpired;