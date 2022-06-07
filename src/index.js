import { ToDoApp } from './todoApp.js';
import ToDoProject, { ToDoProjectItem, ToDoProjectNew } from './todoProject.js';
import ToDo from './todo.js';
import { Priority } from './priorityLevel.js';
import { Repeat } from './repeatType.js';
import { addDays, subDays } from 'date-fns';
import ToDoLocalStorage from './todoLocalStorage.js';
import { Filter } from './filterType.js';

import ToDoProjectComponent from './todoProjectComponent.js';
import CreateToDoComponent from './createToDoComponent.js';

import ToDoAppComponent from './todoAppComponent.js';

import './meyer-reset.scss';
import './style.scss';

(function() {
    const addSampleToDos = () => {
        ToDoProjectNew.addProjectName('personal');
        ToDoProjectNew.addProjectName('work');

        ToDoApp.addProject(
            ToDoProject('default', 
                ToDo('Default-weekly-3', 'description', subDays(Date.now(), 2), Priority.getPriorityLevelByValue(3), Repeat.getRepeatTypeByName('weekly')),
                ToDo('Default-daily-2', 'description', subDays(Date.now(), 1), Priority.getPriorityLevelByValue(2), Repeat.getRepeatTypeByName('daily')),
                ToDo('Default-once-1', 'description', new Date(Date.now()), Priority.getPriorityLevelByValue(1)),
                ToDo('Default-weekly-2', 'description', addDays(Date.now(), 1), Priority.getPriorityLevelByValue(2), Repeat.getRepeatTypeByName('weekly')),
                ToDo('Default-monthly-3', 'description', addDays(Date.now(), 3), Priority.getPriorityLevelByValue(3), Repeat.getRepeatTypeByName('monthly')),
                ToDo('Default-daily-3', 'description', subDays(Date.now(), 2), Priority.getPriorityLevelByValue(3), Repeat.getRepeatTypeByName('daily'))
            ),
            ToDoProject('personal', 
                ToDo('Personal-once-1', 'personal-description1', new Date(Date.now()), Priority.getPriorityLevelByValue(1), Repeat.getRepeatTypeByName('once'), ToDoProjectNew.getProjectByName('personal')),
                ToDo('Personal-weekly-2', 'personal-description2', addDays(Date.now(), 1), Priority.getPriorityLevelByValue(2), Repeat.getRepeatTypeByName('weekly'), ToDoProjectNew.getProjectByName('personal')),
                ToDo('Personal-monthly-3', 'personal-description3', addDays(Date.now(), 3), Priority.getPriorityLevelByValue(3), Repeat.getRepeatTypeByName('monthly'), ToDoProjectNew.getProjectByName('personal')),
                ToDo('Personal-monthly-3', 'personal-description3', new Date(Date.now()), Priority.getPriorityLevelByValue(1), Repeat.getRepeatTypeByName('daily'), ToDoProjectNew.getProjectByName('personal'))
    
            ),
            ToDoProject('work', 
                ToDo('Work-once-1', 'work-description1', new Date(Date.now()), Priority.getPriorityLevelByValue(1), Repeat.getRepeatTypeByName('once'), ToDoProjectNew.getProjectByName('work')),
                ToDo('Work-weekly-2', 'work-description2', addDays(Date.now(), 1), Priority.getPriorityLevelByValue(2), Repeat.getRepeatTypeByName('weekly'), ToDoProjectNew.getProjectByName('work')),
                ToDo('Work-monthly-3', 'work-description3', addDays(Date.now(), 3), Priority.getPriorityLevelByValue(3), Repeat.getRepeatTypeByName('monthly'), ToDoProjectNew.getProjectByName('work'))
            )
        );
    };

    // Testing
    window.ToDoApp = ToDoApp;
    window.ToDoProject = ToDoProject;
    window.ToDoProjectNew = ToDoProjectNew;
    window.ToDo = ToDo;
    window.Priority = Priority;
    window.ToDoLocalStorage = ToDoLocalStorage;
    window.ToDoProjectComponent = ToDoProjectComponent;
    window.Filter = Filter;

    //addSampleToDos();

    ToDoApp.init();

    ToDoAppComponent(document.getElementById('content')).render();

})();