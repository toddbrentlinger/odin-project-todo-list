import ToDoApp from "./todoApp.js";
import { Filter } from "./filterType.js";
import ToDoComponent from "./todoComponent.js";
import { createElement } from "./utilities.js";

/**
 * 
 * @param {FilterType} filterType
 * @returns {Object}
 */
export default function FilterTypeComponent(props = {}) {
    const _defaultProps = {
        filterType: Filter.getFilterTypeByName('today'),
        deleteToDoHandler: e => e.preventDefault(),
        editToDoHandler: e => e.preventDefault(),
    };
    // Add any missing properties to 'props' with default values
    for (const [key, value] of Object.entries(_defaultProps)) {
        if (!props.hasOwnProperty(key)) {
            props[key] = value;
        }
    }

    return {
        render: () => {
            const filterTypeElement = document.createElement('main');

            // Filter Title
            let title = props.filterType.getName();
            if (title.startsWith('project-')) {
                title = title.split('-')[1];
            }
            filterTypeElement.appendChild(createElement('h3', {}, title));

            // ToDo list element
            const todoListElement = filterTypeElement.appendChild(createElement('div', {'class': 'todo-item-list'}));

            // Filter ToDo items using filterType callback
            const filteredToDos = ToDoApp.getAllToDos().filter(props.filterType.callback);

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