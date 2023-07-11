import { Filter } from "./filterType.js";
import {v4 as uuidv4} from 'uuid';

export function ToDoProjectItem(name, id = uuidv4()) {
    return {
        getId: () => id,
        getName: () => name,
        setName: newName => {
            name = newName;
        },
        toJSON: () => {
            return {
                id,
                name,
            };
        },
    };
}

/** ToDo projects module. */
const ToDoProject = (function() {
    const _projects = [
        ToDoProjectItem('default'),
    ];

    const getProjectByName = projectName => {
        return _projects.find(project => project.getName().toLowerCase() === projectName.toLowerCase());
    };

    /**
     * Add new FilterType for corresponding project
     * @param {ToDoProjectItem} todoProject 
     */
    const _addFilterTypeOfProject = todoProject => {
        Filter.addFilterType(Filter.createFilterByProjectType(todoProject.getName()));
    };

    const _removeFilterTypeOfProject = todoProject => {
        Filter.removeFilterType(Filter.getFilterTypeByName(todoProject.getName()));
    };

    return {
        getProjectByName,
        getAllProjects: () => _projects,
        addProjectName: projectName => {
            
            if (getProjectByName(projectName)) {
                alert('Project name already exists');
                return;
            }
            const projectItem = ToDoProjectItem(projectName);
            _projects.push(projectItem);
            _addFilterTypeOfProject(projectItem);
            return projectItem;
        },
        // TODO: Add _addFilterTypeOfProject and/or call inside addProjectName() since functionality is identical after ToDoProject
        // is found.
        addProject: todoProjectItem => {
            // Check if project name already exists

            _projects.push(todoProjectItem);
        },
        removeProject: todoProjectItem => {
            const todoProjectIndex = _projects.indexOf(todoProjectItem);
            if (todoProjectIndex > -1) {
                _projects.splice(todoProjectIndex, 1);
                _removeFilterTypeOfProject(todoProjectItem);
            }
        },
        getProjectById: projectId => {
            return _projects.find(project => project.getId() === projectId);
        },
    };
}());

export default ToDoProject;
