import React, { useState } from 'react';
import styles from './Sort.module.css';

function Sort({expenseList, setExpenseList}) {

	const [selectedOption, setSelectedOption] = useState('all');
	
	const expenseArray = [...expenseList];
	
	const handleSort =(e)=>{
		let selectedValue = e.target.value;
		setSelectedOption(selectedValue);

		switch (selectedValue) {
			case 'title':
				expenseArray.sort((a,b)=>a.title.localeCompare(b.title));
				break;
			case 'amount':
				expenseArray.sort((a,b)=>a.amount - b.amount);
				break;
			case 'date':
				expenseArray.sort((a,b)=>new Date(b.date)-new Date(a.date))
				break;
			case 'category':
				expenseArray.sort((a,b)=>a.category.localeCompare(b.category));
				break;
			default:
				break;
		}
		setExpenseList(expenseArray);
	}

  return (
	<div className={styles.sort_container}>
		<div className={styles.sort}>
			<label htmlFor="sort-options">Sort by: </label>
			<select name="sort-options" id="sort-options" value={selectedOption} onChange={handleSort}>
				<option value="all">All</option>
				<option value="title">Title</option>
				<option value="amount">Amount</option>
				<option value="date">Date</option>
				<option value="category">Category</option>
			</select>
		</div>
	</div>
  )
}

export default Sort