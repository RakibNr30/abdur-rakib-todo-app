import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCalendarPlus} from '@fortawesome/free-solid-svg-icons';
import {Card} from "react-bootstrap";

const AddNewButton = ({handleClick}) => {

    return (
        <div className={`cursor-pointer add-new`} onClick={handleClick}>
            <div className="add-new-card-2">
                <span className="icon">
                    <svg width="12" height="16">
                    <path fill="currentColor" fillRule="evenodd"
                          d="M6 6V.5a.5.5 0 0 1 1 0V6h5.5a.5.5 0 1 1 0 1H7v5.5a.5.5 0 1 1-1 0V7H.5a.5.5 0 0 1 0-1H6z"></path>
                </svg>
                </span>
                <span className="btn-text">
                    Add New
                </span>
            </div>
        </div>
    );
};

export default AddNewButton;
