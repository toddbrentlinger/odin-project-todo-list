import ToDo from "./todo.js";
import { createElement } from "./utilities.js";
import './todoComponent.scss';

export default function ToDoComponent(todo) {
    let _todoElement = null;
    let _detailsDropdownContainerElement = null;
    let _bIsExpanded = false;

    const _handleExpandBtnClick = () => {
        if (_bIsExpanded) {
            _closeDetailsDropdown();
        } else {
            _openDetailsDropdown();
        }
    };

    const _createToDoDropdownElement = () => {
        _detailsDropdownContainerElement = createElement('div', {'class': 'todo-item-details-container'});

        const detailsDropdownElement = _detailsDropdownContainerElement.appendChild(
            createElement('div', {'class': 'todo-item-details'})
        );

        // Description
        detailsDropdownElement.appendChild(
            createElement('p', {'class': 'todo-description todo-details-item'}, todo.getDescription())
        );

        // Priority
        const priorityLevel = todo.getPriorityLevel();
        detailsDropdownElement.appendChild(
            createElement('div', {'class': 'todo-priority-container todo-details-item'}, 
                createElement('div', {}, 'Priority: '),
                createElement('div', {}, `(${priorityLevel.getValue()}) ${priorityLevel.getColor()}`)
            )
        );

        // Repeat
        const repeatType = todo.getRepeatType();
        detailsDropdownElement.appendChild(
            createElement('div', {'class': 'todo-repeat-container todo-details-item'}, 
                createElement('div', {}, 'Repeat: '),
                createElement('div', {}, repeatType.getName())
            )
        );

        // Project
        const project = todo.getProject();
        detailsDropdownElement.appendChild(
            createElement('div', {'class': 'todo-project-container todo-details-item'}, 
                createElement('div', {}, 'Project: '),
                createElement('div', {}, project.getName())
            )
        );

        // Btn Container
        const btnContainer = detailsDropdownElement.appendChild(
            createElement('div', {'class': 'todo-btn-container'})
        );

        // Btn - Delete
        btnContainer.appendChild(
            createElement('button', {'class': 'todo-btn-delete'}, 'Delete')
        );

        // Btn - Edit
        btnContainer.appendChild(
            createElement('button', {'class': 'todo-btn-edit'}, 'Edit')
        );

        return _detailsDropdownContainerElement;
    };

    const _openDetailsDropdown = () => {
        _todoElement.appendChild(_createToDoDropdownElement());
        _bIsExpanded = true;
    };

    const _closeDetailsDropdown = () => {
        if (!_detailsDropdownContainerElement)
            return;

            _detailsDropdownContainerElement.remove();
        _bIsExpanded = false;
    };

    return {
        getToDo: () => todo,
        render: () => {
            _todoElement = createElement('div', {'class': 'todo-item'});

            // Apply styling depending on ToDo priority level
            _todoElement.style.borderColor = todo.getPriorityLevel().getColor();

            // ToDo Header
            const headerElement = _todoElement.appendChild(
                createElement('div', {'class': 'todo-item-header'})
            );

            // Checkbox
            headerElement.appendChild(
                createElement('div', {'class': 'todo-checkbox-container'}, 
                    createElement('div', {'class': 'todo-checkbox'})
                )
            );

            // Title
            const title = headerElement.appendChild(
                createElement('h2', {'class': 'todo-title'}, todo.getTitle())
            );

            // Due Date
            const datetime = headerElement.appendChild(
                createElement(
                    'time', 
                    {'class': 'todo-datetime', 'datetime': todo.getDueDateDatetimeAttribute()}, 
                    todo.getDueDateAsString()
                )
            );

            // Expand Button
            const expandBtn = createElement('button', {'class': 'todo-btn-expand close'}, '+');
            expandBtn.addEventListener('click', _handleExpandBtnClick, false);
            headerElement.appendChild(expandBtn);

            if (_bIsExpanded) {
                _todoElement.appendChild(
                    _createToDoDropdownElement()
                );
            }

            return _todoElement;
        },
    };
}