import ToDoApp from './todoApp.js';
import { ToDoProjectNew } from './todoProject.js';
import ToDo from './todo.js';
import { Priority } from './priorityLevel.js';
import { Repeat, RepeatType } from './repeatType.js';
import { Filter, FilterType } from './filterType.js';
import ToDoLocalStorage from './todoLocalStorage.js';
import { addDays, subDays } from 'date-fns';

import ToDoProjectComponent from './todoProjectComponent.js';
import ToDoAppComponent from './todoAppComponent.js';

import './meyer-reset.scss';
import './style.scss';

(function() {
    const createTestToDo = (deltaDays = 0, priority = 1, repeat = 'once', project = 'default') => {
        return ToDo(
            `${project}-${repeat}-${priority}-${deltaDays < 0 ? 'minus' + Math.abs(deltaDays): deltaDays > 0 ? 'plus' + Math.abs(deltaDays) : 'today'}`,
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut fringilla ultricies ante. Sed finibus vitae ligula quis luctus. Donec lobortis venenatis enim. Cras quis lectus ac felis iaculis faucibus. Proin pulvinar massa vel venenatis vehicula. Proin ultrices, quam in efficitur aliquet, orci diam congue felis, non pretium sem nisi non ante. Sed fringilla gravida nibh id ornare.',
            (deltaDays < 0 ? subDays(new Date(), Math.abs(deltaDays)) : addDays(new Date(), deltaDays)),
            Priority.getPriorityLevelByValue(priority),
            Repeat.getRepeatTypeByName(repeat),
            ToDoProjectNew.getProjectByName(project)
        );
    };

    const addSampleToDos = () => {
        localStorage.clear();

        ToDoProjectNew.addProjectName('personal');
        ToDoProjectNew.addProjectName('work');

        // Once Repeat
        // ToDoApp.addToDo(
        //     createTestToDo(-3, 1),
        //     createTestToDo(-2, 3),
        //     createTestToDo(-1, 2),
        //     createTestToDo(0, 1),
        //     createTestToDo(1, 2),
        //     createTestToDo(2, 2),
        //     createTestToDo(3, 3),
        // );

        // Daily Repeat
        // ToDoApp.addToDo(
        //     createTestToDo(-3, 1, 'daily'),
        //     createTestToDo(-2, 3, 'daily'),
        //     createTestToDo(-1, 2, 'daily'),
        //     createTestToDo(0, 1, 'daily'),
        //     createTestToDo(1, 2, 'daily'),
        //     createTestToDo(2, 2, 'daily'),
        //     createTestToDo(3, 3, 'daily'),
        // );

        // Weekly Repeat
        ToDoApp.addToDo(
            createTestToDo(-7, 3, 'weekly'),
            createTestToDo(-3, 1, 'weekly'),
            createTestToDo(-2, 3, 'weekly'),
            createTestToDo(-1, 2, 'weekly'),
            createTestToDo(0, 1, 'weekly'),
            createTestToDo(1, 2, 'weekly'),
            createTestToDo(2, 2, 'weekly'),
            createTestToDo(3, 3, 'weekly'),
            createTestToDo(7, 3, 'weekly'),
        );

        // ToDoApp.addToDo(
        //     ToDo('Default-weekly-3-minus2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut fringilla ultricies ante. Sed finibus vitae ligula quis luctus. Donec lobortis venenatis enim. Cras quis lectus ac felis iaculis faucibus. Proin pulvinar massa vel venenatis vehicula. Proin ultrices, quam in efficitur aliquet, orci diam congue felis, non pretium sem nisi non ante. Sed fringilla gravida nibh id ornare.', subDays(Date.now(), 2), Priority.getPriorityLevelByValue(3), Repeat.getRepeatTypeByName('weekly')),
        //     ToDo('Default-daily-2-minus1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut fringilla ultricies ante. Sed finibus vitae ligula quis luctus. Donec lobortis venenatis enim. Cras quis lectus ac felis iaculis faucibus. Proin pulvinar massa vel venenatis vehicula. Proin ultrices, quam in efficitur aliquet, orci diam congue felis, non pretium sem nisi non ante. Sed fringilla gravida nibh id ornare.', subDays(Date.now(), 1), Priority.getPriorityLevelByValue(2), Repeat.getRepeatTypeByName('daily')),
        //     ToDo('Default-once-1-today', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut fringilla ultricies ante. Sed finibus vitae ligula quis luctus. Donec lobortis venenatis enim. Cras quis lectus ac felis iaculis faucibus. Proin pulvinar massa vel venenatis vehicula. Proin ultrices, quam in efficitur aliquet, orci diam congue felis, non pretium sem nisi non ante. Sed fringilla gravida nibh id ornare.', new Date(Date.now()), Priority.getPriorityLevelByValue(1)),
        //     ToDo('Default-weekly-2-plus1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut fringilla ultricies ante. Sed finibus vitae ligula quis luctus. Donec lobortis venenatis enim. Cras quis lectus ac felis iaculis faucibus. Proin pulvinar massa vel venenatis vehicula. Proin ultrices, quam in efficitur aliquet, orci diam congue felis, non pretium sem nisi non ante. Sed fringilla gravida nibh id ornare.', addDays(Date.now(), 1), Priority.getPriorityLevelByValue(2), Repeat.getRepeatTypeByName('weekly')),
        //     ToDo('Default-monthly-3-plus3', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut fringilla ultricies ante. Sed finibus vitae ligula quis luctus. Donec lobortis venenatis enim. Cras quis lectus ac felis iaculis faucibus. Proin pulvinar massa vel venenatis vehicula. Proin ultrices, quam in efficitur aliquet, orci diam congue felis, non pretium sem nisi non ante. Sed fringilla gravida nibh id ornare.', addDays(Date.now(), 3), Priority.getPriorityLevelByValue(3), Repeat.getRepeatTypeByName('monthly')),
        //     ToDo('Default-daily-3-minus2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut fringilla ultricies ante. Sed finibus vitae ligula quis luctus. Donec lobortis venenatis enim. Cras quis lectus ac felis iaculis faucibus. Proin pulvinar massa vel venenatis vehicula. Proin ultrices, quam in efficitur aliquet, orci diam congue felis, non pretium sem nisi non ante. Sed fringilla gravida nibh id ornare.', subDays(Date.now(), 2), Priority.getPriorityLevelByValue(3), Repeat.getRepeatTypeByName('daily')),
        //     ToDo('Personal-once-1-today', 'personal-description1', new Date(Date.now()), Priority.getPriorityLevelByValue(1), Repeat.getRepeatTypeByName('once'), ToDoProjectNew.getProjectByName('personal')),
        //     ToDo('Personal-weekly-2-plus1', 'personal-description2', addDays(Date.now(), 1), Priority.getPriorityLevelByValue(2), Repeat.getRepeatTypeByName('weekly'), ToDoProjectNew.getProjectByName('personal')),
        //     ToDo('Personal-monthly-3-plus3', 'personal-description3', addDays(Date.now(), 3), Priority.getPriorityLevelByValue(3), Repeat.getRepeatTypeByName('monthly'), ToDoProjectNew.getProjectByName('personal')),
        //     ToDo('Personal-monthly-3-today', 'personal-description3', new Date(Date.now()), Priority.getPriorityLevelByValue(1), Repeat.getRepeatTypeByName('daily'), ToDoProjectNew.getProjectByName('personal')),
        //     ToDo('Work-once-1-today', 'work-description1', new Date(Date.now()), Priority.getPriorityLevelByValue(1), Repeat.getRepeatTypeByName('once'), ToDoProjectNew.getProjectByName('work')),
        //     ToDo('Work-weekly-2-plus1', 'work-description2', addDays(Date.now(), 1), Priority.getPriorityLevelByValue(2), Repeat.getRepeatTypeByName('weekly'), ToDoProjectNew.getProjectByName('work')),
        //     ToDo('Work-monthly-3-plus3', 'work-description3', addDays(Date.now(), 3), Priority.getPriorityLevelByValue(3), Repeat.getRepeatTypeByName('monthly'), ToDoProjectNew.getProjectByName('work')),
        // );
    };

    // Testing
    window.ToDoApp = ToDoApp;
    window.ToDoProjectNew = ToDoProjectNew;
    window.ToDo = ToDo;
    window.Priority = Priority;
    window.Repeat = Repeat;
    window.RepeatType = RepeatType;
    window.ToDoLocalStorage = ToDoLocalStorage;
    window.ToDoProjectComponent = ToDoProjectComponent;
    window.Filter = Filter;
    window.FilterType = FilterType;

    addSampleToDos();
    //ToDoApp.addToDo(...ToDoLocalStorage.getAllToDos());

    ToDoAppComponent.render(document.getElementById('content'));

})();