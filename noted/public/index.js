window.onload = async () => {
    await fetchAndDisplayTasks();
    // initLoginForm();
};

// function initLoginForm() {
//     const loginForm = document.getElementById("login-form");
//     loginForm.addEventListener("submit", async function (event) {
//         event.preventDefault();
//         console.log("submit!");

//         const username = loginForm.username.value;
//         const password = loginForm.password.value;
//         const formObject = { username, password };
//         console.log(formObject);

//         const res = await fetch("/login", {
//             method: "POST",
//             headers: {
//                 "content-type": "application/json",
//             },
//             body: JSON.stringify(formObject),
//         });
//         // const data = await res.json();

//         if (res.status === 200) {
//             window.location = "/admin.html";
//         }
//     });
// }

async function deleteTask(taskID) {
    const res = await fetch(`/tasks/${taskID}`, {
        method: "DELETE",
    });
    if (res.status === 200) {
        fetchAndDisplayTasks();
    }
    if (res.status === 400) {
        const data = await res.json();
        alert(data.message);
    }
}
// fetch
// async function editTask(taskID) {
//     const content = document.getElementById(`content-${taskID}`).value;
//     const res = await fetch(`/tasks/${taskID}`, {
//         method: "PUT",
//         headers: {
//             "content-type": "application/json",
//         },
//         body: JSON.stringify({ content }),
//     });
//     if (res.status === 200) {
//         fetchAndDisplayTasks();
//     }
// }

async function fetchAndDisplayTasks() {
    const res = await fetch("/tasks");
    const data = await res.json();
    console.log(data);

    let htmlStr = ``;
    for (const tasks of data) {
        htmlStr += `
        <div class="card">
        <div class="card-head">
            <h1>${tasks.title}</h1>
            <div class="dropdown">
                <a class="btn" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fas fa-ellipsis-h"></i>
                </a>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li>
                  </li>
                  <li><a class="dropdown-item" onclick="deleteTask(${tasks.id})">Delete</a></li>
                </ul>
              </div>
        </div>
        <div class="card-body">
            <p>${tasks.content}</p>
        </div>
        <div class="card-foot">
            <h5>${tasks.status}</h5>
            <h5>${tasks.due_date}</h5>
            <div class="assignto">${tasks.assign_to}</div>
        </div>
</div>`;
    }
    document.querySelector(".card-area").innerHTML = htmlStr;
}

// create tasks
document
    .querySelector("#tasks-form")
    .addEventListener("submit", async function (event) {
        event.preventDefault();
        console.log("submit");
        const form = event.target;

        const formData = new FormData();
        formData.append("title", form.title.value);
        formData.append("content", form.content.value);
        formData.append("status", form.status.value);
        formData.append("assign_to", form.assign_to.value);
        formData.append("due_date", form.due_date.value);

        const res = await fetch("/tasks", {
            method: "POST",
            body: formData,
        });
        const result = await res.json();

        if (res.status === 200 && result.success) {
            form.reset();
            fetchAndDisplayTasks();
        }
    });
