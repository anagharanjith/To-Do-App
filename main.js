let tasks = [];

function addTask() {
    const taskTitle = document.getElementById("taskTitle").value;
    const taskDescription = document.getElementById("taskDescription").value;

    if (taskTitle.trim() !== "") {
        const newTask = {
            title: taskTitle,
            description: taskDescription,
            status: "Pending"
        };

        tasks.push(newTask);
        updateTaskList();
        clearForm();
        saveTasksToLocalStorage();
    } else {
        alert("Please enter a task title.");
    }
}

function removeTask(index) {
    tasks.splice(index, 1);
    updateTaskList();
    saveTasksToLocalStorage();
}

function updateStatus(index) {
    tasks[index].status = tasks[index].status === "Pending" ? "Completed" : "Pending";
    updateTaskList();
    saveTasksToLocalStorage();
}

function updateTaskList() {
    const tableBody = document.getElementById("allTasksTableBody");
    tableBody.innerHTML = "";

    tasks.forEach((task, index) => {
        const row = tableBody.insertRow();
        row.innerHTML = `
            <td>${task.title}</td>
            <td>${task.description}</td>
            <td>${task.status}</td>
            <td>
                <button class="btn btn-md" onclick="removeTask(${index})"><i class="fa-solid fa-trash-can" style="color: #ba2717;"></i></button>
                <button class="btn btn-md" onclick="updateStatus(${index})"><i class="fa-solid fa-check fa-2xl" style="color: #0bcb45;"></i></button>
            </td>
        `;
    });
}

function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }
}

function clearForm() {
    document.getElementById("taskTitle").value = "";
    document.getElementById("taskDescription").value = "";
}

document.addEventListener("DOMContentLoaded", function () {
    loadTasksFromLocalStorage();
    updateTaskList();
});
