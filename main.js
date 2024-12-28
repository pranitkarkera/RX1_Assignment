import { createStore } from "redux";
import taskReducer from "./taskReducer"; // Ensure this file exists
import { addTask, toggleTask, removeTask } from "./actions"; // Ensure these are correctly exported

// Create the Redux store
export const store = createStore(taskReducer);
window.store = store;
store.getState(); // Ensure the store is initialized
console.log("Initial store state:", store.getState());

// Counter for generating unique task IDs (instead of Date.now())
let taskIdCounter = 1;

// Subscribe to the store to render tasks whenever the state changes
store.subscribe(() => {
  renderTasks();
});

// Function to render tasks
const renderTasks = () => {
  const state = store.getState();
  console.log("Current state:", state);

  const tasksList = document.getElementById("tasksList");
  const totalTasksElement = document.getElementById("totalTasks");

  // Verify DOM elements exist
  if (!tasksList || !totalTasksElement) {
    console.error("Tasks list or total tasks element not found.");
    return;
  }

  // Clear current list
  tasksList.innerHTML = "";

  // Render tasks
  state.tasks.forEach((task) => {
    const taskItem = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `task-${task.id}`;
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => handleToggleTask(task.id));

    const label = document.createElement("label");
    label.htmlFor = `task-${task.id}`;
    label.textContent = `${task.name} - ${task.detail}`;

    taskItem.appendChild(checkbox);
    taskItem.appendChild(label);
    tasksList.appendChild(taskItem);
  });

  // Update total tasks count
  totalTasksElement.textContent = state.tasks.length;
};

// Handle task toggle
const handleToggleTask = (taskId) => {
  store.dispatch(toggleTask(taskId));
};

// Handle Add Task Form Submission
document.getElementById("addTaskForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const taskName = document.getElementById("taskName").value.trim();
  const taskDetail = document.getElementById("taskDetail").value.trim();

  if (!taskName || !taskDetail) {
    alert("Task name and detail cannot be empty!");
    return;
  }

  // Use counter for generating task ID
  const taskId = taskIdCounter++;

  store.dispatch(
    addTask({
      id: taskId,
      name: taskName,
      detail: taskDetail,
      completed: false,
    })
  );

  // Clear form inputs
  document.getElementById("taskName").value = "";
  document.getElementById("taskDetail").value = "";
});

// Handle Remove Task
document.getElementById("removeTaskBtn").addEventListener("click", () => {
  const taskId = parseInt(document.getElementById("removeTaskId").value, 10);

  if (isNaN(taskId)) {
    alert("Please enter a valid task ID.");
    return;
  }

  store.dispatch(removeTask(taskId));

  // Clear input
  document.getElementById("removeTaskId").value = "";
});

// Initial render
renderTasks();
