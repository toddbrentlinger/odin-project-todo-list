import ToDoComponent from "./todoComponent.js";
import { createElement } from "./utilities.js";

export default function ToDoProjectComponent(todoProject) {
    return {
        render: () => {
            const todoProjectMain = document.createElement('main');

            // Project Name
            todoProjectMain.appendChild(createElement('h3', {'class': 'project-name'}, todoProject.getName()));

            // Project ToDos
            todoProject.getToDos().forEach(todo => {
                todoProjectMain.appendChild(ToDoComponent(todo).render());
            });

            return todoProjectMain;
        },
    };
}