import { Priority } from "./priorityLevel.js";
import { Repeat, RepeatType } from "./repeatType.js";
import ToDo from "./todo.js";
import { ToDoProjectNew } from "./todoProject.js";

/** Module for ToDo application logic */
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
        getAllProjects: () => _todoProjects,
        getProjectByName: projectName => {
            return _todoProjects.find(todoProject => todoProject.getName() === projectName);
        },
        filterByType: filterTypeStr => {
            const filteredToDos = _todoProjects.reduce((accum, todoProject) => {
                return accum.concat(todoProject.filterByType(filterTypeStr));
            }, []);
            return filteredToDos.sort((a, b) => a.getDueDate() - b.getDueDate());
        },
        getProjectsFromLocalStorage: () => {

        },
        saveProjectsToLocalStorage: () => {

        },
        createToDoFromJSON: jsonObj => {

            const priority = Priority.getPriorityLevelByValue(jsonObj.priority.value) 
                || Priority.addPriorityLevel(PriorityLevel(jsonObj.priority.value, jsonObj.priority.color))
                || undefined;

            const repeat = Repeat.getRepeatTypeByName(jsonObj.repeat) 
                || Repeat.addRepeatType(RepeatType(jsonObj.repeat))
                || undefined;

            const project = ToDoProjectNew.getProjectById(jsonObj.priority.id) 
                || ToDoProjectNew.addProject(ToDoProjectItem(jsonObj.priority.name), jsonObj.priority.id) 
                || undefined;
                
            return ToDo(
                jsonObj.title,
                jsonObj.description,
                new Date(jsonObj.dueDate),
                priority,
                repeat,
                jsonObj.project,
                jsonObj.id
            );
        },
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