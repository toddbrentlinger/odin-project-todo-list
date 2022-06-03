import { ToDoApp } from "./todoApp.js";
import { Filter } from "./filterType.js";
import ToDoComponent from "./todoComponent.js";
import { createElement } from "./utilities.js";

/**
 * 
 * @param {FilterType} filterType
 * @returns {Object}
 */
export default function FilterTypeComponent(filterType = Filter.getFilterTypeByName('today')) {
    return {
        render: () => {
            const filterTypeElement = document.createElement('main');

            // Filter Title
            filterTypeElement.appendChild(createElement('h3', {}, filterType.getName()));

            // ToDo List
            const todoListElement = filterTypeElement.appendChild(createElement('div', {'class': 'todo-item-list'}));

            // Filter ToDo items using filterType callback
            const filteredToDos = ToDoApp.getAllProjects().reduce((accum, todoProject) => {
                return accum.concat([...todoProject.getToDos()].filter(filterType.callback));
            }, []);

            // Sort Filtered ToDo items by date
            filteredToDos.sort((a,b) => a.getDueDate() - b.getDueDate());
            
            // ToDoComponents
            filteredToDos.forEach((todo, index) => {
                const todoElementContainer = todoListElement.appendChild(
                    createElement('div', {'class': 'todo-item-container'})
                );

                const todoElement = ToDoComponent(todo).render();
                todoElement.style.animationDelay = `${index * 150}ms`;
                todoElementContainer.appendChild(todoElement);
            });

            return filterTypeElement;
        },
    };
}