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
            let title = filterType.getName();
            if (title.startsWith('project-')) {
                title = title.split('-')[1];
            }
            filterTypeElement.appendChild(createElement('h3', {}, title));

            // ToDo list element
            const todoListElement = filterTypeElement.appendChild(createElement('div', {'class': 'todo-item-list'}));

            // Filter ToDo items using filterType callback
            const filteredToDos = ToDoApp.getAllToDos().filter(filterType.callback);

            // Sort Filtered ToDo items by date
            filteredToDos.sort((a,b) => a.getDueDate() - b.getDueDate());
            
            // ToDoComponents
            filteredToDos.forEach((todo, index) => {
                const todoElementContainer = todoListElement.appendChild(
                    createElement('div', {'class': 'todo-item-container'})
                );

                const todoElement = ToDoComponent(todo).render();
                todoElement.style.animationDelay = `${index * 100}ms`;
                todoElementContainer.appendChild(todoElement);
            });

            return filterTypeElement;
        },
    };
}