function loadAndDisplayUsers() {

    const connectedUser = localStorage.getItem('connectedUser');
    if (!connectedUser) {
        window.location = '/html/login.html';
        return;
    }


    const userListElement = document.getElementById("userList");
    userListElement.innerHTML = "Loading...";
    // Retrieve the userList from Local Storage
    fetch('http://localhost:8080/api/v1/users',{
        method: 'GET',
    }).then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            displayUsers(data, userListElement);
        });
}

function displayUsers(userList, userListElement) {
    userListElement.innerHTML = "";

    userList.forEach(user => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
                <div class="userList">
                    <i class="fa fa-user-circle"></i> ${user.username} <i class="user-email">(${user.email})</i> <i class="fa fa-lightbulb-o ${user.status === "online" ? "online" : "offline"}"></i>
                    <p>Work time: ${user.startHour} - ${user.endHour}</p>
                    <p>Off-Hours Message: ${user.offHoursMessage}</p>
                </div>                
            `;
        userListElement.appendChild(listItem);
    });
}

window.addEventListener("load", loadAndDisplayUsers);


function handleLogout() {
    // console.log(localStorage.getItem('connectedUser'));
    const connectedUserObject = JSON.parse(localStorage.getItem('connectedUser'));
    const userEmail = connectedUserObject.email;
    fetch('http://localhost:8080/api/v1/users/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: userEmail
    })
        .then((response) => {
            return response;
        })
        .then((data) => {
            localStorage.removeItem('connectedUser');
            window.location.href = "login.html";
        });
}

const logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener("click", handleLogout);


function handleJoinMeeting() {
    //const roomId = document.getElementById("meetingName").value;
    const connectedUser = JSON.parse(localStorage.getItem('connectedUser'));

    const url = `http://localhost:8080/html/call.html?roomID=support&username=${connectedUser.username}`; // /html/call.html?roomID=${roomId}&username=${connectedUser.username}

    window.open(url, "_blank");
}

const joinMeetingBtn = document.getElementById("joinMeetingBtn");
joinMeetingBtn.addEventListener("click", handleJoinMeeting);
joinMeetingBtn.addEventListener("click", stopCall);

const musicPlayer = document.getElementById('music-player');

function loadAndDisplayIncomingCall() {
    const callStatus = document.getElementById("callStatus");
    callStatus.innerHTML = "";
    fetch('http://localhost:8080/api/v1/calls/call',{
        method: 'GET',
    }).then((response) => {
        return response.json();
    })
        .then((data) => {
            displayCallStatus(data, callStatus);
        });
}

function displayCallStatus(callStatusStr, callStatus) {
    if(`${callStatusStr.message}` === "call" && musicPlayer.paused){
        musicPlayer.play();
    }
}

var intervalId = setInterval(loadAndDisplayIncomingCall, 1000);

function stopCall(event) {
    event.preventDefault();

    fetch('http://localhost:8080/api/v1/calls/stop-call', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify("stop")
    }).then(response => {
        if (!response.ok) {
            alert('Call is incorrect');
        }
        return response;
    }).catch(error => {
        console.error('POST request error', error);
    });
}

document.getElementById('productPageBtn').addEventListener('click', function() {
    window.location.href = '/html/product-page.html';
});