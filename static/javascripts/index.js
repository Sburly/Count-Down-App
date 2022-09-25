const checkboxes = document.querySelectorAll("input[type='checkbox']");
const editForms = document.querySelectorAll(".edit-form");
const dateDisplays = document.querySelectorAll(".date-display");
const editButtons = document.querySelectorAll("edit-button");
const dateContainers = document.querySelectorAll(".date-container-display");

for(let checkbox of checkboxes) {
    checkbox.addEventListener("change", function(){
        const index = Array.prototype.indexOf.call(checkboxes, this);
        editForms[index].classList.toggle("noDisplay");
        dateDisplays[index].classList.toggle("noDisplay");
        dateContainers[index].classList.toggle("changeBorder");
    });
}

for(let btn of editButtons) {
    btn.addEventListener("click", function(){
        const index = Array.prototype.indexOf.call(editButtons, this);
        editForms[index].classList.toggle("noDisplay");
        dateDisplays[index].classList.toggle("noDisplay");
        dateContainers[index].classList.toggle("changeBorder");
    });
};

const getTimeDifference = function(dt){
    const date = new Date(dt.date + " " + dt.time + ":00");
    // We get today's datetime
    let today = new Date();
    const todayDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const todayTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    today = new Date(todayDate +' '+ todayTime);
    // We calculate the difference in milliseconds
    let diffInMilliSeconds = Math.abs(date - today) / 1000;
    // Calculate days
    const days = Math.floor(diffInMilliSeconds / 86400);
    diffInMilliSeconds -= days * 86400;
    // Calculate hours
    const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
    diffInMilliSeconds -= hours * 3600;
    // Calculate minutes
    const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
    diffInMilliSeconds -= minutes * 60;

    let difference = '';
    let differenceDays = "";
    let differenceHs = "";
    let differenceMins = "";
    let timeSpan = []
    if (days > 0) {
        differenceDays = (days === 1) ? `${days} day` : `${days} days`;
        timeSpan.push(differenceDays);
    };
    if (hours > 0) {
        differenceHs = (hours === 0 || hours === 1) ? `${hours} hour ` : `${hours} hours`;
        timeSpan.push(differenceHs);
    };
    if (minutes > 0) {
        differenceMins = (minutes === 0 || hours === 1) ? `${minutes} minutes` : `${minutes} minutes`;
        timeSpan.push(differenceMins);
    };
    if(timeSpan.length > 1) {
        difference = timeSpan.join(", ")
        const lastIndex = difference.lastIndexOf(",");
        const and = " and"
        difference = (difference.substring(0, lastIndex) + and + difference.substring(lastIndex + 1)).trim("and ");
    } else {
        difference = timeSpan.join();
    }
    if(((date - today) / 1000) < 0) return difference + " ago";
    else return difference + " left";
};

async function updateTimeDifferences() {
    for(let date of datesJS) {
        const diff = getTimeDifference(date);
        const diffDisplay = document.querySelector(`h3[id="${date._id}"][class="time-difference"]`);
        diffDisplay.innerText = diff;
    };
};

const interval = 1000;
setInterval(() => {
    updateTimeDifferences();
}, interval);