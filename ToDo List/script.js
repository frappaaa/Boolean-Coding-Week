const button = document.querySelector("button");
const inputField = document.querySelector("input");
const todoList = document.querySelector(".todo-list");
const emptyListMessage = document.querySelector(".empty-list-message");

const StorageKey = "__loop__";
let activities = [];
const storage = localStorage.getItem(StorageKey);
if (storage) {
  activities = JSON.parse(storage);
}

showContent();

button.addEventListener("click", function () {
  const newActivity = inputField.value.trim();
  if (newActivity.length > 0) {
    addActivity(newActivity);
  }
});

// # FUNZIONI

//mettere le attività in lista
function showContent() {
  todoList.innerText = "";
  emptyListMessage.innerText = "";

  if (activities.length > 0) {
    activities.forEach(function (activity, index) {
      //crea un template HTML
      const template = createActivityTemplate(activity);

      //inserisci in pagina
      todoList.innerHTML += template;
    });
    makeCheckClickable();
  } else {
    emptyListMessage.innerText = "Sembra non ci siano attività";
  }
}

//funzione per rendere i check cliccabili
function makeCheckClickable() {
  const checks = document.querySelectorAll(".todo-check");

  checks.forEach(function (check, index) {
    check.addEventListener("click", function () {
      activities.splice(index, 1);
      //aggiorna localStorage
      localStorage.setItem(StorageKey, JSON.stringify(activities));
      // aggiorna la lista in pagina
      showContent();
    });
  });
}

//funzione per aggiungere un'attività
function addActivity(activity) {
  activities.push(activity);
  localStorage.setItem(StorageKey, JSON.stringify(activities));
  showContent();
  inputField.value = "";
}

//funzione che crea un template HTML
function createActivityTemplate(activity) {
  return `<li class="todo-item"> <div class = "todo-check" >
                    <img src = "images/check.svg" alt = "Check Icon" / >
                    </div> <p class = "todo-text" > ${activity}</p> </li>`;
}
