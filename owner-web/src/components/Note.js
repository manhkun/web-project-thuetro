import React from 'react';
import './Note.css';

export const Note = (props) => {
    return (
        <div className="note">
            {props.children}
        </div>
    )
}
