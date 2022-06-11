import ToDoApp from './todoApp.js';
import ToDoProject, { ToDoProjectItem, ToDoProjectNew } from './todoProject.js';
import ToDo from './todo.js';
import { Priority } from './priorityLevel.js';
import { Repeat } from './repeatType.js';
import { Filter } from './filterType.js';
import ToDoLocalStorage from './todoLocalStorage.js';
import { addDays, subDays } from 'date-fns';

import ToDoProjectComponent from './todoProjectComponent.js';
import ToDoAppComponent from './todoAppComponent.js';

import './meyer-reset.scss';
import './style.scss';

(function() {
    const addSampleToDos = () => {
        localStorage.clear();

        ToDoProjectNew.addProjectName('personal');
        ToDoProjectNew.addProjectName('work');

        ToDoApp.addProject(
            ToDoProject('default', 
                ToDo('Default-weekly-3', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut fringilla ultricies ante. Sed finibus vitae ligula quis luctus. Donec lobortis venenatis enim. Cras quis lectus ac felis iaculis faucibus. Proin pulvinar massa vel venenatis vehicula. Proin ultrices, quam in efficitur aliquet, orci diam congue felis, non pretium sem nisi non ante. Sed fringilla gravida nibh id ornare.', subDays(Date.now(), 2), Priority.getPriorityLevelByValue(3), Repeat.getRepeatTypeByName('weekly')),
                ToDo('Default-daily-2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut fringilla ultricies ante. Sed finibus vitae ligula quis luctus. Donec lobortis venenatis enim. Cras quis lectus ac felis iaculis faucibus. Proin pulvinar massa vel venenatis vehicula. Proin ultrices, quam in efficitur aliquet, orci diam congue felis, non pretium sem nisi non ante. Sed fringilla gravida nibh id ornare.', subDays(Date.now(), 1), Priority.getPriorityLevelByValue(2), Repeat.getRepeatTypeByName('daily')),
                ToDo('Default-once-1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut fringilla ultricies ante. Sed finibus vitae ligula quis luctus. Donec lobortis venenatis enim. Cras quis lectus ac felis iaculis faucibus. Proin pulvinar massa vel venenatis vehicula. Proin ultrices, quam in efficitur aliquet, orci diam congue felis, non pretium sem nisi non ante. Sed fringilla gravida nibh id ornare.', new Date(Date.now()), Priority.getPriorityLevelByValue(1)),
                ToDo('Default-weekly-2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut fringilla ultricies ante. Sed finibus vitae ligula quis luctus. Donec lobortis venenatis enim. Cras quis lectus ac felis iaculis faucibus. Proin pulvinar massa vel venenatis vehicula. Proin ultrices, quam in efficitur aliquet, orci diam congue felis, non pretium sem nisi non ante. Sed fringilla gravida nibh id ornare.', addDays(Date.now(), 1), Priority.getPriorityLevelByValue(2), Repeat.getRepeatTypeByName('weekly')),
                ToDo('Default-monthly-3', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut fringilla ultricies ante. Sed finibus vitae ligula quis luctus. Donec lobortis venenatis enim. Cras quis lectus ac felis iaculis faucibus. Proin pulvinar massa vel venenatis vehicula. Proin ultrices, quam in efficitur aliquet, orci diam congue felis, non pretium sem nisi non ante. Sed fringilla gravida nibh id ornare.', addDays(Date.now(), 3), Priority.getPriorityLevelByValue(3), Repeat.getRepeatTypeByName('monthly')),
                ToDo('Default-daily-3', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut fringilla ultricies ante. Sed finibus vitae ligula quis luctus. Donec lobortis venenatis enim. Cras quis lectus ac felis iaculis faucibus. Proin pulvinar massa vel venenatis vehicula. Proin ultrices, quam in efficitur aliquet, orci diam congue felis, non pretium sem nisi non ante. Sed fringilla gravida nibh id ornare.', subDays(Date.now(), 2), Priority.getPriorityLevelByValue(3), Repeat.getRepeatTypeByName('daily'))
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

    ToDoApp.addToDo(...ToDoLocalStorage.getAllToDos());

    ToDoAppComponent.render(document.getElementById('content'));

})();