export default class KanbanAPI {
    
    /** Get the tasks of a column
     * 
     * @param {int} columnId, column id
     * @returns {array} the list of task objects
     */
    static getItems(columnId){
        const column = read().find(column => column.id == columnId);
        if(!column){       // Si la colonne est vide,
            return [];        
        }
        return column.items;
    }

    /** Add a task in a specific column
     * 
     * @param {int} columnId, column id
     * @param {str} content, 
     * @returns task object
     */
    static insertItem(columnId, content){
        const data = read()
        const column = data.find(column => column.id == columnId);
        const item = {
            id: Math.floor(Math.random() * 100000),
            content
        };
        if(!column){
            throw new Error("Column does not exist.");
        }
        column.items.push(item);
        save(data);
        return item;
    }

    /** Update task content and position 
     * 
     * @param {int} itemId, task id
     * @param {Object} newProps, task object with new informations 
     */
    static updateItem(itemId, newProps){
        
        const data = read();
        const [item, currentColumn] = (() => {
            for(const column of data){
                const item = column.items.find(item => item.id == itemId);
                if(item){
                    return [item, column];
                }
            }
        })();

        if(!item){
            throw new Error("Item not found.")
        }

        item.content = newProps.content === undefined ? item.content : newProps.content;

        // Update column and position
        if(newProps.columnId !== undefined && newProps.position !== undefined){
            const targetColumn = data.find(column => column.id == newProps.columnId);
            if(!targetColumn){
                throw new Error("Target column not found.");
            }

            // Delete the item from it's current column
            currentColumn.items.splice(currentColumn.items.indexOf(item), 1)

            // Move item into it's new column and position
            targetColumn.items.splice(newProps.position, 0, item);
        }

        save(data)
        
    }

    /** Delete a specific task
     * 
     * @param {int} itemId, task id 
     */
    static deleteItem(itemId){
        const data = read()
        for(const column of data){
            const item = column.items.find(item => item.id == itemId)
            if(!item){ 
                column.items.splice(column.items.indexOf(item), 1);
             }
        }
    }

}

/** Get Data ...
 * 
 * @returns {Object} task object
 */
function read(){
    const json = localStorage.getItem("kanban-data");

    // If no data is found with this key, the function returns an array containing three objects 
    //   representing three empty columns of the kanban board with respective "id" identifiers 
    //   of 1, 2 and 3.
    if(!json){
        return [
            {
                id: 1,       // Colonne
                items: []    // Contenu des colonnes [{id: tache, content: titre}]
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