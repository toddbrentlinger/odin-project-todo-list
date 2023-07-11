import ToDoApp from './todoApp.js';
import ToDoProject from './todoProject.js';
import ToDo from './todo.js';
import { Priority } from './priorityLevel.js';
import { Repeat } from './repeatType.js';
import ToDoLocalStorage from './todoLocalStorage.js';
import { addDays, subDays } from 'date-fns';

import ToDoAppComponent from './components/todoAppComponent.js';

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
            ToDoProject.getProjectByName(project)
        );
    };

    const addSampleToDos = () => {
        localStorage.clear();

        ToDoProject.addProjectName('personal');
        ToDoProject.addProjectName('work');

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
    };

    // Testing
    // window.ToDoApp = ToDoApp;
    // window.ToDoProject = ToDoProject;
    // window.ToDo = ToDo;
    // window.Priority = Priority;
    // window.Repeat = Repeat;
    // window.RepeatType = RepeatType;
    // window.ToDoLocalStorage = ToDoLocalStorage;
    // window.Filter = Filter;
    // window.FilterType = FilterType;

    //addSampleToDos();
    ToDoApp.addToDo(...ToDoLocalStorage.getAllToDos());

    ToDoAppComponent.render(document.getElementById('content'));

})();