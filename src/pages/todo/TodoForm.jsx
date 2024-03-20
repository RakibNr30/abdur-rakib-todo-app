import Form from "react-bootstrap/Form";
import TodoPriority from "../../constants/todoPriority";
import TodoStatus from "../../constants/todoStatus";
import Button from "react-bootstrap/Button";
import {FormGroup} from "react-bootstrap";
import {useEffect, useState} from "react";
import InputField from "../../components/form/InputField";
import TextareaField from "../../components/form/TextareaField";
import SelectField from "../../components/form/SelectField";
import DateField from "../../components/form/DateField";
import moment from "moment";
import {FORMAT} from "../../constants/dates";

const TodoForm = ({defaultTodo = {}, todoFor = "upcoming", buttonLabel, setShowFormModal, handle, isUpdate = false}) => {

    const [todo, setTodo] = useState({});
    const [resetCounter, setResetCounter] = useState(0);

    useEffect(() => {
        reset();
    }, []);

    const reset = () => {
        setTodo(defaultTodo);
        setResetCounter(resetCounter + 1);
    }

    let start = null;
    let end = null;

    switch (todoFor) {
        case "upcoming":
            start = moment().format(FORMAT.LOCAL);
            break;
        case "today":
            start = moment().format(FORMAT.LOCAL);
            end = moment().endOf("day").format(FORMAT.LOCAL);
            break;
        default:
            break;
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
                setTodo({...todo, priority: parseInt(e.target.value)})
                break;
            case "status":
                setTodo({...todo, status: parseInt(e.target.value)})
                break;
            case "end_time":
                setTodo({...todo, end_time: e.target.value})
                break;
            default:
                break;
        }
    }

    return (
        <Form>
            <InputField
                fieldName="title"
                fieldLabel="Title"
                defaultValue={todo.title}
                handler={onChangeHandler}
                resetCounter={resetCounter}/>
            <TextareaField
                fieldName="details"
                fieldLabel="Details"
                defaultValue={todo.details}
                handler={onChangeHandler}
                resetCounter={resetCounter}/>
            <SelectField
                fieldName="priority"
                fieldLabel="Priority"
                options={TodoPriority.getAll()}
                defaultValue={todo.priority}
                handler={onChangeHandler}
                resetCounter={resetCounter}/>
            <SelectField
                fieldName="status"
                fieldLabel="Status"
                options={TodoStatus.getAll()}
                defaultValue={todo.status}
                handler={onChangeHandler}
                resetCounter={resetCounter}/>
            <DateField
                fieldName="end_time"
                fieldLabel="End Time"
                fieldType="datetime-local"
                defaultValue={todo.end_time}
                min={start}
                max={end}
                handler={onChangeHandler}
                resetCounter={resetCounter}/>
            <FormGroup className="float-end">
                <Button variant="secondary" onClick={reset}>
                    Clear
                </Button>
                <Button variant="primary" className="ms-2" onClick={() => {
                    handle(todo);
                    if (!isUpdate) {
                        reset();
                        setShowFormModal(false);
                    }
                }}>
                    {buttonLabel}
                </Button>
            </FormGroup>
        </Form>
    )
}

export default TodoForm;