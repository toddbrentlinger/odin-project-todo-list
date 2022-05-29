import { ToDoApp } from "./todoApp";
import ToDo from "./todo.js";
import { createElement } from "./utilities.js";
import './createToDoComponent.scss';

export default function CreateToDoComponent() {
    return {
        render: () => {
            const createToDoElement = createElement('div', {id: 'create-todo'});

            const createToDoForm = createToDoElement.appendChild(createElement('form', {id: 'create-todo-form'}));

            // Title
            createToDoForm.appendChild(createElement('input', {}));
            // Description
            // Due Date
            // Priority Level
            // Repeat Type

            return createToDoElement;
        },
    };
}