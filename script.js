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
const formBtn = itemForm.querySelector('button');
let isEditMode = false;

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

	// Check for edit mode
	if (isEditMode) {
		const itemToEdit = itemList.querySelector('.edit-mode');
		removeItemFromStorage(itemToEdit.textContent);
		itemToEdit.classList.remove('edit-mode');
		itemToEdit.remove();
		isEditMode = false;
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

const displayItems = () => {
	let itemsFromStorage = getItemsFromStorage();
	itemsFromStorage.forEach((item) => addItemToDOM(item));
	resetState();
};

// c) How do we add items to local storage?
const addItemToStorage = (item) => {
	const itemsFromStorage = getItemsFromStorage();

	// Add new item to array
	itemsFromStorage.push(item);

	// Convert to JSON string and set to local storage (with the new item included)
	// This process will overwrite the current values on storage. That's why we need all of this work done.
	// Or else, we could just set new items directly, which is not possible
	localStorage.setItem('items', JSON.stringify(itemsFromStorage));
};

const getItemsFromStorage = () => {
	// We grab items from storage first, then turn them into object,
	// then add a new item, and give it back to storage
	let itemsFromStorage;

	// If storage is empty, create a new array for objects
	if (localStorage.getItem('items') === null) {
		itemsFromStorage = [];
	} else {
		// We want localStorage data as an Object
		itemsFromStorage = JSON.parse(localStorage.getItem('items'));
	}

	return itemsFromStorage;
};

const onClickItem = (e) => {
	// Only remove if we click on an element whose parent has a certain class
	if (e.target.parentElement.classList.contains('remove-item')) {
		removeItem(e.target.parentElement.parentElement);
	} else {
		setItemToEdit(e.target);
	}
};

const setItemToEdit = (item) => {
	isEditMode = true;

	itemList.querySelectorAll('li').forEach((i) => i.classList.remove('edit-mode'));

	item.classList.add('edit-mode');
	formBtn.innerHTML = '<i class="fa-solid fa-pen"></i>  Update Item';
	formBtn.style.backgroundColor = '#228B22';
	itemInput.value = item.textContent;
};

// f) Removing items
const removeItem = (item) => {
	// Traverse the DOM and remove the right element: <li>
	if (confirm('Are you sure?')) {
		item.remove();

		removeItemFromStorage(item.textContent);

		resetState();
	}
};

const removeItemFromStorage = (item) => {
	let itemsFromStorage = getItemsFromStorage();
	itemsFromStorage = itemsFromStorage.filter((i) => i !== item);
	localStorage.setItem('items', JSON.stringify(itemsFromStorage));
};

// g) Clearing items
const clearItems = () => {
	// Remove first child from <ul> while they exist
	while (itemList.firstChild) {
		itemList.removeChild(itemList.firstChild);
	}

	// Clear from local storage
	localStorage.removeItem('items');

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
// Call this after removing and clearing items
const resetState = () => {
	// We need to define the <li>s here, upon function call
	// Else, we won't have access to them, as they would have been already defined
	const items = itemList.querySelectorAll('li');

	if (items.length === 0) {
		clearBtn.style.display = 'none';
		itemFilter.style.display = 'none';
	} else {
		clearBtn.style.display = 'block';
		itemFilter.style.display = 'block';
	}

	formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
	formBtn.style.backgroundColor = '#333';

	isEditMode = false;

	itemInput.value = '';
};

// Initialize app
function init() {
	// 3 Event Listeners
	itemForm.addEventListener('submit', onAddItemSubmit);
	itemList.addEventListener('click', onClickItem);
	clearBtn.addEventListener('click', clearItems);
	itemFilter.addEventListener('input', filterItems);
	document.addEventListener('DOMContentLoaded', displayItems);

	// Check if there are items to clear filter and clear button
	// Global Scope
	resetState();
}

init();
