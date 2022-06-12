import HeaderComponent from "./headerComponent.js";
import SideNavComponent from "./sideNavComponent.js";
import FooterComponent from "./footerComponent.js";

import ToDo from "./todo.js";
import { Priority } from "./priorityLevel.js";
import { Repeat } from "./repeatType.js";

import FilterTypeComponent from "./filterTypeComponent.js";

import ToDoApp from "./todoApp.js";
import { parseISO } from "date-fns";
import { ToDoProjectNew } from "./todoProject.js";

/**
 * 
 * @param {Element} contentElement 
 * @returns {Object}
 */
const ToDoAppComponent = (function ToDoAppComponent(contentElement) {
    const _createNewProjectSelectValue = 'create-new-project';

    const _refreshSideNavComponent = () => {
        const newSideNavElement = _sideNavcomponent.render();

        // Refresh main element to display new component
        _sideNavElement.replaceWith(newSideNavElement);

        _sideNavElement = newSideNavElement;
    };

    const _refreshMainComponent = () => {
        const newMainElement = _mainComponent.render();

        // Refresh main element to display new component
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
            // project = ToDoProject(formProps['project-new-title']);
            // ToDoApp.addProject(project);
            _refreshSideNavComponent();
        } else {
            project = ToDoProjectNew.getProjectByName(formProps.project);
            // project = ToDoApp.getProjectByName(formProps.project);
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

    const _handleSideNavLinkClick = filterType => {
        _mainComponent = FilterTypeComponent({filterType});
        _refreshMainComponent();

        // Filter ToDo items using filterType callback
        const filteredToDos = ToDoApp.getAllToDos().filter(filterType.callback);

        // Sort Filtered ToDo items by date
        filteredToDos.sort((a,b) => a.getDueDate() - b.getDueDate());
    };

    let _mainElement = null;
    let _mainComponent = FilterTypeComponent(); // Default show ToDo's with due date of current date
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