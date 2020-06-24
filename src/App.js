import React, {Fragment, useState, useEffect} from 'react';
import './App.css';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Alert from './components/Alert';
import uuid from 'uuid/v4';

const initialExpenses = localStorage.getItem("expenses")
  ? JSON.parse(localStorage.getItem("expenses"))
  : [];


function App() {
    // All expenses
    const [expenses, setExpenses] = useState(initialExpenses);
    // Single charge
    const [charge, setCharge] = useState('')
    // Single ammount
    const [ammount, setAmmount] = useState('');
    // alert 
    const [alert, setAlert] = useState({show: false});
    // Edit
    const [edit, setEdit] = useState(false);
    // Edit item
    const [id, setId] = useState(0);


/******************useEffect******************/
useEffect(() => {
    console.log("called");

    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

/******************Functionality******************/

    // Charge input
    const handleCharge = e => {
        setCharge(e.target.value);
    }
    // Ammount input
    const handleAmmount = e => {
        setAmmount(e.target.value);
    }

    // Handle submitt
    const handleSubmit = e => {
        e.preventDefault();

        if(charge !== '' && ammount > 0){
            if(edit){
                let tempExpenses = expenses.map(item => {
                    return item.id === id ? {...item, charge, ammount} : item
                })
                setExpenses(tempExpenses);
                setEdit(false);
                handleAlert({type: 'success', text: 'item updated'})
            }else{
                const singleExpense = {id:uuid(), charge, ammount};
                setExpenses([singleExpense, ...expenses]);
                handleAlert({type: 'success', text:'item added'});
            }
            setCharge('');
            setAmmount('');
        }else{
            // alert handler to do
            handleAlert({
                type: 'danger', 
                text:`charge can't be empty and  ammount value has to be bigger than 0`
            });
        }
    }

    // Handle alert
    const handleAlert = ({type, text}) => {
        setAlert({show:true, type, text});
        setTimeout(() => {
            setAlert({show:false})
        },3000)
    }

    // Handle Delete 
    const handleDelete = id => {
        let tempExpenses = expenses.filter(item => item.id !== id);
        setExpenses(tempExpenses);
        setEdit(false);
        setCharge('');
        setAmmount('');
        handleAlert({type: 'danger', text: 'item deleted'});
    }

    // Handle Edit
    const handleEdit = id => {
        let expense = expenses.find(item => item.id === id);
        let {charge, ammount} = expense;
        setCharge(charge);
        setAmmount(ammount);
        setEdit(true);
        setId(id);
    }

    // Clear all expenses
    const clearItems = () => {
        setExpenses([]);
        setEdit(false);
        setCharge('');
        setAmmount('');
        handleAlert({type: 'danger', text: 'all items deleted'});
    }

    return (
        <Fragment>
            {alert.show && <Alert type={alert.type} text={alert.text}/>}
            <h1>Budget Calculation</h1>
            <main className="App">
            <ExpenseForm 
                charge={charge}
                ammount={ammount}
                handleCharge={handleCharge}
                handleAmmount={handleAmmount}
                handleSubmit={handleSubmit}
                edit={edit}
            />
            <ExpenseList 
                expenses={expenses}
                handleDelete={handleDelete}  
                handleEdit={handleEdit}
                clearItems={clearItems}  
            />
            </main>    
            <h1>
                total spending: <span className="total">
                    ${expenses.reduce((total, expense) => {
                        return (total += parseInt(expense.ammount))
                    },0)}
                </span>
            </h1>
        </Fragment>
    )
}

export default App