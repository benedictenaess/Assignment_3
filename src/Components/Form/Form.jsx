import React, { useState } from 'react';
import styles from './Form.module.css';

function Form() {
	
	const [expenseList, setExpenseList] = useState([]);
	const [expense, setExpense] = useState({title:'', amount:'', date:'', category:''});
	const [errorMsg, setErrorMsg] = useState({})

	const validateInput =(inputTitle, inputAmount, inputDate)=>{
		let isValid = true;
		const clonedErrorMsg = {...errorMsg};
		if(!inputTitle){
			clonedErrorMsg.titleError = 'Title for expenses is required';
			isValid = false;
		} else {
			clonedErrorMsg.titleError = '';
			isValid = true;
		}
		if(!inputAmount){
			clonedErrorMsg.amountError = 'Amount for expenses is required';
			isValid = false;
		} else {
			clonedErrorMsg.amountError = '';
			isValid = true;
		}
		if(!inputDate){
			clonedErrorMsg.dateError = 'Date for expenses is required';
			isValid = false
		} else {
			clonedErrorMsg.dateError = '';
			isValid = true;
		}
		setErrorMsg(clonedErrorMsg);
		return isValid;
	}

	const handleChange =(e)=>{
		const {name, value} = e.target;
		setExpense(prev=>({...prev, [name]:value}));
		console.log(expense);
	}

	const handleSubmit =(e)=>{
		e.preventDefault();
		const isValid = validateInput();
		if (isValid) {
			console.log('Submission successfully completed');
			setExpenseList(prev=>[...prev, expense])
			console.log(expenseList);
		} else {
			console.log('Submission failed. Error');
		}
	}

  return (
	<div className={styles.formContainer}>
		<form onSubmit={handleSubmit} className={styles.form}>
			<div>
				<label htmlFor="title">Title</label>
				<input name='title' id='title' value={expense.title} onChange={handleChange} type="text" />
			</div>
			<div>
				<label htmlFor="amount">Amount</label>
				<input name='amount' id='amount' value={expense.amount} onChange={handleChange} type="number" />
			</div>
			<div>
				<label htmlFor="date">Date</label>
				<input name='date' id='date' value={expense.date} onChange={handleChange} type="date" />
			</div>
			<div>
				<label htmlFor="category">Category</label>
				<select onChange={handleChange} name="category" id="category" value={expense.category}>
					<option value="default">--</option>
					<option value="housing">Housing</option>
					<option value="groceries">Groceries</option>
					<option value="transportation">Transportation</option>
					<option value="clothes">Clothes</option>
					<option value="other">Other</option>
				</select>
			</div>
			<button type='submit' className={styles.submitButton}>Add Expense</button>
		</form>
		<section className={styles.expensesContainer}>
			<div className={styles.individualExpense}>
				<div>hey</div>
				<div>hey</div>
				<div>hey</div>
			</div>
			<div className={styles.individualExpense}>
				
			</div>
		</section>
	</div>
  )
}

export default Form