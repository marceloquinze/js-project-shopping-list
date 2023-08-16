const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const itemList = document.querySelector('#item-list');

const addItem = (e) => {
	e.preventDefault();

	// Vars
	const newItem = itemInput.value;

	// Validations
	if (newItem === '') {
		alert('Please, add an item');
		return;
	}

	// Elements
	const li = document.createElement('li');
	li.appendChild(document.createTextNode(newItem));

	const button = createButton('remove-item btn-link text-red');
	const icon = createIcon('fa-solid fa-xmark');

	// Appending
	button.appendChild(icon);
	li.appendChild(button);
	itemList.appendChild(li);

	// Clear input after creating elements
	itemInput.value = '';
};

// Accessory Functions
const createButton = (classes) => {
	const button = document.createElement('button');
	button.className = classes;
	return button;
};

const createIcon = (classes) => {
	const icon = document.createElement('i');
	icon.className = classes;
	return icon;
};

// Event Listeners
itemForm.addEventListener('submit', addItem);
