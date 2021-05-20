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

async function getTaskByIdAndEditTask(taskID) {
    //fetch the old date into the edit form;
    const editRes = await fetch(`/tasks/${taskID}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const editData = await editRes.json();
    console.log(editData);
    let htmlStr1 = ``;
    for ( const task of editData) {
        htmlStr1 += `
        <form name="edit-tasks-form" id="edit-tasks-form" action="/tasks" method="POST">
        <div class="mb-3">
          <label for="edit-title" class="col-form-label">Title:</label>
          <input type="text" name="edit-title" id="edit-title" value="" class="form-control">
          <div id="hello">${task.id}</div>
        </div>
        <div class="mb-3">
          <label for="edit-content" class="col-form-label">Content:</label>
          <input type="text" name="edit-content" id="edit-content" class="form-control"></input>
        </div>
        <div class="mb-3">
          <label for="edit-status" class="col-form-label">Status:</label>
          <input type="text" name="edit-status" id="edit-status" class="form-control"></input>
        </div>
        <div class="mb-3">
          <label for="edit-assign_to" class="col-form-label">Assign to:</label>
          <input type="text" name="edit-assign_to" id="edit-assign_to" class="form-control"></input>
        </div>
        <div class="mb-3">
          <label for="edit-due_date" class="col-form-label">Due date:</label>
          <input type="date" name="edit-due_date" id="edit-due_date" class="form-control"></input>
        </div>
        <button type="submit" value="submit" class="btn btn-primary">Submit</button>
      </form>
        `;
        


    }
    document.querySelector(".modal-body").innerHTML = htmlStr1;
    
    






    // const content = document.getElementById(`content-${taskID}`).value;
    // const res = await fetch(`/tasks/${taskID}`, {
    //     method: "PUT",
    //     headers: {
    //         "content-type": "application/json",
    //     },
    //     body: JSON.stringify({ content }),
    // });
    // if (res.status === 200) {
    //     fetchAndDisplayMemos();
    // }
}

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
                       <a class="dropdown-item" data-bs-toggle="modal" data-bs-target="#editModal" onclick="getTaskByIdAndEditTask(${tasks.id})">Edit</a>
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

// creata tasks
document.querySelector("#tasks-form")
    .addEventListener("submit", async function (event) {
        event.preventDefault();
        console.log("submit");
        const inputData = event.target;
        const taskObject = {};
        taskObject['title'] = inputData.title.value;
        taskObject['content'] = inputData.content.value;
        taskObject['status'] = inputData.status.value;
        taskObject['assign_to'] = inputData.assign_to.value;
        taskObject['due_date'] = inputData.due_date.value;

        const res = await fetch("/tasks", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(taskObject)
        });
        const result = await res.json();

        if (res.status === 200 && result.success) {
            inputData.reset();
            fetchAndDisplayTasks();
        }
    });
