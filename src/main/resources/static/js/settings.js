function handleWorkHours(event) {
    event.preventDefault();

    const startHour = document.getElementById("startHour").value;
    const endHour = document.getElementById("endHour").value;
    const connectedUserObject = JSON.parse(localStorage.getItem('connectedUser'));
    const userEmail = connectedUserObject.email;
    fetch('http://localhost:8080/api/v1/users/workTime', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({userEmail: userEmail, startHour: startHour, endHour: endHour})
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

const workTimeBtn = document.getElementById("workTimeBtn");
workTimeBtn.addEventListener("click", handleWorkHours);

function handleOffHoursMessage(event) {
    event.preventDefault();

    const offHoursMessage = document.getElementById("offHoursMessage").value;
    const connectedUserObject = JSON.parse(localStorage.getItem('connectedUser'));
    const userEmail = connectedUserObject.email;
    fetch('http://localhost:8080/api/v1/users/offHoursMessage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({userEmail: userEmail, offHoursMessage: offHoursMessage})
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

const offHoursMessageBtn = document.getElementById("offHoursMessageBtn");
offHoursMessageBtn.addEventListener("click", handleOffHoursMessage);