import { ToDoApp } from "./todoApp.js";
import ToDoProject from "./todoProject.js";
import ToDo from "./todo.js";
import { Repeat } from "./repeatType.js";
import { Priority } from "./priorityLevel.js";
import { createElement } from "./utilities.js";
import './createToDoComponent.scss';
import { parseISO } from "date-fns";

export default function CreateToDoComponent() {
    const _createNewProjectSelectValue = 'create-new-project';
    let _createToDoElement = null;
    let _createNewProjectInputElement = null;

    const _handleFormSubmit = e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);

        // Create ToDo instance
        const todo = ToDo(
            formProps.title, 
            formProps.description,
            parseISO(formProps.date),
            Priority.getPriorityLevelByValue(+formProps.priority),
            Repeat.getRepeatTypeByName(formProps.repeat)
        );

        // Get or create new project
        if (formProps.project === _createNewProjectSelectValue && 
            formProps['project-new-title'].length > 0
        ) {
            ToDoApp.addProject(ToDoProject(formProps.project, todo));
        } else {
            ToDoApp.getProjectByName(formProps.project).addToDo(todo);
        }

        // Remove create ToDo element from DOM
        _createToDoElement.remove();
    };

    const _close = e => {
        if (e.currentTarget !== e.target) {
            return;
        }
        e.stopPropagation();
        _createToDoElement.remove();
    };

    const _createRepeatTypeOptions = () => {
        return Repeat.getAllRepeatTypes().map((repeatType, index) => {
            const option = createElement('option', {value: repeatType.getName()}, repeatType.getName());
            if (index === 0) {
                option.selected = true;
            }
            return option;
        });
    };

    const _createPriorityTypeOptions = () => {
        return Priority.getAllPriorityLevels().map(priorityLevel => {
            const option = createElement('option', {value: priorityLevel.getValue()}, priorityLevel.getColor());
            if (priorityLevel.getValue() === 0) {
                option.selected = true;
            }
            return option;
        });
    };

    /**
     * Callback function that handles when project select option is changed.
     * @param {Event} e
     */
    const _handleProjectSelect = e => {
        // Return if no 'create new prjoject' input element
        if (!_createNewProjectInputElement)
            return;

        if (e.target.value === _createNewProjectSelectValue) {
            _createNewProjectInputElement.removeAttribute('disabled');
            _createNewProjectInputElement.focus();
        } else {
            _createNewProjectInputElement.setAttribute('disabled', true);
        }
    };

    const _createProjectOptions = () => {
        const projectOptions = ToDoApp.getAllProjects().map(todoProject => {
            const option = createElement('option', {value: todoProject.getName()}, todoProject.getName());
            if (todoProject.getName() === 'default') {
                option.selected = true;
            }
            return option;
        });

        const addNewProjectOption = createElement('option', {value: _createNewProjectSelectValue}, '+ Add New Project');

        projectOptions.push(addNewProjectOption);

        return projectOptions;
    };

    return {
        render: () => {
            _createToDoElement = createElement('div', {id: 'create-todo'});

            _createToDoElement.addEventListener('click', _close, false);

            const createToDoFormContainer = _createToDoElement.appendChild(
                createElement('div', {id: 'create-todo-form-container'})
            );

            // Header

            const header = createToDoFormContainer.appendChild(
                createElement('div', {id: 'create-todo-form-header'})
            );

            // Header - Title
            header.appendChild(createElement('h2', {}, 'Create New ToDo'));

            // Header - Close Icon
            header.appendChild(
                createElement('span', {id: 'create-todo-close', 'aria-label': 'Close To-Do form'})
            ).addEventListener('click', _close, false);

            // Form

            const createToDoForm = createToDoFormContainer.appendChild(
                createElement('form', {action: '', method: 'post', id: 'create-todo-form'})
            );
            createToDoForm.addEventListener('submit', _handleFormSubmit, false);

            // Title

            createToDoForm.appendChild(
                createElement('div', {id: 'create-todo-title'}, 
                    createElement('label', {'for': 'todo-title-input'}, 
                        createElement('span', {}, 'Title'),
                        createElement('input', 
                            {type: 'text', minlength: '1', maxlength: '50', id: 'todo-title-input', name: 'title', required: true}
                        )
                    )
                )
            );

            // Description

            createToDoForm.appendChild(
                createElement('div', {id: 'create-todo-description'}, 
                    createElement('label', {'for': 'todo-description-input'}, 
                        createElement('span', {}, 'Description'),
                        createElement('input', 
                            {type: 'text', maxlength: '200', id: 'todo-description-input', name: 'description'}
                        )
                    )
                )
            );

            // Due Date

            createToDoForm.appendChild(
                createElement('div', {id: 'create-todo-date'}, 
                    createElement('label', {'for': 'todo-date-input'}, 
                        createElement('span', {}, 'Due Date'),
                        createElement('input', 
                            {type: 'datetime-local', id: 'todo-date-input', name: 'date', required: true}
                        )
                    )
                )
            );

            // Repeat Type

            createToDoForm.appendChild(
                createElement('div', {id: 'create-todo-repeat'}, 
                    createElement('label', {'for': 'todo-repeat-select'}, 'Repeat:'),
                    createElement('select', {name: 'repeat', id: 'todo-repeat-select', required: true}, 
                        ..._createRepeatTypeOptions()
                    )
                )
            );

            // Priority Level

            createToDoForm.appendChild(
                createElement('div', {id: 'create-todo-priority'}, 
                    createElement('label', {'for': 'todo-priority-select'}, 'Priority:'),
                    createElement('select', {name: 'priority', id: 'todo-priority-select', required: true}, 
                        ..._createPriorityTypeOptions()
                    )
                )
            );

            // Project

            // Create select element to add event listener
            const createTodoProjectSelect = createElement(
                'select', 
                {name: 'project', id: 'todo-project-select', required: true}, 
                ..._createProjectOptions()
            );
            createTodoProjectSelect.addEventListener('change', _handleProjectSelect, false);

            // Create element including select element just created with event listener
            createToDoForm.appendChild(
                createElement('div', {id: 'create-todo-project'}, 
                    createElement('label', {'for': 'todo-project-select'}, 'Project:'),
                    createTodoProjectSelect
                )
            );

            // Project - Add New

            _createNewProjectInputElement = createElement('input', {
                type: 'text', 
                id: 'todo-project-add-new-input', 
                name: 'project-new-title', 
                minlength: 50, 
                disabled: true
            });

            createToDoForm.appendChild(
                createElement('div', {id: 'create-todo-project-add-new'}, 
                    createElement('label', {'for': 'todo-project-add-new-input'}, 
                        createElement('span', {}, 'New Project Title:'),
                        _createNewProjectInputElement
                    )
                )
            );

            // Button Container

            createToDoForm.appendChild(
                createElement('div', {id: 'create-todo-btns'}, 
                    createElement('button', {type: 'reset'}, 'Reset'),
                    createElement('button', {type: 'submit'}, 'Add')
                )
            );

            return _createToDoElement;
        },
    };
}