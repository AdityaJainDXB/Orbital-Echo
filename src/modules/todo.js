import { getItem, setItem } from './storage.js';

let todos = getItem('todos', []);

function save() {
  setItem('todos', todos);
}

export function initTodo() {
  const form = document.getElementById("todo-form");
  const input = document.getElementById("todo-input");
  const list = document.getElementById("todo-list");
  render(list);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = input.value.trim();
    if (!value) return;
    todos.push({ id: crypto.randomUUID(), text: value, done: false });
    input.value = "";
    save();
    render(list);
  });
}

function render(list) {
  list.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.className = todo.done ? "done" : "";
    li.innerHTML = `<label><input type="checkbox" ${todo.done ? "checked" : ""} /><span>${todo.text}</span></label><button class="todo-remove">×</button>`;

    li.querySelector("input").addEventListener("change", () => {
      todo.done = !todo.done;
      save();
      render(list);
    });
    li.querySelector(".todo-remove").addEventListener("click", () => {
      todos.splice(index, 1);
      save();
      render(list);
    });
    list.appendChild(li);
  });
}