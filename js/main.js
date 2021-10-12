let input = document.querySelector(".todo-app .add-task input");

let add_btn = document.querySelector(".todo-app .add-task button");

let tasks_container = document.querySelector(".todo-app .tasks");

let tasks_count = document.querySelector(".todo-app .stats .count span");

let tasks_completed = document.querySelector(".stats .complted span");

stats();

no_tasks();

auto_focus();

function auto_focus() {
  input.focus();
}

function no_tasks() {
  if (tasks_container.childElementCount === 0) {
    let empty = `<div class="no-tasks">There is No Tasks</div>`;
    tasks_container.innerHTML = empty;
  }
}

function create_task() {
  // create task div
  let task_div = document.createElement("div");
  task_div.classList.add("task");

  // create text div
  let text_div = document.createElement("div");
  text_div.classList.add("text");
  text_div.append(input.value);

  // create delete button
  let button = document.createElement("button");
  button.classList.add("delete");
  button.append("delete");

  // appent chilgren elements
  task_div.append(text_div);

  task_div.append(button);

  return task_div;
}

function add_task() {
  if (input.value === "") {
    swal("Empty value!");
  } else {
    // at valid value

    let text_arr = document.querySelectorAll(".todo-app .tasks .task .text");

    let is_exist = false;

    text_arr.forEach((element) => {
      if (input.value === element.innerHTML) {
        is_exist = true;
      }
    });

    if (is_exist) {
      swal("Repeated value!");
    } else {
      // if no tasks element exist
      let no_task = document.querySelector(".todo-app .tasks .no-tasks");

      if (no_task) no_task.remove();

      // add task
      tasks_container.append(create_task());
    }

    input.value = "";
  }
}

add_btn.addEventListener("click", function () {
  add_task();

  auto_focus();

  stats();
});

function stats() {
  tasks_count.innerHTML = tasks_container.childElementCount;
  tasks_completed.innerHTML = document.querySelectorAll(".task.done").length;
}

// to get elements not exist in page
document.addEventListener("click", function (e) {
  // completed tasks to have opacity
  if (e.target.classList.contains("task")) {
    e.target.classList.toggle("done");
    stats();
  }

  // delete and remove task
  if (e.target.className === "delete") {
    e.target.parentNode.remove();
    stats();
    no_tasks();
    auto_focus();
  }
});
