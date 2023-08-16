const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const itemList = document.querySelector('#item-list');
const clearBtn = document.querySelector('#clear');
const itemFilter = document.querySelector('.filter');

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
	// Check the UI as soon as we create the <li>s
	resetState();

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

const clearItems = () => {
	// Remove first child from <ul> while they exist
	while (itemList.firstChild) {
		itemList.removeChild(itemList.firstChild);
	}
	resetState();
};

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

// Event Listeners
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);
itemFilter.addEventListener('input', filterItems);

// Check if there are items to clear filter and clear button
// Global Scope
resetState();
