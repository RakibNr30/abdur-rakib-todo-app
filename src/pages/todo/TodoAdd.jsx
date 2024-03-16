import Form from "react-bootstrap/Form";
import TodoPriority from "../../constants/TodoPriority";
import TodoStatus from "../../constants/TodoStatus";
import Button from "react-bootstrap/Button";
import {FormGroup} from "react-bootstrap";
import {useEffect, useState} from "react";
import {uid} from "uid"
import InputField from "../../components/form/InputField";
import TextareaField from "../../components/form/TextareaField";
import SelectField from "../../components/form/SelectField";
import useTodoStore from "../../stores/todoStore";

const TodoAdd = () => {

    const {addTodoToStore} = useTodoStore();
    const [todo, setTodo] = useState({});
    const [resetCounter, setResetCounter] = useState(0);

    useEffect(() => {
        reset();
    }, []);

    const reset = () => {
        setTodo({
            id: uid(),
            title: "",
            details: "",
            priority: 1,
            status: 1,
            end_time: new Date().toISOString(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        });
        setResetCounter(resetCounter + 1);
    }

    const onChangeHandler = (e) => {
        switch (e.target.name) {
            case "title":
                setTodo({...todo, title: e.target.value});
                break;
            case "details":
                setTodo({...todo, details: e.target.value})
                break;
            case "priority":
                setTodo({...todo, priority: e.target.value})
                break;
            case "status":
                setTodo({...todo, status: e.target.value})
                break;
            case "end_time":
                setTodo({...todo, end_time: e.target.value})
                break;
            default:
                break;
        }
    }

    const handleSubmit = (e) => {
        addTodoToStore(todo);
        reset();
    }

    return (
        <Form>
            <InputField
                fieldName="title"
                fieldLabel="Title"
                handler={onChangeHandler}
                resetCounter={resetCounter}/>
            <TextareaField
                fieldName="details"
                fieldLabel="Details"
                handler={onChangeHandler}
                resetCounter={resetCounter}/>
            <SelectField
                fieldName="priority"
                fieldLabel="Priority"
                options={TodoPriority.getAll()}
                handler={onChangeHandler}
                defaultValue={todo.priority}
                resetCounter={resetCounter}/>
            <SelectField
                fieldName="status"
                fieldLabel="Status"
                options={TodoStatus.getAll()}
                defaultValue={todo.status}
                handler={onChangeHandler}
                resetCounter={resetCounter}/>
            <InputField
                fieldName="end_time"
                fieldLabel="End Time"
                fieldType="datetime-local"
                handler={onChangeHandler}
                resetCounter={resetCounter}/>

            <FormGroup className="float-end">
                <Button variant="secondary" onClick={reset}>
                    Clear
                </Button>
                <Button variant="primary" className="ms-2" onClick={handleSubmit}>
                    Add
                </Button>
            </FormGroup>
        </Form>
    )
}

export default TodoAdd;