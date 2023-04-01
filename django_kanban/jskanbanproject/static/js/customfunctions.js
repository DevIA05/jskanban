/** SVG delete icon
 * 
 * @returns {string}, svg tag
 */
function deleteIcon(){
    return '<svg width="24" height="24" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M9.87871 14.1213L12 12M14.1213 9.87868L12 12M12 12L9.87871 9.87868M12 12L14.1213 14.1213" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/> <path d="M21 3.6V20.4C21 20.7314 20.7314 21 20.4 21H3.6C3.26863 21 3 20.7314 3 20.4V3.6C3 3.26863 3.26863 3 3.6 3H20.4C20.7314 3 21 3.26863 21 3.6Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
}

/** Adds the content editable attribute to all elements that have kanban-title-board class 
*/
function addContenteditableToBoards() {
    const boards = document.getElementsByClassName("kanban-title-board");
    for (var i = 0; i < boards.length; i++) {
        boards[i].setAttribute("contenteditable", true)
        editTitle(boards[i])
    }
}

/** Adds the content editable attribute to all title that have kanban-item class 
*/
function addContenteditableToTasks() {
    // Get all elements with class "kanban-item"
    const kanbanItems = document.querySelectorAll(".kanban-item");
    // Add the "contenteditable" attribute to each "div" element inside "kanban-item" except 
    // div with .item_handle.drag_handler class
    kanbanItems.forEach(function(kanbanItem) {
        const taskDiv = kanbanItem.querySelector("div:not(.item_handle.drag_handler)");
        taskDiv.setAttribute("contenteditable", true);
        editTitle(taskDiv)
    });
}

/** Add to each element with the contenteditable attribute
 *  a function that triggered when focus is lost and
 *  when keydown is pressed trigger the previous function. 
 */ 
function editTitle(element) {
    // Add a "keydown" event listener to each element
    element.addEventListener("keydown", function(event) {
        // Check if the "Enter" key is pressed
        if (event.keyCode === 13) {
            // Prevent the creation of a new line
            event.preventDefault();
            // Validate the entered text
            element.blur();
        }
    });
    // Add a "blur" event listener to each element
    // When the user leaves the element (loses focus), the function is called
    element.addEventListener("blur", function() {
        // Get the entered text
        const text = element.textContent;
        // Get the id of the task or board depending on the class
        // of the closest element that matches a given selector by
        // walking up the DOM tree
        let id; let code;
        if (element.parentNode.classList.contains('kanban-item')) {
            id = element.parentNode.dataset.eid;
            code = "task"
        } else if (element.parentNode.parentNode.classList.contains('kanban-board')) {
            id = element.parentNode.parentNode.dataset.id;
            code = "board"
        }
        console.log(code + " ----- " + id)
        sendEditTitle(id, text, code)
    });
}

function addContenteditableToTask(id){
    const task = KanbanTest.findElement(id)
    taskTitle = task.querySelector("div:not(.item_handle.drag_handler)");
    taskTitle.setAttribute("contenteditable", true)
    editTitle(taskTitle)
}

function addContenteditableToBoard(id){
    const board = KanbanTest.findBoard(id)
    console.log(board)
    boardTitle = board.querySelector(".kanban-title-board");
    boardTitle.setAttribute("contenteditable", true)
    editTitle(boardTitle)
}

addContenteditableToBoards()
addContenteditableToTasks()