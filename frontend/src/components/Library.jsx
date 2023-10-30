import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Library = () => {
    return (
        <div>
            <div className='header-library'>
                <h1>Your Library</h1>
                <button><FontAwesomeIcon icon={faPlus} /></button>
                <button><FontAwesomeIcon icon={faArrowLeft} /></button>
            </div>
        </div>
    );
};

export default Library;