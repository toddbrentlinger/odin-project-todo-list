import { ToDoProjectNew } from "./todoProject.js";

/** Module for ToDo application logic */
const ToDoApp = (function() {
    let _todoProjects = [];
    let _todos = [];

    return {
        getAllToDos: () => {
            return _todos;
        },
        getAllProjects: () => {
            return ToDoProjectNew.getAllProjects();
        },
        addToDo: (...newToDos) => {
            _todos.push(...newToDos);
        },

        // TODO: Remove/refactor methods below
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
        //getAllProjects: () => _todoProjects,
        getProjectByName: projectName => {
            return _todoProjects.find(todoProject => todoProject.getName() === projectName);
        },
        filterByType: filterTypeStr => {
            const filteredToDos = _todoProjects.reduce((accum, todoProject) => {
                return accum.concat(todoProject.filterByType(filterTypeStr));
            }, []);
            return filteredToDos.sort((a, b) => a.getDueDate() - b.getDueDate());
        },
        // TEMP - Refactor to use todos array instead of todoProjects array
        toString: () => {
            let str = 'ToDoProjects:\n';
            return str.concat(_todoProjects.map(todoProject => todoProject.toString()).join('\n'));
        },
        toJSON: () => {
            return {
                projects: _todoProjects.map(todoProject => todoProject.toJSON()),
            };
        },
    };
})();

export default ToDoApp;