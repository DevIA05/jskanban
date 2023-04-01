/** Update in databse the position
 * depending on the element if it is an board or a task, 
 * we will apply the corresponding method
 * @param {Object board} element,  
 */
function sendBoardPosition(element){
    const order = element.getAttribute('data-order');
    const id = element.getAttribute('data-id');
    dataRequest(data = {"order": order, "id": id}, 
                url = "api/colonne",
                type = "POST")
}

/** Get and regroup data in order to edit task
 * 
 * @param {int} id 
 * @param {string} title 
 */
function sendEditTitle(id, title, code){
    dataRequest(
        data = {"id": id,  "title": title, "code": code},
        url = "api/task",
        type = "POST")
}

/** Get information of new tasks positions
 * 
 * @param {ObjectTask} el 
 * @param {ObjectBoard} target 
 */
function extractTaskPositionInformations(el){
       
    idTask  = el.getAttribute('data-eid')            // On récupère l'id de la tâche    
    idBoard = KanbanTest.getParentBoardID(idTask)    //   qui permettra de récupèrer l'id du board       
    nodeList = KanbanTest.getBoardElements(idBoard)  //   et ainsi récupèrer la liste des tâches indexes selon leur positionnement (dans le board)        
    
    const dataEids = [];
    nodeList.forEach(item => {
        const dataEid = item.getAttribute('data-eid');
        dataEids.push(dataEid);
    });
  
    dataRequest(
        data = { "idBoard": idBoard, "idTasks": dataEids},
        url = "api/tasks",
        type = "POST"
    )    
}

function addTask(title, boardId){
    dataRequest(
        data = {"title": title, "boardId": boardId},
        url = "api/task-add",
        type = "POST"
    )
}

function dataRequest(data, url, type){
    const csrf  = $('input[name="csrfmiddlewaretoken"]').val()   // collect token
    // ------------------- Send data to view -------------------
    $.ajax({
        type: type,
        url: url, // Name of the django view that will retrieve the data, 
                                // Perform an asynchronous HTTP (Ajax) request. 
        data: {
            csrfmiddlewaretoken : csrf,
            "data": data,       // data to send
        },
        dataType: "json",     // The type of data that you're expecting back from the server.
        // ------------------- Receiving data from the view -------------------
        success: function (response) {
            console.warn("============  RESPONSE ==============")
            // if(response["code"] == "addTask"){
            //     KanbanTest.replaceElement(-1, {              // replace the item with new info
            //         id: reponse["idTask"]
            //     })
            //}

        },
        failure: function () {
            alert("failure");
        }
    })
 }
