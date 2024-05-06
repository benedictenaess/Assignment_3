import React from 'react';
import styles from './Sort.module.css';

function Sort({expenseList, setExpenseList, selectedOption, setSelectedOption}) {

	const handleSort =(e)=>{
		let selectedValue = e.target.value;
		setSelectedOption(selectedValue);

		let sortedExpenseArray = [...expenseList];

		switch (selectedValue) {
			case 'all':
				sortedExpenseArray = expenseList.sort((a,b)=>a.index - b.index);
				break;
			case 'title':
				sortedExpenseArray.sort((a,b)=>a.title.localeCompare(b.title));
				break;
			case 'amount':
				sortedExpenseArray.sort((a,b)=>a.amount - b.amount);
				break;
			case 'date':
				sortedExpenseArray.sort((a,b)=>new Date(b.date)-new Date(a.date))
				break;
			case 'category':
				sortedExpenseArray.sort((a,b)=>a.category.localeCompare(b.category));
				break;
			default:
				break;
		}
		setExpenseList(sortedExpenseArray);
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