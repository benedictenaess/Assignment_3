import React, { useState } from 'react';
import styles from './Form.module.css';

function Form() {

	const [expense, setExpense] = useState({title, amount, date, category});
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

	const handleSubmit =()=>{
		const newExpense = {
			title,
			amount,
			date,
			category
		}
		const checkValidation = validateInput();
		if (checkValidation) {
			console.log('Submission successfully completed');
		} else {
			console.log('Submission failed. Error');
		}
	}

  return (
	<div className={styles.formContainer}>
		<form className={styles.form}>
			<div>
				<label htmlFor="title">Title</label>
				<input type="text" />
			</div>
			<div>
				<label htmlFor="amount">Amount</label>
				<input type="number" />
			</div>
			<div>
				<label htmlFor="date">Date</label>
				<input type="date" />
			</div>
			<div>
				<label htmlFor="category">Category</label>
				<select name="category" id="category">
					<option value="default">--</option>
					<option value="housing">Housing</option>
					<option value="groceries">Groceries</option>
					<option value="transportation">Transportation</option>
					<option value="clothes">Clothes</option>
					<option value="other">Other</option>
				</select>
			</div>
			<button className={styles.submitButton}>Add Expense</button>
		</form>
		<section className={styles.expensesContainer}>
			<div className={styles.individualExpense}>
				<div>hey</div>
				<div>hey</div>
				<div>hey</div>
			</div>
			<div div className={styles.individualExpense}>
				ho
			</div>
		</section>
	</div>
  )
}

export default Form