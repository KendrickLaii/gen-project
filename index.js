function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
const displayArea = document.querySelector('#cardArea');

//edit Modal
const editId =document.querySelector('#editId')
const editName = document.querySelector("#editName");
const editDueDate = document.querySelector("#editDueDate");
const editAssignedTo = document.querySelector("#editAssignedTo");
const editDescription = document.querySelector("#editDescription");
const editStatus = document.querySelector("#editStatus");

const btnEditSubmit = document.querySelector("#editSubmit");

//GET CARD function
const getCard = async(e) => {
    const data = await fetch('http://localhost:8080/todolist');
    const jsonResponse = await data.json();
    let displayHTML = "";
    for (let i of jsonResponse) {
        displayHTML = displayHTML + `
        
        <div class="col-12">
        <div id="card-section" data-id=${i.id}>
            <div class="card-custom">
                <div class="de-btn">
                    <p class="card-id" style="display: none;">${i.id}</p>
                    <button id="del-card" class="btn btn-outline-danger" type="button">
                        <i class="far fa-trash-alt"></i>
                    </button>
                    <!-- Button trigger modal -->
                    <button id="edit-card" type="button" class="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#Task1Modal">
                        <i class="far fa-edit"></i>
                    </button>
                </div>
                <div class="left-container">
                    <h1 class="card-name">
                        ${i.name}
                    </h1>
                    <p>Due Date: <span class="DueDate">${i.duedate}</span></p>
                    <p>Assigned To: <span class="AssignedTo">${i.assignedto}</span></p>
                </div>

                <div class="card-description">
                    <h2>Description:</h2>
                    <p class="description">${i.description}</p>
                </div>
                

                <div class="center-container">
                    <h3 class="status">${i.status}</h3>    
                </div>

                
            </div>
        </div>
    </div>
            
        `
    }
    displayArea.innerHTML = displayHTML
}

getCard()

//Post the card list
const fetchCardData = document.querySelector('#cardSubmit')
fetchCardData.addEventListener('submit', async(e) => {
    e.preventDefault();
    const inputData = e.target;
    const cardOjb = {};
    cardOjb['id'] = Math.floor(Math.random()*1000)
    cardOjb['name'] = inputData.itemName.value;
    cardOjb['description'] = inputData.remarks.value;
    cardOjb['assignedto'] = inputData.assignedto.value;
    cardOjb['duedate'] = inputData.DueDate.value;
    cardOjb['status'] = inputData.inputState.value;

    const response = await fetch('http://localhost:8080/todolist', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(cardOjb),
    });
    let jsonResponse = await response.json();
    getCard()
})


displayArea.addEventListener('click', async (e) => {
    e.preventDefault();
    let delCardIsPressed = e.target.id == 'del-card'
    let editCardIsPressed = e.target.id == 'edit-card'

    let id = e.target.parentElement.parentElement.parentElement.dataset.id
    let parent = e.target.parentElement.parentElement.parentElement

    //Delete the card
    if(delCardIsPressed) {
        const response = await fetch(`http://localhost:8080/todolist/${id}`, {
        method: 'DELETE',
    });
    getCard()
    }

    if(editCardIsPressed) {
        const cardDiv = e.target.parentElement.parentElement.parentElement
        let cardId = cardDiv.querySelector('.card-id').textContent;
        let cardName = cardDiv.querySelector('.card-name').textContent;
        let dueDate = cardDiv.querySelector('.DueDate').textContent;
        let assinedTo = cardDiv.querySelector('.AssignedTo').textContent;
        let description = cardDiv.querySelector('.description').textContent;
        let status = cardDiv.querySelector('.status').textContent;
        //console.log(`${cardName},${dueDate},${assinedTo},${description},${status},`)
        editId.value = cardId;
        editName.value = cardName;
        editDueDate.value = dueDate;
        editAssignedTo.value = assinedTo;
        editDescription.value = description;
        editStatus.value = status;
    }
    btnEditSubmit.addEventListener('click', async () => {
        const response = await fetch(`http://localhost:8080/todolist/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: editId.value,
            name: editName.value,
            description: editDescription.value,
            assignedto: editAssignedTo.value,
            duedate: editDueDate.value,
            status: editStatus.value
        })
    })
        getCard()
    })
    

})

