import ToDo from "./todo.js";
import { createElement } from "./utilities.js";

export default function ToDoComponent(todo) {
    return {
        getToDo: () => todo,
        render: () => {
            const todoElement = createElement('div', {'class': 'todo-item'});

            const title = todoElement.appendChild(
                createElement('h2', {'class': 'todo-title'}, todo.getTitle())
            );
            const description = todoElement.appendChild(
                createElement('p', {'class': 'todo-description'}, todo.getDescription())
            );
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