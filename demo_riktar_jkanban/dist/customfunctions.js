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
    var formItem = document.createElement("form");
    formItem.setAttribute("class", "itemform");
    formItem.innerHTML = `<div class="form-group"><textarea class="form-control" rows="2" autofocus>${title}</textarea></div><div class="form-group"><button type="submit" class="btn btn-primary btn-xs pull-right">Edit</button><button type="button" id="CancelBtn" class="btn btn-default btn-xs pull-right">Cancel</button></div>`;
    KanbanTest.addForm(boardId, formItem);
    
    // Click on Change button
    formItem.addEventListener("submit", function(e) {
        e.preventDefault();
        var text = e.target[0].value;         // get the text in the textarea
        KanbanTest.replaceElement(idItem, {   // replace the item with new info
            id: text,
            title: text
        })
        formItem.parentNode.removeChild(formItem);  // remove form from html structure after modification
    });
   
    // Remove the form when Cancel button is clicked
    document.getElementById("CancelBtn").onclick = function() {
        formItem.parentNode.removeChild(formItem);
    };
}

/** Disable creation and edit 
 * When the user clicks on an item, we deactivate the "+ add new card" button and the fact of 
 * being able to click on the item again.
 */
function disableAction(){
    
}


function deleteIcon(){
    return '<svg width="24" height="24" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M9.87871 14.1213L12 12M14.1213 9.87868L12 12M12 12L9.87871 9.87868M12 12L14.1213 14.1213" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/> <path d="M21 3.6V20.4C21 20.7314 20.7314 21 20.4 21H3.6C3.26863 21 3 20.7314 3 20.4V3.6C3 3.26863 3.26863 3 3.6 3H20.4C20.7314 3 21 3.26863 21 3.6Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
}