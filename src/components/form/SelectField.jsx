import Form from "react-bootstrap/Form";
import {useEffect, useRef} from "react";

const SelectField = ({fieldName, fieldLabel = "", options = [], defaultValue, handler, resetCounter}) => {
    const select = useRef(null);

    useEffect(() => {
        if (select && select.current) {
            select.current.value = defaultValue;
        }
    }, [resetCounter]);

    return (
        <Form.Group className="mb-3">
            <Form.Label>{fieldLabel}</Form.Label>
            <Form.Select
                ref={select}
                id={fieldName}
                name={fieldName}
                onChange={handler}
            >
                <option>Select {fieldLabel}</option>
                {options.map((item, index) => {
                    return <option value={item.value} key={index}>{item.label}</option>
                })}
            </Form.Select>
        </Form.Group>
    )
}

export default SelectField;