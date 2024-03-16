import FrontLayout from "../../layouts/FrontLayout";
import {Card, Col, Row} from "react-bootstrap";
import TodoItem from "../../components/todo/TodoItem";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import FormModal from "../../components/FormModal";
import TodoAdd from "../todo/TodoAdd";
import useTodoStore from "../../stores/todoStore";
import {getAllTodo} from "../../repository/todoRepository";

const HomeIndex = () => {

    const {addAllTodoToStore, getAllTodoFromStore} = useTodoStore();

    useEffect(() => {
        addAllTodoToStore(getAllTodo())
    }, []);

    const todos = getAllTodoFromStore();

    const [showFormModal, setShowFormModal] = useState(false);

    return (
        <FrontLayout>
            <>
                <Row>
                    {todos.map((todo, index) => {
                        return (
                            <Col md={6} className="mb-3" key={index}>
                                <TodoItem todo={todo} serial={index + 1}/>
                            </Col>
                        )
                    })}

                    <Col md={6} className="mb-3">
                        <Card className={`shadow-sm min-height-170 cursor-pointer bg-dark-subtle`}
                              onClick={() => setShowFormModal(true)}
                        >
                            <Card.Body className="add-new-card">
                                <div className={`font-size-72`}>
                                    <FontAwesomeIcon icon={faPlusSquare}></FontAwesomeIcon>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <FormModal
                    title="Add Todo"
                    show={showFormModal}
                    handleClose={() => {
                        setShowFormModal(false)
                    }}>

                    <TodoAdd/>
                </FormModal>

            </>
        </FrontLayout>
    );
};

export default HomeIndex;