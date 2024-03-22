import React from 'react';
import {Dropdown} from "react-bootstrap";
import SortButton from "./SortButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown, faArrowUp} from "@fortawesome/free-solid-svg-icons";

const ToolbarDropdown = ({model = {}, field, direction, handleSort}) => {
    return (
        <>
            <Dropdown>
                <Dropdown.Toggle variant="outline-danger">

                    <FontAwesomeIcon
                        icon={faArrowUp}
                    />
                    <FontAwesomeIcon
                        icon={faArrowDown}
                    />
                </Dropdown.Toggle>

                <Dropdown.Menu className="sort-by-dropdown">
                    {Object.entries(model).map(([key, value]) => {
                        return (
                            <div onClick={() => handleSort(key)} className="sort-by-list" key={key}>
                            <span>
                                {key.replace(/_/g, ' ').toUpperCase()}
                            </span>
                                <span>
                            <SortButton
                                onField={key}
                                field={field}
                                direction={direction}
                            />
                        </span>
                            </div>)
                    })}
                </Dropdown.Menu>
            </Dropdown>
        </>)
}

export default ToolbarDropdown;
