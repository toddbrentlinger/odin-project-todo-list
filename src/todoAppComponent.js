import HeaderComponent from "./headerComponent.js";
import SideNavComponent from "./sideNavComponent.js";
import FooterComponent from "./footerComponent.js";
import FilterTypeComponent from "./filterTypeComponent.js";

import ToDo from "./todo.js";
import { ToDoProjectNew } from "./todoProject.js";
import { Priority } from "./priorityLevel.js";
import { Repeat } from "./repeatType.js";
import { Filter } from "./filterType.js";

import ToDoApp from "./todoApp.js";
import { parseISO } from "date-fns";

import ToDoLocalStorage from "./todoLocalStorage.js";

/**
 * 
 * @param {Element} contentElement 
 * @returns {Object}
 */
const ToDoAppComponent = (function (contentElement) {
    const _createNewProjectSelectValue = 'create-new-project';

    const _refreshSideNavComponent = () => {
        const newSideNavElement = _sideNavcomponent.render();

        // Refresh main element to display new component
        _sideNavElement.replaceWith(newSideNavElement);

        _sideNavElement = newSideNavElement;
    };

    const _refreshMainComponent = () => {
        const newMainElement = _mainComponent.render();

        // Replace main element to display new component
        _mainElement.replaceWith(newMainElement);

        _mainElement = newMainElement;
    };

    const _handleQuickAddToDoFormSubmit = e => {
        console.log('New form submit handler called!');
        e.preventDefault();
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);
        
        // Get or create new project
        let project;
        if (formProps.project === _createNewProjectSelectValue && 
            formProps['project-new-title'].length > 0
        ) {
            project = ToDoProjectNew.addProjectName(formProps['project-new-title']);
            _refreshSideNavComponent();
        } else {
            project = ToDoProjectNew.getProjectByName(formProps.project);
        }

        // Create ToDo instance
        const todo = ToDo(
            formProps.title, 
            formProps.description,
            parseISO(formProps.date),
            Priority.getPriorityLevelByValue(+formProps.priority),
            Repeat.getRepeatTypeByName(formProps.repeat),
            project
        );

        // project.addToDo(todo);
        ToDoApp.addToDo(todo);

        _refreshMainComponent();
    };

    const _handleEditToDoSubmit = (e, todo) => {
        console.log('Handle Edit ToDo Submit inside ToDoAppComponent');
        e.preventDefault();

        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);

        // Update each property of ToDo

        // Title
        if (todo.getTitle() !== formProps.title) {
            todo.setTitle(formProps.title);
        }

        // Description
        if (todo.getDescription() !== formProps.description) {
            todo.setDescription(formProps.description);
        }

        // Date
        if (todo.getDueDate() !== formProps.dueDate) {
            todo.setDueDate(parseISO(formProps.date));
        }

        // Repeat
        const repeatType = Repeat.getRepeatTypeByName(formProps.repeat);
        if (todo.getRepeatType() !== repeatType) {
            todo.setRepeatType(repeatType);
        }
        
        // Priority Level
        const priorityLevel = Priority.getPriorityLevelByValue(+formProps.priority);
        if (todo.getPriorityLevel().getValue() !== +formProps.priority) {
            todo.setPriorityLevel(priorityLevel);
        }

        // Project
        let project;
        if (formProps.project === 'create-new-project' && formProps['project-new-title'].length > 0) {
            project = ToDoProjectNew.addProjectName(formProps['project-new-title']);
            //_refreshSideNavComponent();
        } else {
            project = ToDoProjectNew.getProjectByName(formProps.project);
        }
        if (todo.getProject() !== project) {
            todo.setProject(project);
        }

        // Save ToDo to localStorage to update with existing values
        ToDoLocalStorage.saveToDo(todo);

        _refreshMainComponent();
    };

    const _handleDeleteToDoClick = (e, todo) => {
        console.log('Handle Delete ToDo Submit inside ToDoAppComponent');
        e.preventDefault();

        ToDoApp.removeToDo(todo);

        ToDoLocalStorage.removeToDo(todo);

        _refreshSideNavComponent();

        _refreshMainComponent();
    };

    const _handleSideNavLinkClick = (filterType = Filter.getFilterTypeByName('today')) => {
        _mainComponent = FilterTypeComponent({
            filterType,
            deleteToDoHandler: _handleDeleteToDoClick,
            editToDoHandler: _handleEditToDoSubmit,
        });
        _refreshMainComponent();

        // // Filter ToDo items using filterType callback
        // const filteredToDos = ToDoApp.getAllToDos().filter(filterType.callback);

        // // Sort Filtered ToDo items by date
        // filteredToDos.sort((a,b) => a.getDueDate() - b.getDueDate());
    };

    let _mainElement = null;
    let _mainComponent = FilterTypeComponent({
        filterType: Filter.getFilterTypeByName('today'), // Default show ToDo's with due date of current date
        deleteToDoHandler: _handleDeleteToDoClick,
        editToDoHandler: _handleEditToDoSubmit,
    });
    let _sideNavElement = null;
    let _sideNavcomponent = SideNavComponent({
        handleSideNavLinkClick: _handleSideNavLinkClick,
    });

    return {
        render: (contentElement) => {
            // Clear contentElement of any children
            while (contentElement.firstChild) {
                contentElement.removeChild(contentElement.firstChild);
            }

            // Header
            contentElement.appendChild(HeaderComponent({
                handleQuickAddToDoSubmit: _handleQuickAddToDoFormSubmit,
                createNewProjectSelectValue: _createNewProjectSelectValue,
            }).render());

            // Sidenav
            _sideNavElement = contentElement.appendChild(_sideNavcomponent.render());

            // Main
            _mainElement = contentElement.appendChild(_mainComponent.render());

            // Footer
            contentElement.appendChild(FooterComponent(2022).render());

            return contentElement;
        },   
    };
})();

export default ToDoAppComponent;