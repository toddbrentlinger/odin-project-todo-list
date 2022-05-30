import { ToDoApp } from './todoApp.js';
import ToDoProject from './todoProject.js';
import ToDo from './todo.js';
import { Priority } from './priorityLevel.js';
import { Repeat } from './repeatType.js';
import { addDays, subDays } from 'date-fns';

import ToDoProjectComponent from './todoProjectComponent.js';
import CreateToDoComponent from './createToDoComponent.js';

import ToDoAppComponent from './todoAppComponent.js';

import './meyer-reset.scss';
import './style.scss';

(function() {
    // Testing
    window.ToDoApp = ToDoApp;
    window.ToDoProject = ToDoProject;
    window.ToDo = ToDo;
    window.Priority = Priority;

    window.ToDoProjectComponent = ToDoProjectComponent;

    //debugger;
    ToDoApp.addProject(
        ToDoProject('default', 
            ToDo('title-2', 'description-2', subDays(Date.now(), 2), Priority.getPriorityLevelByValue(3), Repeat.getRepeatTypeByName('weekly')),
            ToDo('title-1', 'description-1', subDays(Date.now(), 1), Priority.getPriorityLevelByValue(2), Repeat.getRepeatTypeByName('daily')),
            ToDo('title1', 'description1', Date.now(), Priority.getPriorityLevelByValue(1)),
            ToDo('title2', 'description2', addDays(Date.now(), 1), Priority.getPriorityLevelByValue(2), Repeat.getRepeatTypeByName('weekly')),
            ToDo('title3', 'description3', addDays(Date.now(), 3), Priority.getPriorityLevelByValue(3), Repeat.getRepeatTypeByName('monthly'))
        ),
        ToDoProject('personal', 
            ToDo('personal-title1', 'personal-description1', Date.now(), Priority.getPriorityLevelByValue(1)),
            ToDo('personal-title2', 'personal-description2', addDays(Date.now(), 1), Priority.getPriorityLevelByValue(2), Repeat.getRepeatTypeByName('weekly')),
            ToDo('personal-title3', 'personal-description3', addDays(Date.now(), 3), Priority.getPriorityLevelByValue(3), Repeat.getRepeatTypeByName('monthly'))
        ),
        ToDoProject('work', 
            ToDo('work-title1', 'work-description1', Date.now(), Priority.getPriorityLevelByValue(1)),
            ToDo('work-title2', 'work-description2', addDays(Date.now(), 1), Priority.getPriorityLevelByValue(2), Repeat.getRepeatTypeByName('weekly')),
            ToDo('work-title3', 'work-description3', addDays(Date.now(), 3), Priority.getPriorityLevelByValue(3), Repeat.getRepeatTypeByName('monthly'))
        )
    );

    //document.querySelector('main').replaceWith(ToDoProjectComponent(ToDoApp.getProjectByName('default')).render());
    document.getElementById('content').replaceWith(ToDoAppComponent().render());

})();