import React from 'react'
import {MdEdit, MdDelete} from 'react-icons/md';

const ExpenseItem = ({
    expense: {id, charge, ammount},
    handleDelete,
    handleEdit
}) => {
    return (
        <li className="item">
            <div className="info">
                <span className="expense">{charge}</span>
                <span className="amount">{ammount}</span>
            </div>
            <button 
                className="edit-btn" 
                aria-label="edit button"
                onClick={() => handleEdit(id)}
            >
                <MdEdit />
            </button>
            <button 
                className="clear-btn" 
                aria-label="delete button"
                onClick={() => handleDelete(id)}
            >
                <MdDelete />
            </button>
        </li>
    )
}

export default ExpenseItem