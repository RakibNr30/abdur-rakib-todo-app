import Form from "react-bootstrap/Form";
import {useEffect, useRef} from "react";

const TextareaField = ({fieldName, fieldLabel = "", rows = 3, defaultValue, handler, resetCounter}) => {
    const textarea = useRef(null);

    useEffect(() => {
        if (textarea && textarea.current) {
            textarea.current.value = defaultValue ? defaultValue : "";
        }
    }, [resetCounter]);

    return (
        <Form.Group className="mb-3">
            <Form.Label>{fieldLabel}</Form.Label>
            <Form.Control
                as="textarea" rows={rows}
                ref={textarea}
                id={fieldName}
                name={fieldName}
                placeholder={`Enter ${fieldLabel.toLowerCase()}`}
                onChange={handler}
            />
        </Form.Group>
    )
}

export default TextareaField;