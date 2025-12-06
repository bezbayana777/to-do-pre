let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() {

	const tasksJSON = localStorage.getItem("items");

	if (tasksJSON){
	  items = JSON.parse(tasksJSON);
	}

	items.forEach((item) => {
		const newItem = createItem(item);
		listElement.appendChild(newItem);
	})
};

function createItem(item) {
	const template = document.getElementById("to-do__item-template");
	const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  	const textElement = clone.querySelector(".to-do__item-text");
  	const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  	const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
  	const editButton = clone.querySelector(".to-do__item-button_type_edit");

	deleteButton.addEventListener("click", (event) => {
		clone.remove();
		items = getTasksFromDOM();
		saveTasks(items);
	});

	duplicateButton.addEventListener("click", (event) => {
		const itemName = textElement.textContent;
		const newItem = createItem(itemName);
		listElement.prepend(newItem);
		items = getTasksFromDOM();
		saveTasks(items);
	});

	editButton.addEventListener("click", (event) => {
		textElement.setAttribute("contenteditable", "true");
		textElement.focus();
	});

	textElement.addEventListener("blur", (event) => {
		textElement.setAttribute("contenteditable", "false");
		items = getTasksFromDOM();
		saveTasks(items);
	});

	textElement.textContent = item;
	return clone;
}

function getTasksFromDOM() {
	const itemsNamesElements = document.querySelectorAll(".to-do__item-text");
	const tasks = [];
	itemsNamesElements.forEach((item) => {
		tasks.push(item.textContent);
	})
	return tasks;
};

function saveTasks(tasks) {
	const tasksString = JSON.stringify(tasks);
	localStorage.setItem("items", tasksString);

};

formElement.addEventListener("submit", (event) => {
	event.preventDefault();
	const taskName = inputElement.value;
	const newTask = createItem(taskName);
	listElement.prepend(newTask);
	items = getTasksFromDOM();
	saveTasks(items);
	formElement.reset();
});

loadTasks();
