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