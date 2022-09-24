const checkboxes = document.querySelectorAll("input[type='checkbox']");
const editForms = document.querySelectorAll(".edit-form");
const dateDisplays = document.querySelectorAll(".date-display");
const editButtons = document.querySelectorAll("edit-button");

for(let checkbox of checkboxes) {
    checkbox.addEventListener("change", function(){
        const index = Array.prototype.indexOf.call(checkboxes, this);
        editForms[index].classList.toggle("noDisplay");
        dateDisplays[index].classList.toggle("noDisplay");
    });
}

for(let btn of editButtons) {
    btn.addEventListener("click", function(){
        const index = Array.prototype.indexOf.call(editButtons, this);
        editForms[index].classList.toggle("noDisplay");
        dateDisplays[index].classList.toggle("noDisplay");
    });
}