import { ToDoApp } from './todoApp.js';
import ToDoProject from './todoProject.js';
import ToDo from './todo.js';
import { Priority } from './priorityLevel.js';

import './meyer-reset.scss';
import './style.scss';

(function() {
    // Testing
    window.ToDoApp = ToDoApp;
    window.ToDoProject = ToDoProject;
    window.ToDo = ToDo;
    window.Priority = Priority;

    //debugger;
    ToDoApp.addProject(
        ToDoProject('default', 
            ToDo('title1', 'description1', new Date(2022, 1, 11, 12), Priority.getPriorityLevelByValue(1)),
            ToDo('title2', 'description2', new Date(2022, 2, 22, 12), Priority.getPriorityLevelByValue(2)),
            ToDo('title3', 'description3', new Date(2022, 3, 30, 12), Priority.getPriorityLevelByValue(3))
        )
    );
})();