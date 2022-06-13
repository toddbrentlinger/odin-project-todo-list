import ToDoApp from "./todoApp.js";
import { ToDoProjectNew } from "./todoProject.js";
import { Repeat } from "./repeatType.js";
import { Priority } from "./priorityLevel.js";
import { createElement } from "./utilities.js";
import './createToDoComponent.scss';

/**
 * 
 * @param {Object} props 
 * @returns {Object}
 */
export default function CreateToDoComponent(props) {
    //const _createNewProjectSelectValue = 'create-new-project';
    let _createToDoElement = null;
    let _createNewProjectContainerElement = null;
    let _createNewProjectInputElement = null;
    let _createToDoTitleInputElement = null;

    // Add default value of props.createNewProjectSelectValue = 'create-new-project'
    if (!props.hasOwnProperty('createNewProjectSelectValue')) {
        props.createNewProjectSelectValue = 'create-new-project';
    }

    const _handleFormSubmit = e => {
        props.handleQuickAddToDoSubmit(e);

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
            if (props.hasOwnProperty('repeat')) {
                if (props.repeat === repeatType) {
                    option.selected = true;
                }
            } else if (index === 0) {
                option.selected = true;
            }
            return option;
        });
    };

    const _createPriorityTypeOptions = () => {
        return Priority.getAllPriorityLevels().map(priorityLevel => {
            const option = createElement('option', {value: priorityLevel.getValue()}, priorityLevel.getColor());
            if (props.hasOwnProperty('priority')) {
                if (props.priority === priorityLevel) {
                    option.selected = true;
                }
            } else if (priorityLevel.getValue() === 0) {
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
        // Return if no 'create new prjoject' input element or container
        if (!_createNewProjectInputElement || !_createNewProjectContainerElement)
            return;

        if (e.target.value === props.createNewProjectSelectValue) {
            _createNewProjectContainerElement.classList.remove('hide');
            _createNewProjectInputElement.removeAttribute('disabled');
            _createNewProjectInputElement.focus();
        } else {
            _createNewProjectContainerElement.classList.add('hide');
            _createNewProjectInputElement.setAttribute('disabled', true);
        }
    };

    const _createProjectOptions = () => {
        const projectOptions = ToDoApp.getAllProjects().map(todoProject => {
            const option = createElement('option', {value: todoProject.getName()}, todoProject.getName());
            if (props.hasOwnProperty('project')) {
                if (props.project === todoProject) {
                    option.selected = true;
                }
            } else if (todoProject.getName() === 'default') {
                option.selected = true;
            }
            return option;
        });

        const addNewProjectOption = createElement('option', {value: props.createNewProjectSelectValue}, '+ Add New Project');

        projectOptions.push(addNewProjectOption);

        return projectOptions;
    };

    return {
        render: () => {
            _createToDoElement = createElement('div', {id: 'create-todo'});

            // Event listener to close modal when background is clicked
            _createToDoElement.addEventListener('click', _close, false);

            const createToDoFormContainer = _createToDoElement.appendChild(
                createElement('div', {id: 'create-todo-form-container'})
            );

            // Header

            const header = createToDoFormContainer.appendChild(
                createElement('div', {id: 'create-todo-form-header'})
            );

            // Header - Title

            header.appendChild(createElement('h2', {}, props.headerTitle || 'Create New ToDo'));

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

            _createToDoTitleInputElement = createElement('input', {
                type: 'text', minlength: '1', maxlength: '50', 
                id: 'todo-title-input', name: 'title', required: true,
                autofocus: true,
                value: props.title || '',
            });

            createToDoForm.appendChild(
                createElement('div', {id: 'create-todo-title'}, 
                    createElement('label', {'for': 'todo-title-input'}, 
                        createElement('span', {}, 'Title'),
                        _createToDoTitleInputElement
                    )
                )
            );

            // Description

            const descriptionTextAreaElement = createElement('textarea', {
                id: 'todo-description-input', name: 'description',
                rows: '5', columns: '33',
                maxlength: '500',
            });
            descriptionTextAreaElement.value = props.description || '';

            createToDoForm.appendChild(
                createElement('div', {id: 'create-todo-description'}, 
                    createElement('label', {'for': 'todo-description-input'}, 
                        createElement('span', {}, 'Description'),
                        descriptionTextAreaElement
                    )
                )
            );

            // Due Date

            const dueDateElement = createElement('input', {
                type: 'datetime-local', id: 'todo-date-input', 
                name: 'date', required: true,
            });

            // Add default value if provided in props
            if (props.hasOwnProperty('dueDate')) {
                dueDateElement.value = props.dueDate.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/)[0] || '';
            } else {
                dueDateElement.value = '';
            }

            createToDoForm.appendChild(
                createElement('div', {id: 'create-todo-date'}, 
                    createElement('label', {'for': 'todo-date-input'}, 
                        createElement('span', {}, 'Due Date'),
                        dueDateElement
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

            // Event listener when project select is changed
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
                placeholder: 'Enter New Project Title',
                maxlength: 50,
                disabled: true,
            });

            _createNewProjectInputElement.addEventListener('input', e => {
                if (ToDoProjectNew.getProjectByName(_createNewProjectInputElement.value)) {
                    _createNewProjectInputElement.setCustomValidity('Project name already exists!');
                    _createNewProjectInputElement.reportValidity();
                } else {
                    _createNewProjectInputElement.setCustomValidity('');
                }
            }, false);

            _createNewProjectContainerElement = createToDoForm.appendChild(
                createElement('div', {id: 'create-todo-project-add-new', 'class': 'hide'}, 
                    createElement('label', {'for': 'todo-project-add-new-input'}, 
                        //createElement('span', {}, 'New Project Title:'),
                        _createNewProjectInputElement
                    )
                )
            );

            // Button Container

            createToDoForm.appendChild(
                createElement('div', {id: 'create-todo-btns'}, 
                    createElement('button', {type: 'reset'}, 'Reset'),
                    createElement('button', {type: 'submit'}, props.submitBtnText || 'Add')
                )
            );

            return _createToDoElement;
        },
        setInitialFocus: () => {
            if (_createToDoTitleInputElement) {
                _createToDoTitleInputElement.focus();
            }
        },
    };
}