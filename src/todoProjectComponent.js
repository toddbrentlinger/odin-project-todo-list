import ToDoComponent from "./todoComponent.js";
import { createElement } from "./utilities.js";

export default function ToDoProjectComponent(todoProject) {
    return {
        render: () => {
            const todoProjectMain = document.createElement('main');

            // Project Name
            todoProjectMain.appendChild(
                createElement('h3', {'class': 'project-name'}, todoProject.getName())
            );

            // ToDo List
            const todoListElement = todoProjectMain.appendChild(createElement('div', {'class': 'todo-item-list'}));

            // Project ToDos
            const projectToDos = [...todoProject.getToDos()];

            // Sort ToDo items by date
            projectToDos.sort((a,b) => a.getDueDate() - b.getDueDate());

            projectToDos.forEach((todo, index) => {
                const todoElementContainer = todoListElement.appendChild(
                    createElement('div', {'class': 'todo-item-container'})
                );
                
                const todoElement = ToDoComponent(todo).render();
                todoElement.style.animationDelay = `${index * 200}ms`;
                todoElementContainer.appendChild(todoElement);
            });

            return todoProjectMain;
        },
    };
}