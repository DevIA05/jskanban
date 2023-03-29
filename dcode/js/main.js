// import { sayHello } from "./api/module.js";
// console.log(sayHello()); // logs "Hello!" to the console

import KanbanAPI from "./api/KanbanAPI.js";

// ======================================================
//  ====================== Test ========================
// ======================================================

//console.log(KanbanAPI.getItems(3))
//console.log(KanbanAPI.insertItem(1, "quelque chose"));
// KanbanAPI.updateItem(56065, {
//     columnId: 1, 
//     position: 0,
//     content: "I've changed"
// });
KanbanAPI.deleteItem(56065)
