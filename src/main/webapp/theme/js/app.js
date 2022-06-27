const apiKey = "7a5fff0c-7beb-43b9-a075-beb3484ff5af";
const apiHost = 'https://todo-api.coderslab.pl';

document.addEventListener('DOMContentLoaded', function () {
    apiListTasks();
});


function apiListTasks() {
    fetch(apiHost + "/api/tasks", {
        headers: {
            "Authorization": apiKey
        }
    })
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
            throw new Error("Fetching failed.");
        })
        .then(function (data) {
            data.data.forEach(function (task) {
                renderTask(task.id, task.title, task.description, task.status);
            });
        })
        .catch(function (err) {
            alert("Nie można wczytać danych.");
            console.log(err);
        });
}

function renderTask(taskId, title, description, status) {
    const main = document.querySelector("main");
    const section = document.createElement("section");
    section.className = 'card mt-5 shadow-sm';
    main.appendChild(section);

    const headerDiv = document.createElement("div");
    headerDiv.className = 'card-header d-flex justify-content-between align-items-center';
    section.appendChild(headerDiv);

    const headerLeftDiv = document.createElement("div");
    headerDiv.appendChild(headerLeftDiv);

    const h5 = document.createElement("h5");
    h5.innerText = title;
    headerLeftDiv.appendChild(h5);

    const h6 = document.createElement("h6");
    h6.className = "card-subtitle text-muted";
    h6.innerText = description;
    headerLeftDiv.appendChild(h6);

    const headerRightDiv = document.createElement('div');
    headerDiv.appendChild(headerRightDiv);

    if(status === "open") {
        const finishButton = document.createElement("button");
        finishButton.className = 'btn btn-dark btn-sm js-task-open-only';
        finishButton.innerText = 'Finish';
        headerRightDiv.appendChild(finishButton);
    }

    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-outline-danger btn-sm ml-2';
    deleteButton.innerText = 'Delete';
    headerRightDiv.appendChild(deleteButton);
}
