import ToDo from "./todo.js";
import { Filter } from "./filterType.js";
import {v4 as uuidv4} from 'uuid';

export function ToDoProjectItem(name, id = uuidv4()) {
    return {
        getId: () => id,
        getName: () => name,
        setName: newName => {
            name = newName;
        },
        toJSON: () => {
            return {
                id,
                name,
            };
        },
    };
}

export const ToDoProjectNew = (function() {
    const _projects = [
        ToDoProjectItem('default'),
    ];

    return {
        addProject: todoProjectItem => {
            // Check if project name already exists

            _projects.push(todoProjectItem);
        },
        getProjectByName: projectName => {
            return _projects.find(project => project.getName() === projectName);
        },
        getProjectById: projectId => {
            return _projects.find(project => project.getId() === projectId);
        },
    };
}());

/**
 * Factory function to create single instance of ToDoProject
 * @param  {...ToDo} todos 
 * @returns {Object}
 */
export default function ToDoProject(name, ...todos) {
    const _todos = new Set(todos);
    
    return {
        getName: () => name,
        setName: newName => {
            name = newName;
        },
        getToDos: () => _todos,
        addToDo: (...newToDos) => {
            newToDos.forEach(newToDo => {
                _todos.add(newToDo);
            });
        },
        removeToDo: toDoToRemove => {
            return _todos.delete(toDoToRemove);
        },
        toString: () => {
            let str = `ToDoProject: ${name}\nToDos:\n`;
            return str.concat(Array.from(_todos).map(todo => todo.toString()).join('\n'));
        },
        toJSON: () => {
            return {
                name,
                todos: [...todos].map(todo => todo.toJSON()),
            };
        },
        filterByType: filterTypeStr => {
            const filterType = Filter.getFilterTypeByName(filterTypeStr);
            if (filterType) {
                return [..._todos].filter(filterType.callback);
            }
        },
    };
}