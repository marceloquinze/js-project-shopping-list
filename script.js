/**
 * Summary
 * 1 Global Variables
 * 2 Functions
 * 		a) When we click the submit button
 * 		b) How do we add items to DOM?
 * 		c) How do we add items to local storage?
 * 		d) Create Button
 *		e) Create Icons
 *		f) Removing items
 *		g) Clearing items
 *		h) Filtering items
 *		i) Resetting UI State
 * 3 Event Listeners
 */

// 1 Global Variables
const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const itemList = document.querySelector('#item-list'); //ul
const clearBtn = document.querySelector('#clear');
const itemFilter = document.querySelector('.filter');

// 2 Functions
// a) When we click the submit button
const onAddItemSubmit = (e) => {
	e.preventDefault();

	// Vars
	const newItem = itemInput.value;

	// Validations
	if (newItem === '') {
		alert('Please, add an item');
		return;
	}

	// Create item DOM element
	addItemToDOM(newItem);

	// Add item to local storage
	addItemToStorage(newItem);

	// Check the UI as soon as we create the <li>s
	resetState();

	// Clear input after creating elements
	itemInput.value = '';
};

// b) How do we add items to DOM?
const addItemToDOM = (item) => {
	const li = document.createElement('li');
	li.appendChild(document.createTextNode(item));

	const button = createButton('remove-item btn-link text-red');
	const icon = createIcon('fa-solid fa-xmark');

	// Appending
	button.appendChild(icon);
	li.appendChild(button);
	itemList.appendChild(li);
};

// c) How do we add items to local storage?
const addItemToStorage = (item) => {
	let itemsFromStorage;

	if (localStorage.getItem('items') === null) {
		itemsFromStorage = [];
	} else {
		itemsFromStorage = JSON.parse(localStorage.getItem('items'));
	}

	// Add new item to array
	itemsFromStorage.push(item);

	// Convert to JSON string and set to local storage
	localStorage.setItem('items', JSON.stringify(itemsFromStorage));
};

// d) Create Button
const createButton = (classes) => {
	const button = document.createElement('button');
	button.className = classes;
	return button;
};

// e) Create Icons
const createIcon = (classes) => {
	const icon = document.createElement('i');
	icon.className = classes;
	return icon;
};

// f) Removing items
const removeItem = (e) => {
	// Only remove if we click on an element whose parent has a certain class
	if (e.target.parentElement.classList.contains('remove-item')) {
		// Traverse the DOM and remove the right element: <li>
		if (confirm('Are you sure?')) {
			e.target.parentElement.parentElement.remove();
			resetState();
		}
	}
};

// g) Clearing items
const clearItems = () => {
	// Remove first child from <ul> while they exist
	while (itemList.firstChild) {
		itemList.removeChild(itemList.firstChild);
	}
	resetState();
};

// h) Filtering items
const filterItems = (e) => {
	const items = itemList.querySelectorAll('li');
	const text = e.target.value.toLowerCase();

	items.forEach((item) => {
		const itemName = item.firstChild.textContent.toLowerCase();

		if (itemName.indexOf(text) != -1) {
			item.style.display = 'flex';
		} else {
			item.style.display = 'none';
		}
	});
};

// i) Resetting UI State (remove clear button and filter when no item exists)
const resetState = () => {
	// We need to define the <li>s here, upon function call
	const items = itemList.querySelectorAll('li');
	if (items.length === 0) {
		clearBtn.style.display = 'none';
		itemFilter.style.display = 'none';
	} else {
		clearBtn.style.display = 'block';
		itemFilter.style.display = 'block';
	}
};

// 3 Event Listeners
itemForm.addEventListener('submit', onAddItemSubmit);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);
itemFilter.addEventListener('input', filterItems);

// Check if there are items to clear filter and clear button
// Global Scope
resetState();
