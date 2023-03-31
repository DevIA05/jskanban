console.log(KanbanTest)

/** Modify the information of a task
 * 
 * @param {Object} el, html structure of clicked element  
 */
function modifyTask(el){
    
    // Extract attribute
    const title = el.textContent
    const idItem = el.getAttribute("data-eid")
    const boardId = KanbanTest.getParentBoardID(idItem)

    // Create form to edit the text
    const formItem = document.createElement("form");
    formItem.setAttribute("class", "itemform");
    formItem.innerHTML = `<div class="form-group"><textarea class="form-control" rows="2" autofocus>${title}</textarea></div><div class="form-group"><button type="submit" class="btn btn-primary btn-xs pull-right">Edit</button><button type="button" onclick="cancelForm(this)" class="btn btn-default btn-xs pull-right">Cancel</button></div>`;
    KanbanTest.addForm(boardId, formItem);
    
    // Click on Change button
    formItem.addEventListener("submit", function(e) {
        e.preventDefault();
        const form = e.target.closest("form");           // Get html tag form parent
        console.warn(form)
        const textarea = form.querySelector("textarea"); // Retrieve the textarea inside the form
        const text = textarea.value;                     // Get textarea value
        KanbanTest.replaceElement(idItem, {              // replace the item with new info
            title: text
        })
        form.remove(); // remove form from html structure after modification
        sendEditTask(idItem, text)
    });
}

/** Deletes the form
 * where the clicked cancel button is contained
 * @param {Object} btnCancel 
 */
function cancelForm(btnCancel){
    const form = btnCancel.closest('form');
    form.remove();
}

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
    });
}

/** Add to each element with the contenteditable attribute
 *  a function that triggered when focus is lost and
 *  when keydown is pressed trigger the previous function. 
 */ 
function editTitles() {
    const editableDivs = document.querySelectorAll("[contenteditable]");
    editableDivs.forEach(function(editableDiv) {
        // Add a "keydown" event listener to each element
        editableDiv.addEventListener("keydown", function(event) {
            // Check if the "Enter" key is pressed
            if (event.keyCode === 13) {
                // Prevent the creation of a new line
                event.preventDefault();
                // Validate the entered text
                editableDiv.blur();
            }
        });
        // Add a "blur" event listener to each element
        // When the user leaves the element (loses focus), the function is called
        editableDiv.addEventListener("blur", function() {
            // Get the entered text
            const text = editableDiv.textContent;
            // Get the id of the task or board depending on the class
            // of the closest element that matches a given selector by
            // walking up the DOM tree
            let id;
            if (editableDiv.closest('.kanban-board[data-id]')) {
                id = editableDiv.closest('.kanban-board[data-id]').dataset.id;
            } else if (editableDiv.closest('.kanban-item')) {
                id = editableDiv.closest('.kanban-item[data-eid]').dataset.eid;
            }
            console.log(id)
        });
    });
}

addContenteditableToBoards()
addContenteditableToTasks()
editTitles()
