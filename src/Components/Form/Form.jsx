import React, { useEffect, useRef, useState } from 'react';
import styles from './Form.module.css';
import Sort from '../Sort/Sort';

function Form() {
	
	const [expenseList, setExpenseList] = useState([]);
	const [expense, setExpense] = useState({title:'', amount:'', date:'', category:'-'});
	const [errorMsg, setErrorMsg] = useState({});
	const [isInputValid, setisInputValid] = useState(false);
	const [selectedOption, setSelectedOption] = useState('all');
	const [buttonVisibility, setButtonVisibility] = useState(false);
	const scrollButton = useRef(null);

	const validateInput =()=>{
		let isTitleValid = true;
		let isAmountValid = true;
		let isDateValid = true;

		const clonedErrorMsg = {...errorMsg};
		if(!expense.title.trim()){
			clonedErrorMsg.titleError = 'Title is required';
			isTitleValid = false;
		} else {
			clonedErrorMsg.titleError = '';
			isTitleValid = true;
		}
		if(!expense.amount){
			clonedErrorMsg.amountError = 'Amount is required';
			isAmountValid = false;
		} else {
			clonedErrorMsg.amountError = '';
			isAmountValid = true;
		}
		if(!expense.date){
			clonedErrorMsg.dateError = 'Date is required';
			isDateValid = false;
		} else {
			clonedErrorMsg.dateError = '';
			isDateValid = true;
		}
		
		let isValid = isTitleValid && isAmountValid && isDateValid;

		setErrorMsg(clonedErrorMsg);
		return isValid;
	}

	const handleChange =(e)=>{
		const {name, value} = e.target;
		const newValue = name === 'amount' ? parseFloat(value) : value;
		setExpense(prev=>({...prev, [name]:newValue}));
	}

	const handleSubmit =(e)=>{
		e.preventDefault();
		const isValid = validateInput();
		setisInputValid(isValid);
		if (isValid) {
			setExpenseList(prev=>{
			const submittedExpenseArray = [...prev, {...expense, index: prev.length}];
			submittedExpenseArray.sort((a,b)=>a.index - b.index);
			return submittedExpenseArray;
			});
			setExpense({title:'', amount:'', date:'', category:'-'});
			setSelectedOption('all');
		} else if (!isValid) {
			console.log('Submission failed. Error');
		}
	}

	const handleDelete =(indexToDelete)=>{
		const newExpenseArray = expenseList.filter((_, index)=> {
			return index !== indexToDelete;
		});
		setExpenseList(newExpenseArray);
	}

	const resetErrorMsg =()=>{
		if(errorMsg.titleError) {
			setTimeout(() => {
				setErrorMsg(prev=> ({...prev, titleError: ''}))
			}, 2000);
		}
		if(errorMsg.amountError) {
			setTimeout(() => {
				setErrorMsg(prev=>({...prev, amountError: ''}))
			}, 2000);
		}
		if(errorMsg.dateError) {
			setTimeout(()=>{
				setErrorMsg(prev=>({...prev, dateError: ''}))
			}, 2000)
		}
	};

	useEffect(()=>{
		resetErrorMsg();
	},[errorMsg.titleError, errorMsg.amountError, errorMsg.dateError]);

	const handleScroll =()=>{
		const scrollPosition = window.scrollY || document.documentElement.scrollTop;
		const isVisible = scrollPosition > 2 ? true : false;
		setButtonVisibility(isVisible);
		scrollButton.current.style.visibility = isVisible ? 'visible' : 'hidden';
	}

	useEffect(()=>{
		window.addEventListener('scroll', handleScroll);
		return ()=>{
			window.removeEventListener('scroll', handleScroll);
		}
	},[]);

	const scrollToTop =()=>{
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}

  return (
	<div>
		<div className={styles.headerContainer}>
			<h1 className={styles.header}>Expense Tracker</h1>
		</div>
			<div className={styles.formContainer}>
			<form onSubmit={handleSubmit} className={styles.form}>
				<div className={styles.formInputSection}>
					<div>
						<label htmlFor="title">Title</label>
						<input name='title' id='title' value={expense.title} onChange={handleChange} type="text" />
					</div>
					<div className={styles.errorMsg}>
						<span>{errorMsg.titleError}</span>
					</div>
				</div>

				<div className={styles.formInputSection}>
					<div>
						<label htmlFor="amount">Amount</label>
						<input name='amount' id='amount' value={expense.amount} onChange={handleChange} type="number" />
					</div>
					<div className={styles.errorMsg}>
						<span>{errorMsg.amountError}</span>
					</div>
				</div>

				<div className={styles.formInputSection}>
					<div>
						<label htmlFor="date">Date</label>
						<input name='date' id='date' value={expense.date} onChange={handleChange} type="date" />
					</div>
					<div className={styles.errorMsg}>
						<span>{errorMsg.dateError}</span>
					</div>
				</div>

				<div className={styles.formInputSection}>
					<div>
						<label htmlFor="category">Category</label>
						<select onChange={handleChange} name="category" id="category" value={expense.category}>
							<option value="&ndash;">--</option>
							<option value="housing">Housing</option>
							<option value="groceries">Groceries</option>
							<option value="transportation">Transportation</option>
							<option value="clothes">Clothes</option>
							<option value="other">Other</option>
						</select>
					</div>
					<div className={styles.errorMsg}></div>
				</div>

				<div className={styles.formInputSection}>
					<button type='submit' className={styles.submitButton}>Add Expense</button>
					<div className={styles.errorMsg}></div>
				</div>
			</form>

			<section className={styles.expenseTotal}>
				{`Total amount: ${expenseList.reduce((acc,cur)=> acc + cur.amount,0)}`}
			</section>

			<Sort expenseList={expenseList} setExpenseList={setExpenseList} selectedOption={selectedOption} setSelectedOption={setSelectedOption}/>
			<section className={styles.expensesContainer}>
				{expenseList.map((expense, index)=>{
					return <div key={index} className={styles.individualExpense}>
							<span>{expense.title}</span>
							<span>{expense.amount}</span>
							<span>{expense.date}</span>
							<span>{expense.category}</span>
							<button className={styles.deleteButton} onClick={()=>handleDelete(index)}>Remove</button>
						</div>
					})}
			</section>
			<button value={buttonVisibility} onClick={scrollToTop} className={styles.scrollButtonVisible} ref={scrollButton}>Scroll up</button>
		</div>
	</div>
  )
}

export default Form