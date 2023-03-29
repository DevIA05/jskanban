/** Update in databse the position
 * depending on the element if it is an board or a task, 
 * we will apply the corresponding method
 * @param {Object} element,  
 */
function sendBoardPosition(element){
    const order = element.getAttribute('data-order');
    const id = element.getAttribute('data-id');
    dataRequest(data = {"order": order, "id": id}, 
                url = "api/colonne",
                type = "POST")
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

        },
        failure: function () {
            alert("failure");
        }
    })
 }
