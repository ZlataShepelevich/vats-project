function loadAndDisplayMessages() {

    const connectedUser = localStorage.getItem('connectedUser');
    if (!connectedUser) {
        window.location = '/html/login.html';
        return;
    }


    const messageListElement = document.getElementById('myTable').getElementsByTagName('tbody')[0]; // document.getElementById("messageList")

    fetch('http://localhost:8080/api/v1/customers',{
        method: 'GET',
    }).then((response) => {
        return response.json();
    })
        .then((data) => {
            displayMessages(data, messageListElement);
        });
}

function changeStatus(event, id, custStatus) {
    event.preventDefault();

    fetch('http://localhost:8080/api/v1/customers/changeStatus', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: id, status: custStatus})
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response;
    })
        .catch(error => {
            console.error('POST request error:', error);
        });
}

function displayMessages(messageList, messageListElement) {

    messageListElement.innerHTML = '';

    messageList.forEach(customer => {
        var row = messageListElement.insertRow(-1); // -1 для добавления строки в конец
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);

        cell1.innerHTML = `${customer.customerName}`;
        cell2.innerHTML = `${customer.customerEmail}`;

        cell2.addEventListener("click", function() {
            if (customer && customer.customerEmail) {
                window.open(`mailto:${customer.customerEmail}`, "_blank");
            }
        });

        cell3.innerHTML = `${customer.problem}`;
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        checkbox.checked = customer.status;

        checkbox.addEventListener('change', function(event) {
            changeStatus(event, customer.id, customer.status);
        });

        cell4.appendChild(checkbox);
    });
}

window.addEventListener("load", loadAndDisplayMessages);