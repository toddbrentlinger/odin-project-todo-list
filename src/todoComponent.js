import ToDo from "./todo.js";
import { createElement } from "./utilities.js";
import './todoComponent.scss';

export default function ToDoComponent(todo) {
    return {
        getToDo: () => todo,
        render: () => {
            const todoElement = createElement('div', {'class': 'todo-item'});

            // Apply styling depending on ToDo priority level
            todoElement.style.borderColor = todo.getPriorityLevel().getColor();

            // Checkbox
            todoElement.appendChild(
                createElement('div', {'class': 'todo-checkbox-container'}, 
                    createElement('div', {'class': 'todo-checkbox'})
                )
            );

            const title = todoElement.appendChild(
                createElement('h2', {'class': 'todo-title'}, todo.getTitle())
            );
            // const description = todoElement.appendChild(
            //     createElement('p', {'class': 'todo-description'}, todo.getDescription())
            // );
            const datetime = todoElement.appendChild(
                createElement(
                    'time', 
                    {'class': 'todo-datetime', 'datetime': todo.getDueDateDatetimeAttribute()}, 
                    todo.getDueDateAsString()
                )
            );

            return todoElement;
        },
    };
}