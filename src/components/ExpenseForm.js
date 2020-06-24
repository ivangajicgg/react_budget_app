import React from 'react';
import {MdSend, MdEdit} from 'react-icons/md';

const ExpenseForm = ({
    charge,
    ammount,
    handleCharge,
    handleAmmount,
    handleSubmit,
    edit
}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-center">
                <div className="form-group">
                    <label htmlFor="charge">charge</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="charge" 
                        name="charge"
                        placeholder="e.g. rent"
                        value={charge}
                        onChange={handleCharge}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="ammount">ammount</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        id="ammount" 
                        name="ammount"
                        placeholder="e.g. 100"
                        value={ammount}
                        onChange={handleAmmount}
                    />
                </div>
            </div>
            <button type="submit" className="btn btn-sub-edit">
                {edit ? 'edit' : 'submit'}
                <MdSend className="btn-icon"/>
            </button>
        </form>
    )
}

export default ExpenseForm