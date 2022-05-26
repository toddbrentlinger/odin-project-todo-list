import ToDoProject from "./todoProject.js";

export const ToDoApp = (function() {
    let _todoProjects = [];

    return {
        addProject: (...newProjects) => {
            // Check if type is ToDoProject
            _todoProjects.push(...newProjects);
        },
        addToDoToProjectName: (projectName, ...todos) => {
            const project = getProjectByName(projectName);
            if (project) {
                project.addToDo(todos);
            }
        },
        getProjectByName: projectName => {
            return _todoProjects.find(todoProject => todoProject.getName() === projectName);
        },
        toString: () => {
            let str = 'ToDoProjects:\n';
            return str.concat(_todoProjects.map(todoProject => todoProject.toString()).join('\n'));
        },
    };
})();