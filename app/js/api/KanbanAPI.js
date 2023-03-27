export default class KanbanAPI {
    static getItems(columnId){
        const column = read().find(column => column.id == columnId);
        if(!column){
            return [];
        }
        return column.items;
    }

}

/** Get Data
 * 
 * @returns object
 */
function read(){
    const json = localStorage.getItem("kanban-data");

    // If no data is found with this key, the function returns an array containing three objects 
    //   representing three empty columns of the kanban board with respective "id" identifiers 
    //   of 1, 2 and 3.
    if(!json){
        return [
            {
                id: 1,
                items: []
            },
            {
                id: 2,
                items: []
            },
            {
                id: 3,
                items: []
            }
        ];
    }

    return JSON.parse(json);

}

/** Save data
 * 
 * @param {*} data 
 */
function save(data){
    localStorage.setItem("kanban-data", JSON.stringify(data));
}