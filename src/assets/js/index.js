document.addEventListener("DOMContentLoaded", () => {
  localStorage.setItem("authToken", 32131)
  const authToken = localStorage.getItem("authToken")
  console.log(authToken)
  renderKanban();

  const addTaskButtons = document.querySelectorAll(".kanban__icon--add");
  const modal = document.querySelector(".modal");
  const closeModalButton = document.querySelector(".close-modal");
  const cancelButton = document.querySelector(".cancel-button");
  const form = document.querySelector(".modal form");
  let buttonId = null;
  // =========================================================================
  function setupAddTaskButtons() {
    addTaskButtons.forEach((addButton) => {
      addButton.addEventListener("click", () => {
        buttonId = addButton.id;
        modal.style.display = "flex";
      });
    });
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("title-task").value;
    const description = document.getElementById("description-task").value;
    const dueDate = form.elements["date"].value;

    // Вставить код для создания задачи
    if (title && description && dueDate) {
      function getComplexityClass (dueDate) {
        const currentDate = new Date();
        const inputTime = new Date(dueDate);
        const timeDiff = inputTime.getTime() - currentDate.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 3000 * 14)); 

        if (daysDiff <= 7) {
          return "high"
        };
        if (daysDiff <= 14) {
          return "medium"
        };
        if (daysDiff) {
          return "low"
        };
      };
   
      const taskForm = {
        id: tasks.length + 1,
        title: title,
        description: description,
        complexity: getComplexityClass(dueDate),
        dueDate: dueDate,
        columnId: buttonId
      };

      tasks.push(taskForm);
      const column = columns.find(column => column.id === taskForm.columnId);
      if (column) {
        column.tasks.push(taskForm.id);
      }

      renderKanban();
      setupAddTaskButtons();
      form.reset();
      modal.style.display = "none";
    };
  });
  // =========================================================================

  addTaskButtons.forEach((button) => {
    button.addEventListener("click", () => {
      modal.style.display = "flex";
    });
  });

  closeModalButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  cancelButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  function setupAddTaskButtons() {
    const addTaskButtons = document.querySelectorAll(".kanban__icon--add");
    addTaskButtons.forEach((button) => {
      button.addEventListener("click", () => {
        modal.style.display = "flex";
      });
    });
  }
});


// =========================================================================
function renderTaskElement(task) {
  // Вставить код рендера задачи
  const taskItem = document.createElement("div");
  taskItem.className = `task-item`;
  taskItem.innerHTML = `
      <h3 class="task-item__title">${task.title}</h3>
      <p class="task-item__description">${task.description}</p>
      <div class="task-item__info">
        <div class="task-item__complexity">
          <div class="complexity__dot complexity__dot--${task.complexity}"></div>
          <div class="complexity__dot complexity__dot--${task.complexity}"></div>
          <div class="complexity__dot complexity__dot--${task.complexity}"></div>
        </div>
        <div class="task-item__client">${task.dueDate}</div>
      </div>
    `;
  return taskItem;
};
// =========================================================================

function renderKanban() {
  const kanbanContainer = document.querySelector(".kanban");
  kanbanContainer.innerHTML = ``;

  columns.forEach((column) => {
    const columnSection = document.createElement("section");
    columnSection.className = `kanban__column kanban__column--${column.id}`;
    columnSection.innerHTML = `
          <div class="kanban__header">
            <div class="kanban__header-content">
              <img src="${column.icon}" alt="Колонка ${column.title}" class="kanban__icon kanban__icon--column">
              <h2 class="kanban__title">${column.title}</h2>
            </div>
            <img src="./src/assets/img/kanban/plus.svg" alt="Добавить задачу" class="kanban__icon kanban__icon--add" id="${column.id}">
          </div>
          <div class="kanban__list"></div>
        `;

    const listContainer = columnSection.querySelector(".kanban__list");
    column.tasks.forEach((taskId) => {
      const task = tasks.find((task) => task.id === taskId);
      if (task) {
        listContainer.appendChild(renderTaskElement(task));
      }
    });

    kanbanContainer.appendChild(columnSection);
  });
}
