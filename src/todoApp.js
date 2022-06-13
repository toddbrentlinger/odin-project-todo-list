import { ToDoProjectNew } from "./todoProject.js";

/** Module for ToDo application logic */
const ToDoApp = (function() {
    let _todoProjects = [];
    let _todos = [];

    /**
     * Returns false if project has ToDos assigned to it, else true for being empty.
     * @param {ToDoProjectItem} todoProject
     * @returns {Boolean} 
     */
    const _isProjectEmpty = todoProject => {
        return !_todos.includes(todo => todo.getProject() === todoProject);
    };

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
        removeToDo: (...todosToRemove) => {
            let todoIndex;
            todosToRemove.forEach(todoToRemove => {
                todoIndex = _todos.indexOf(todoToRemove);
                if (todoIndex > -1) {
                    _todos.splice(todoIndex, 1);
                    // If todo deleted is last in project, remove project
                    const todoProject = todoToRemove.getProject();
                    if (_isProjectEmpty(todoProject)) {
                        ToDoProjectNew.removeProject(todoProject);
                    }
                }
            });
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