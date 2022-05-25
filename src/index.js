import ToDoApp from './todoApp.js';
import ToDoProject from './todoProject.js';
import ToDo from './todo.js';
import './style.scss';

(function() {
    window.todoApp = ToDoApp();
    debugger;
    todoApp.addProject(
        ToDoProject('default', 
            ToDo('title1', 'description1', '1/1/11', 1),
            ToDo('title2', 'description2', '2/2/22', 2),
            ToDo('title3', 'description3', '3/3/33', 3)
        )
    );
})();