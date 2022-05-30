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

            // H3 Filter Title
            filterTypeElement.appendChild(createElement('h3', {}, filterType.getName()));

            // ToDo Container
            const todoContainer = filterTypeElement.appendChild(createElement('div', {'class': 'todo-item-container'}));

            // Filter ToDo items using filterType callback
            const filteredToDos = ToDoApp.getAllProjects().reduce((accum, todoProject) => {
                return accum.concat([...todoProject.getToDos()].filter(filterType.callback));
            }, []);
            
            // ToDoComponents
            filteredToDos.forEach(todo => {
                todoContainer.appendChild(ToDoComponent(todo).render());
            });

            return filterTypeElement;
        },
    };
}