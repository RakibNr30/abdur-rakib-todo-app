import Form from "react-bootstrap/Form";
import {useEffect, useRef} from "react";

const InputField = ({fieldName, fieldLabel = "", fieldType = "text", defaultValue, handler, resetCounter}) => {
    const input = useRef(null);

    useEffect(() => {
        if (input && input.current) {
            input.current.value = defaultValue ? defaultValue : "";
        }
    }, [resetCounter]);

    return (
        <Form.Group className="mb-3">
            <Form.Label>{fieldLabel}</Form.Label>
            <Form.Control
                ref={input}
                id={fieldName}
                name={fieldName}
                type={fieldType}
                placeholder={`Enter ${fieldLabel.toLowerCase()}`}
                onChange={handler}
            />
        </Form.Group>
    )
}

export default InputField;