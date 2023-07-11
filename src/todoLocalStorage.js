import ToDo from "./todo";
import { Repeat } from "./repeatType.js";
import { Priority } from "./priorityLevel.js";
import ToDoProject from "./todoProject.js";

/** Module to save ToDo objects to localStorage. */
const ToDoLocalStorage = (function(){
    const _createToDoFromJSON = jsonObj => {
        const priority = Priority.getPriorityLevelByValue(+jsonObj.priority.value) 
            || Priority.addPriorityLevel(PriorityLevel(+jsonObj.priority.value, jsonObj.priority.color))
            || undefined;

        const repeat = Repeat.getRepeatTypeByName(jsonObj.repeat) 
            || Repeat.addRepeatType(RepeatType(jsonObj.repeat))
            || undefined;
        
        const project = ToDoProject.getProjectByName(jsonObj.project)
            || ToDoProject.addProjectName(jsonObj.project) 
            || undefined;
            
        return ToDo(
            jsonObj.title,
            jsonObj.description,
            new Date(jsonObj.dueDate),
            priority,
            repeat,
            project,
            jsonObj.id
        );
    };

    const _getAllToDosAsJSON = () => {
        let todos = [];

        Object.entries(localStorage).forEach(entry => {
            if (!entry[0].startsWith('todo-')) {
                return;
            }
            //const id = entry[0].match(/(?<=todo-).+/i)[0];
            todos.push(JSON.parse(entry[1]));
        });

        return todos;
    };

    return {
        /**
         * Copied from https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#testing_for_availability
         * @returns {Boolean}
         */
        isStorageAvailable: () => {
            var storage;
            try {
                storage = window['localStorage'];
                var x = '__storage_test__';
                storage.setItem(x, x);
                storage.removeItem(x);
                return true;
            } catch(e) {
                return e instanceof DOMException && (
                    // everything except Firefox
                    e.code === 22 ||
                    // Firefox
                    e.code === 1014 ||
                    // test name field too, because code might not be present
                    // everything except Firefox
                    e.name === 'QuotaExceededError' ||
                    // Firefox
                    e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                    // acknowledge QuotaExceededError only if there's something already stored
                    (storage && storage.length !== 0);
            }
        },
        /**
         * Save ToDo instance to localStorage.
         * @param {ToDo} todo 
         */
        saveToDo: todo => {
            try {
                localStorage.setItem(`todo-${todo.getId()}`, JSON.stringify(todo));
            } catch (e) {
                if (e.name === 'QuotaExceededError') {
                    alert('Local storage quota exceeded!');
                }
            }
        },
        /**
         * Remove ToDo instance from localStorage.
         * @param {ToDo} todo 
         */
        removeToDo: todo => {
            localStorage.removeItem(todo.getId())
        },
        getAllToDos: () => {
            const todoArr = [];
            _getAllToDosAsJSON().forEach(todoJSON => {
                const todo = _createToDoFromJSON(todoJSON);
                if (todo) {
                    todoArr.push(todo);
                }
            });
            return todoArr;
        },
        getToDoByIdAsJSON: todoId => {
            const todoEntry = localStorage.getItem(todoId);
            if (todoEntry) {
                return JSON.parse(todoEntry);
            }
        },
        clearStorage: () => {
            localStorage.clear();
        },
    };
})();

export default ToDoLocalStorage;