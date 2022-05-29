import ToDo from "./todo.js";
import { Filter } from "./filterType.js";

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
        filterByType: filterTypeStr => {
            const filterType = Filter.getFilterTypeByName(filterTypeStr);
            if (filterType) {
                return [..._todos].filter(filterType.callback);
            }
        },
    };
}