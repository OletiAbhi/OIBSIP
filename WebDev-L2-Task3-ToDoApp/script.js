// ============================================
// TASKFLOW — TO-DO APP
// ============================================


// ============================================
// DOM ELEMENTS
// ============================================

const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");

const pendingList = document.getElementById("pending-list");
const completedList = document.getElementById("completed-list");

const pendingCount = document.getElementById("pending-count");
const completedCount = document.getElementById("completed-count");


// ============================================
// APPLICATION STATE
// ============================================

let tasks = [];


// ============================================
// LOAD TASKS FROM LOCAL STORAGE
// ============================================

function loadTasks() {

    const savedTasks = localStorage.getItem("taskflowTasks");

    if (savedTasks) {

        tasks = JSON.parse(savedTasks);

    }

}


// ============================================
// SAVE TASKS TO LOCAL STORAGE
// ============================================

function saveTasks() {

    localStorage.setItem(
        "taskflowTasks",
        JSON.stringify(tasks)
    );

}


// ============================================
// ADD TASK
// ============================================

function addTask() {

    const taskText = taskInput.value.trim();

    // Don't allow empty tasks
    if (taskText === "") {
        return;
    }


    const task = {

        id: Date.now(),

        text: taskText,

        completed: false,

        createdAt: new Date().toISOString()

    };


    tasks.push(task);

    saveTasks();

    taskInput.value = "";

    renderTasks();

}


// ============================================
// ADD BUTTON
// ============================================

addTaskBtn.addEventListener("click", addTask);


// ============================================
// ENTER KEY
// ============================================

taskInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        addTask();

    }

});


// ============================================
// RENDER ALL TASKS
// ============================================

function renderTasks() {

    pendingList.innerHTML = "";

    completedList.innerHTML = "";


    const pendingTasks =
        tasks.filter(task => !task.completed);

    const completedTasks =
        tasks.filter(task => task.completed);


    // ----------------------------------------
    // Render Pending Tasks
    // ----------------------------------------

    pendingTasks.forEach(task => {

        const taskCard = createTaskCard(task);

        pendingList.appendChild(taskCard);

    });


    // ----------------------------------------
    // Render Completed Tasks
    // ----------------------------------------

    completedTasks.forEach(task => {

        const taskCard = createTaskCard(task);

        completedList.appendChild(taskCard);

    });


    updateTaskCounts();


    showEmptyState(
        pendingList,
        pendingTasks.length,
        "pending"
    );


    showEmptyState(
        completedList,
        completedTasks.length,
        "completed"
    );

}


// ============================================
// CREATE TASK CARD
// ============================================

function createTaskCard(task) {

    const card = document.createElement("article");

    card.className = "task-card";


    card.innerHTML = `

        <div class="task-main">

            <button
                class="complete-btn"
                type="button"
                aria-label="Mark task complete"
            >
                ${task.completed ? "✓" : "○"}
            </button>


            <div class="task-details">

                <h3>${escapeHTML(task.text)}</h3>

                <p>
                    ${formatTime(task.createdAt)}
                </p>

            </div>

        </div>


        <div class="task-actions">

            <button
                class="edit-btn"
                type="button"
            >
                Edit
            </button>


            <button
                class="delete-btn"
                type="button"
            >
                Delete
            </button>

        </div>

    `;


    // ========================================
    // COMPLETE / UNCOMPLETE
    // ========================================

    const completeButton =
        card.querySelector(".complete-btn");


    completeButton.addEventListener(
        "click",
        function () {

            task.completed = !task.completed;

            saveTasks();

            renderTasks();

        }
    );


    // ========================================
    // EDIT TASK
    // ========================================

    const editButton =
        card.querySelector(".edit-btn");


    editButton.addEventListener(
        "click",
        function () {

            editTask(task);

        }
    );


    // ========================================
    // DELETE TASK
    // ========================================

    const deleteButton =
        card.querySelector(".delete-btn");


    deleteButton.addEventListener(
        "click",
        function () {

            deleteTask(task.id);

        }
    );


    return card;

}


// ============================================
// EDIT TASK
// ============================================

function editTask(task) {

    const newText = prompt(
        "Edit your task:",
        task.text
    );


    // User cancelled
    if (newText === null) {

        return;

    }


    const updatedText = newText.trim();


    // Don't allow empty task
    if (updatedText === "") {

        return;

    }


    task.text = updatedText;

    saveTasks();

    renderTasks();

}


// ============================================
// DELETE TASK
// ============================================

function deleteTask(taskId) {

    tasks = tasks.filter(function (task) {

        return task.id !== taskId;

    });


    saveTasks();

    renderTasks();

}


// ============================================
// UPDATE TASK COUNTS
// ============================================

function updateTaskCounts() {

    const pendingTasks =
        tasks.filter(task => !task.completed);


    const completedTasks =
        tasks.filter(task => task.completed);


    pendingCount.textContent =
        `${pendingTasks.length} pending`;


    completedCount.textContent =
        `${completedTasks.length} completed`;

}


// ============================================
// EMPTY STATES
// ============================================

function showEmptyState(list, count, type) {

    if (count > 0) {

        return;

    }


    if (type === "pending") {

        list.innerHTML = `

            <div class="empty-state">

                <span class="empty-icon">○</span>

                <h3>No pending tasks</h3>

                <p>
                    Add a task above and start
                    getting things done.
                </p>

            </div>

        `;

    } else {

        list.innerHTML = `

            <div class="empty-state">

                <span class="empty-icon">✓</span>

                <h3>No completed tasks</h3>

                <p>
                    Completed tasks will appear here.
                </p>

            </div>

        `;

    }

}


// ============================================
// FORMAT TIMESTAMP
// ============================================

function formatTime(date) {

    const taskDate = new Date(date);


    return taskDate.toLocaleString([], {

        dateStyle: "medium",

        timeStyle: "short"

    });

}


// ============================================
// ESCAPE HTML
// ============================================

function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


// ============================================
// INITIALIZE APP
// ============================================

loadTasks();

renderTasks();