function loadAndDisplayCalls() {
    const connectedUser = localStorage.getItem('connectedUser');
    if (!connectedUser) {
        window.location = '/html/login.html';
        return;
    }

    fetch('http://localhost:8080/api/v1/calls',{
        method: 'GET',
    }).then((response) => {
        return response.json();
    })
        .then((data) => {
            console.log(data);
            displayCalls(data);
        });
}

function displayCalls(callList) {
    var callDayData = Array(24).fill(0);

    callDayData = callList.reduce(function(acc, call) {
        var startTime = new Date(call.callStartTime);
        var hourOfDay = startTime.getHours();

        acc[hourOfDay] += 1;

        return acc;
    }, callDayData);

    var ctx = document.getElementById('myChart').getContext('2d');

    var data = {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',
            '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24',],
        datasets: [{
            data: callDayData,
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(50, 50, 50, 0.6)',
                'rgba(200, 0, 0, 0.6)',
                'rgba(0, 200, 0, 0.6)',
                'rgba(0, 0, 200, 0.6)',
                'rgba(255, 140, 0, 0.6)',
                'rgba(255, 0, 255, 0.6)',
                'rgba(0, 255, 255, 0.6)',
                'rgba(128, 0, 128, 0.6)',
                'rgba(0, 128, 128, 0.6)',
                'rgba(128, 128, 0, 0.6)',
                'rgba(255, 69, 0, 0.6)',
                'rgba(0, 255, 0, 0.6)',
                'rgba(0, 0, 255, 0.6)',
                'rgba(128, 0, 0, 0.6)',
                'rgba(0, 128, 0, 0.6)',
                'rgba(10, 80, 128, 0.6)',
                'rgba(89, 102, 255, 0.6)',
                'rgba(255, 5, 64, 0.6)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(50, 50, 50, 1)',
                'rgba(200, 0, 0, 1)',
                'rgba(0, 200, 0, 1)',
                'rgba(0, 0, 200, 1)',
                'rgba(255, 140, 0, 1)',
                'rgba(255, 0, 255, 1)',
                'rgba(0, 255, 255, 1)',
                'rgba(128, 0, 128, 1)',
                'rgba(0, 128, 128, 1)',
                'rgba(128, 128, 0, 1)',
                'rgba(255, 69, 0, 1)',
                'rgba(0, 255, 0, 1)',
                'rgba(0, 0, 255, 1)',
                'rgba(128, 0, 0, 1)',
                'rgba(0, 128, 0, 1)',
                'rgba(10, 80, 128, 1)',
                'rgba(89, 102, 255, 1)',
                'rgba(255, 5, 64, 1)'
            ],
            borderWidth: 1
        }]
    };

    var options = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            position: 'right'
        },
        title: {
            display: false,
            text: 'My Chart'
        }
    };

    var myChart = new Chart(ctx, {
        type: 'pie',
        data: data,
        options: options
    });

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;

    callList.forEach(call => {
        call.callStartTime = new Date(call.callStartTime);
    });

    const callsInCurrentMonth = callList.filter(call => {
        const callMonth = call.callStartTime.getMonth() + 1;
        const callYear = call.callStartTime.getFullYear();

        return callMonth === currentMonth && callYear === currentDate.getFullYear();
    });

    const daysInMonth = new Date(currentDate.getFullYear(), currentMonth, 0).getDate();
    const callCountsPerDay = Array.from({ length: daysInMonth }, () => 0);

    callsInCurrentMonth.forEach(call => {
        const dayOfMonth = call.callStartTime.getDate();
        callCountsPerDay[dayOfMonth - 1]++;
    });

    const ctx2 = document.getElementById('secondChart').getContext('2d');


    const secondChart = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: Array.from({ length: daysInMonth }, (_, index) => index + 1),
            datasets: [{
                label: 'Calls',
                data: callCountsPerDay,
                backgroundColor: 'rgba(0, 255, 0, 0.6)',
                borderColor: 'rgba(0, 255, 0, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Day of Month'
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Number of calls'
                    },
                    ticks: {
                        beginAtZero: true,
                        stepSize: 1
                    }
                }]
            }
        }
    });
}

window.addEventListener("load", loadAndDisplayCalls);