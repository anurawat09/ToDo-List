function addTask(section) {
  const input = document.getElementById("todo-title");
  const taskText = input.value.trim();

  if (!taskText) return;

  const task = document.createElement("div");
  task.className = "task";

  const title = document.createElement("div");
  title.className = "task-title";
  title.textContent = taskText;

  const date = document.createElement("div");
  date.className = "task-date";
  const today = new Date().toISOString().split("T")[0];
  date.textContent = "Added: " + today;

  const controls = document.createElement("div");
  controls.className = "task-controls";

  const editBtn = document.createElement("button");
  editBtn.textContent = "✎";
  editBtn.onclick = () => {
    const newTitle = prompt("Edit task:", title.textContent);
    if (newTitle) title.textContent = newTitle;

    if (!controls.querySelector(".move-progress")) {
      const moveToProgress = document.createElement("button");
      moveToProgress.className = "move-progress";
      moveToProgress.textContent = "To In Progress";
      moveToProgress.onclick = () => {
        document.getElementById("progress-tasks").appendChild(task);
      };

      const moveToDone = document.createElement("button");
      moveToDone.className = "move-done";
      moveToDone.textContent = "To Done";
      moveToDone.onclick = () => {
        document.getElementById("done-tasks").appendChild(task);
      };

      controls.appendChild(moveToProgress);
      controls.appendChild(moveToDone);
    }
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "✖";
  deleteBtn.onclick = () => task.remove();

  controls.appendChild(editBtn);
  controls.appendChild(deleteBtn);

  task.appendChild(title);
  task.appendChild(date);
  task.appendChild(controls);

  task.setAttribute("draggable", true);
  task.ondragstart = (e) => {
    e.dataTransfer.setData("text/plain", task.outerHTML);
  };

  document.getElementById(`${section}-tasks`).appendChild(task);
  input.value = "";
}

document.querySelectorAll(".column").forEach((col) => {
  col.addEventListener("dragover", (e) => e.preventDefault());
  col.addEventListener("drop", (e) => {
    e.preventDefault();
    const html = e.dataTransfer.getData("text/plain");
    const temp = document.createElement("div");
    temp.innerHTML = html;
    const task = temp.firstChild;
    task.ondragstart = (e) => {
      e.dataTransfer.setData("text/plain", task.outerHTML);
    };
    task.querySelector(".delete-btn")?.addEventListener("click", () => task.remove());
    task.querySelector(".edit-btn")?.addEventListener("click", () => {
      const title = task.querySelector(".task-title");
      const newTitle = prompt("Edit task:", title.textContent);
      if (newTitle) title.textContent = newTitle;
    });
    col.querySelector(".tasks").appendChild(task);
  });
});
