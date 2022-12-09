import React, { useState,useEffect } from 'react';
import './index.css';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
	// HINT: each "item" in our list names a name, a boolean to tell if its been completed, and a quantity
	const [items, setItems] = useState([
		
	]);

	const [inputvalue, setInputValue] = useState('');
	const [totalitemcount, setTotalItemCount] = useState(0);

	function handleAddButtonClick() {
		if (inputvalue === "") {
		}else{const uniqueid = uuidv4()
			const newItem = {
				itemName: inputvalue,
				quantity: 0,
				isSelected: false,
				id: uniqueid,
			}

			const newItems = [...items, newItem];
	
			setItems(newItems);
			setInputValue('')
			calculateTotal( );
		}
		
		
	}
	useEffect(() => {
		handleQuantityDelete()
	}, [items,totalitemcount])
	

	function handleQuantityIncrease(index) {
		const newItems = [...items];

		newItems[index].quantity++;

		setItems(newItems);
		calculateTotal()
	}

	function handleQuantityDecrease(index) {
		const newItems = [...items];

		newItems[index].quantity--;

		setItems(newItems);
		calculateTotal();
	}

	function toggleComplete(index) {
		const newItems = [...items];

		newItems[index].isSelected = !newItems[index].isSelected;

		setItems(newItems);
	}

	function calculateTotal() {
		const totalItemCount = items.reduce((total, item) => {
			return total + item.quantity;
		}, 0);
		setTotalItemCount(totalItemCount)
	}

	function handleQuantityDelete(id) {
	
		const newList = items.filter((items) => {
    
			return items.id !== id
		  } );
		  setItems(newList)
		  calculateTotal( );
	}

	return (
		<div className='app-background'>
			<h1 className='heading'>Shoping List App</h1>
			<div className='main-container'>
				<div className='add-item-box'>
					<input value={inputvalue} onChange={(event) => setInputValue(event.target.value)} className='add-item-input' placeholder='Add an item...' />
					<i onClick={() => handleAddButtonClick()} class="fa-sharp fa-solid fa-plus"></i>
				</div>
				<div className='item-list'>
					{items.map((item, index) =>
						<div className='item-container'>
							<div onClick={() => toggleComplete(index)} className='item-name'>
								{/* HINT: replace false with a boolean indicating the item has been completed or not */}
								{item.isSelected ? (
									<>
										<i class="fa-solid fa-circle-check"></i>
										<span className='completed'>{item.itemName}</span>
									</>
								) : (
									<>

										<i class="fa-solid fa-circle"></i>
										<span>{item.itemName}</span>
									</>
								)}
							</div>
							<div className='quantity'>
								<button>
									<i onClick={() => handleQuantityDecrease(index)} class="fa-solid fa-less-than"></i>
								</button>
								<span> {item.quantity} </span>
								<button>
									<i onClick={() => handleQuantityIncrease(index)} class="fa-sharp fa-solid fa-greater-than"></i>
								</button>
								
							</div>
							<div className='quantity'>
							<button>
								<i onClick={()=> handleQuantityDelete(item.id)} class="fa-solid fa-trash"></i>
							</button>
							</div>
							
						</div>)}

				</div>
				<div className='total'>Total: {totalitemcount}</div>
			</div>
		</div>
	);
};

export default App;