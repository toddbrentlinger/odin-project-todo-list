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
            ToDo('Default-weekly-3', 'description', subDays(Date.now(), 2), Priority.getPriorityLevelByValue(3), Repeat.getRepeatTypeByName('weekly')),
            ToDo('Default-daily-2', 'description', subDays(Date.now(), 1), Priority.getPriorityLevelByValue(2), Repeat.getRepeatTypeByName('daily')),
            ToDo('Default-once-1', 'description', Date.now(), Priority.getPriorityLevelByValue(1)),
            ToDo('Default-weekly-2', 'description', addDays(Date.now(), 1), Priority.getPriorityLevelByValue(2), Repeat.getRepeatTypeByName('weekly')),
            ToDo('Default-monthly-3', 'description', addDays(Date.now(), 3), Priority.getPriorityLevelByValue(3), Repeat.getRepeatTypeByName('monthly')),
            ToDo('Default-daily-3', 'description', subDays(Date.now(), 2), Priority.getPriorityLevelByValue(3), Repeat.getRepeatTypeByName('daily'))
        ),
        ToDoProject('personal', 
            ToDo('Personal-once-1', 'personal-description1', Date.now(), Priority.getPriorityLevelByValue(1)),
            ToDo('Personal-weekly-2', 'personal-description2', addDays(Date.now(), 1), Priority.getPriorityLevelByValue(2), Repeat.getRepeatTypeByName('weekly')),
            ToDo('Personal-monthly-3', 'personal-description3', addDays(Date.now(), 3), Priority.getPriorityLevelByValue(3), Repeat.getRepeatTypeByName('monthly')),
            ToDo('Personal-monthly-3', 'personal-description3', Date.now(), Priority.getPriorityLevelByValue(1), Repeat.getRepeatTypeByName('daily'))

        ),
        ToDoProject('work', 
            ToDo('Work-once-1', 'work-description1', Date.now(), Priority.getPriorityLevelByValue(1)),
            ToDo('Work-weekly-2', 'work-description2', addDays(Date.now(), 1), Priority.getPriorityLevelByValue(2), Repeat.getRepeatTypeByName('weekly')),
            ToDo('Work-monthly-3', 'work-description3', addDays(Date.now(), 3), Priority.getPriorityLevelByValue(3), Repeat.getRepeatTypeByName('monthly'))
        )
    );
    
    ToDoAppComponent(document.getElementById('content')).render();

})();