import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowUp, faArrowDown} from '@fortawesome/free-solid-svg-icons';
import {DIRECTION} from '../constants/sorts';

const SortButton = ({onField, field, direction, handleSort}) => {
    const isAscending = onField === field && direction === DIRECTION.ASC;
    const isDescending = onField === field && direction === DIRECTION.DESC;

    return (<>
            {handleSort ? <span className="ms-2" onClick={() => handleSort(field)}>
                    <FontAwesomeIcon
                        icon={faArrowUp}
                        className={`cursor-pointer ${isAscending ? '' : 'text-secondary'}`}
                    />
                    <FontAwesomeIcon
                        icon={faArrowDown}
                        className={`cursor-pointer ${isDescending ? '' : 'text-secondary'}`}
                    />
                </span> : <span className="ms-2">
                <FontAwesomeIcon
                    icon={faArrowUp}
                    className={`cursor-pointer ${isAscending ? '' : 'text-secondary'}`}
                />
                <FontAwesomeIcon
                    icon={faArrowDown}
                    className={`cursor-pointer ${isDescending ? '' : 'text-secondary'}`}
                />
        </span>}
        </>);
};

export default SortButton;
