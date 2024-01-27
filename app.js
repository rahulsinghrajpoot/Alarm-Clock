const hourDropdown = document.querySelector("#hour-select");

const todaysDate = document.querySelector("#date");
const todaysTime = document.querySelector("#time");

const alarmSetBtn = document.querySelector("#setAlarmBtn");
const alarmHour = document.querySelector("#hour-select");
const alarmMinute = document.querySelector("#minute-select");
const alarmMode = document.querySelector("#amPM");


for(let h=1; h<=12; h++){
    let hourOption = document.createElement("option");
    hourOption.value = prependZero(h);
    hourOption.text = prependZero(h);
    hourDropdown.append(hourOption);
}


const minuteDropdown = document.querySelector("#minute-select");
for(let i=0; i<=59; i++){
    const minOption = document.createElement("option");
    minOption.value = prependZero(i);
    minOption.text = prependZero(i);
    minuteDropdown.append(minOption);
}

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
]

function prependZero(number){
    if(number < 10){
        return "0"+number;
    }else{
        return number;
    }
}

function updateDate() {
    const date = new Date();
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    todaysDate.innerText = `${day} ${month} ${year}`;
}

function updateTime() {
    const date = new Date();
    let hour = date.getHours();
    let newFormat = hour >= 12? "PM" : "AM";
    hour = hour % 12;
    hour = hour ? hour : 12;
    let minute = date.getMinutes();
    let second  = date.getSeconds();

    todaysTime.innerText = `${prependZero(hour)}:${prependZero(minute)}:${prependZero(second)} ${newFormat}`;
}

updateDate();
setInterval(updateTime, 1000);


function deleteAlarm(event){
    const listItem = event.target.closest("li");
    if(listItem){
        uList.removeChild(listItem);
    }
    alert(`Your alarm is deleted successfully.`);
}

function checkAlarms() {
    const currentTime = new Date();
    let currentHour = currentTime.getHours();
    let currentFormat = currentHour >= 12? "PM" : "AM";
    currentHour = currentHour % 12;
    currentHour = currentHour ? currentHour : 12;
    const currentMinute = currentTime.getMinutes();

    const alarmItems = document.querySelectorAll(".myList");

    alarmItems.forEach(alarmItem => {
        const timeParah = alarmItem.querySelector(".timeparah p");
        const [alarmHourMinute, alarmMode] = timeParah.textContent.split(" ");
        const [alarmHour, alarmMinute] = alarmHourMinute.split(":");
        if (parseInt(alarmHour) === currentHour && parseInt(alarmMinute) === currentMinute && alarmMode.trim() === currentFormat) {
            playRingtone();

            alarmItem.remove();
        }
    });
}

function playRingtone() {
    const ringtone = new Audio("alarmTone.mp3"); 
    ringtone.play();
}

setInterval(checkAlarms, 1000);


const uList = document.querySelector(".alarmList");

alarmSetBtn.addEventListener("click", () => {
    
    const newListItem = document.createElement("li");
    newListItem.className= "myList";

    newListItem.innerHTML = `
        <div class="myDiv">
            <div class="timeparah">
                <p>${alarmHour.value}:${alarmMinute.value} ${alarmMode.value}</p>
            </div>
            <div>
                <button class="deletebtn">Delete</button>
            </div>
        </div>
    `;

    uList.appendChild(newListItem);

    newListItem.style = "height: 25%;";

    let maindiv = newListItem.querySelector(".myDiv");
    maindiv.style = "height: 90%; display: flex; flex-direction: row; justify-content: space-between; align-items: center; box-shadow:5px 5px 5px 5px lightgray; margin:5px; border-radius: 1rem;";

    let parah = newListItem.querySelector(".timeparah");
    parah.style = "font-size: 1.2rem; padding-left: 50px;";

    let btn = newListItem.querySelector(".deletebtn");
    btn.style = "margin-right: 50px; border-radius: 1rem; padding: 5px; font-weight: bold;";

    const deletebtn = newListItem.querySelector(".deletebtn");
    deletebtn.addEventListener("click", deleteAlarm);

    checkAlarms();

    alert(`Your alarm of time ${alarmHour.value}:${alarmMinute.value} ${alarmMode.value} added Successfully!`);
});

         
