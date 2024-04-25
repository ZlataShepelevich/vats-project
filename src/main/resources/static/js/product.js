var isItWorkHourNow = false;
const joinMeetingBtn = document.getElementById("joinMeetingBtn");
function handleJoinMeeting() {
    const url = `http://localhost:8080/html/call.html?roomID=support&username=Customer`;

    if(isItWorkHourNow)    window.open(url, "_blank");
}


function createCall(event) {
    if(isItWorkHourNow) {
        event.preventDefault();
        const connectedUser = JSON.parse(localStorage.getItem('connectedUser'));

        const call = {
            caller: `${connectedUser.username}`,
            receiver: "customer",
            callStartTime: new Date()
        };
        fetch('http://localhost:8080/api/v1/calls', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(call)
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response;
        }).catch(error => {
            console.error('POST request error:', error);
        });
    }
}

function handleCall(event) {
    if(isItWorkHourNow) {
        event.preventDefault();

        fetch('http://localhost:8080/api/v1/calls/call', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify("call")
        }).then(response => {
            if (!response.ok) {
                alert('Call is incorrect');
            }
            return response;
        }).catch(error => {
            console.error('POST request error', error);
        });
    }
}
function showElement() {
    if(!isItWorkHourNow) {
        var custInfoElement = document.querySelector('.info-cust');
        custInfoElement.style.display = 'flex';
    }
}

function hideElement() {
    var custInfoElement = document.querySelector('.info-cust');
    custInfoElement.style.display = 'none';
}

function handleInfo(event) {
    event.preventDefault();

    const customerName = document.getElementById("customerName").value;
    const customerEmail = document.getElementById("customerEmail").value;
    const problem = document.getElementById("problem").value;

    const customer = {
        customerName: customerName,
        customerEmail: customerEmail,
        problem: problem,
        status: false
    };
    fetch('http://localhost:8080/api/v1/customers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer)
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response;
    }).then(() => {
        hideElement();
    }).catch(error => {
        console.error('POST request error:', error);
    });

}


function loadUsers() {
    fetch('http://localhost:8080/api/v1/users',{
        method: 'GET',
    }).then((response) => {
        return response.json();
    })
        .then((data) => {
            handleWorkHoursOfUsers(data);
        });
}

function handleWorkHoursOfUsers(userList) {
    const supportTextElement = document.getElementById("supportText");
    var currentDate = new Date();

    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;

    var formattedTime = hours + ":" + minutes + ":" + "00";
    userList.forEach(user => {
        if(user.startHour <= formattedTime && user.endHour >= formattedTime) {isItWorkHourNow = true;}
        supportTextElement.innerHTML = user.offHoursMessage;
    });
}

window.addEventListener("load", loadUsers);

joinMeetingBtn.addEventListener("click", loadUsers);
joinMeetingBtn.addEventListener("click", handleJoinMeeting);
joinMeetingBtn.addEventListener("click", createCall);
joinMeetingBtn.addEventListener("click", handleCall);
joinMeetingBtn.addEventListener("click", showElement);

const customerForm = document.getElementById("customerForm");
customerForm.addEventListener("submit", handleInfo);