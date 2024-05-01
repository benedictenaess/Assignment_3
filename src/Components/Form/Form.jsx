import React from 'react';
import styles from './Form.module.css';

function Form() {
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