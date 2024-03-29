import CreateToDoComponent from "./createToDoComponent.js";
import ConfirmComponent from "./confirmComponent.js";
import { createElement } from "../utilities.js";

import './todoComponent.scss';
import FontAwesomeIcon from "./fontAwesomeIcon.js";

export default function ToDoComponent(todo, deleteToDoHandler, editToDoHandler) {
    let _todoElement = null;
    let _detailsDropdownContainerElement = null;
    let _expandBtnElement = null;
    let _bIsExpanded = false;

    const _handleExpandBtnClick = e => {
        e.preventDefault();
        if (_bIsExpanded) {
            _closeDetailsDropdown(e);
        } else {
            _openDetailsDropdown(e);
        }
    };

    const _handleEditToDoSubmit = e => {
        editToDoHandler(e, todo);
    };

    const _handleDeleteToDoConfirm = e => {
        deleteToDoHandler(e, todo);
    };

    const _handleDeleteToDoCancel = e => {

    };

    const _handleDeleteToDoBtnClick = e => {
        document.getElementById('content').appendChild(
            ConfirmComponent(
                'Are you sure you want to delete the ToDo?',
                _handleDeleteToDoConfirm,
                _handleDeleteToDoCancel
            ).render()
        );
    };

    const _handleEditToDoBtnClick = e => {
        console.log('ToDo edit button clicked!');
        e.preventDefault();
        document.getElementById('content').appendChild(
            CreateToDoComponent({
                handleQuickAddToDoSubmit: _handleEditToDoSubmit,
                headerTitle: 'Edit ToDo',
                title: todo.getTitle(),
                description: todo.getDescription(),
                dueDate: todo.getDueDateDatetimeAttribute(),
                priority: todo.getPriorityLevel(),
                repeat: todo.getRepeatType(),
                project: todo.getProject(),
                submitBtnText: 'Update',
            }).render()
        );
    };

    const _handleToDoCheckmarkClick = e => {
        deleteToDoHandler(e, todo);
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

        // Repeat
        const repeatType = todo.getRepeatType();
        detailsDropdownElement.appendChild(
            createElement('div', {'class': 'todo-repeat-container todo-details-item'}, 
                createElement('div', {}, 'Repeat: '),
                createElement('div', {}, repeatType.getName())
            )
        );

        // Priority
        const priorityLevel = todo.getPriorityLevel();
        detailsDropdownElement.appendChild(
            createElement('div', {'class': 'todo-priority-container todo-details-item'}, 
                createElement('div', {}, 'Priority: '),
                createElement('div', {}, `(${priorityLevel.getValue()}) ${priorityLevel.getColor()}`)
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
        const deleteBtn = btnContainer.appendChild(
            createElement('button', {'class': 'todo-btn-delete custom-btn'}, 
                createElement('i', {'class': 'fas fa-trash-alt'}),
                createElement('span', {}, 'Delete')
            )
        );
        deleteBtn.addEventListener('click', _handleDeleteToDoBtnClick, false);

        // Btn - Edit
        const editBtn = btnContainer.appendChild(
            createElement('button', {'class': 'todo-btn-edit custom-btn'}, 
                createElement('i', {'class': 'fas fa-edit'}), 
                createElement('span', {}, 'Edit')
            )
        );
        editBtn.addEventListener('click', _handleEditToDoBtnClick, false);

        return _detailsDropdownContainerElement;
    };

    const _openDetailsDropdown = e => {
        _todoElement.appendChild(_createToDoDropdownElement());
        _bIsExpanded = true;

        const newExpandBtnElement = createElement('i', {'class': 'fas fa-chevron-circle-up'});
        _expandBtnElement.replaceWith(newExpandBtnElement);
        _expandBtnElement = newExpandBtnElement;

        e.currentTarget.classList.remove('close');
    };

    const _closeDetailsDropdown = e => {
        if (!_detailsDropdownContainerElement)
            return;
        _detailsDropdownContainerElement.remove();
        _bIsExpanded = false;

        const newExpandBtnElement = createElement('i', {'class': 'fas fa-chevron-circle-down'});
        _expandBtnElement.replaceWith(newExpandBtnElement);
        _expandBtnElement = newExpandBtnElement;

        e.currentTarget.classList.add('close');
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
                    createElement('button', {'class': 'todo-checkbox', 'aria-label': 'Check this box if ToDo has been completed.'})
                )
            ).addEventListener('click', _handleToDoCheckmarkClick, false);

            // Title
            const title = headerElement.appendChild(
                createElement('h2', {'class': 'todo-title'}, todo.getTitle())
            );

            // Due Date
            const datetime = headerElement.appendChild(
                createElement(
                    'time', 
                    {'class': 'todo-datetime', 'datetime': todo.getDueDateDatetimeAttribute()},
                    FontAwesomeIcon('far fa-calendar-alt').render(),
                    todo.getDueDateAsString()
                )
            );

            // Expand Button
            _expandBtnElement = createElement('i', {'class': `fas fa-chevron-circle-${_bIsExpanded ? 'up' : 'down'}`});
            const expandBtnContainer = createElement('button', {'class': 'todo-btn-expand', 'aria-label': 'Expand for more details about ToDo.'}, 
                _expandBtnElement
            );
            if (!_bIsExpanded) {
                expandBtnContainer.classList.add('close');
            }
            expandBtnContainer.addEventListener('click', _handleExpandBtnClick, false);
            headerElement.appendChild(expandBtnContainer);

            if (_bIsExpanded) {
                _todoElement.appendChild(
                    _createToDoDropdownElement()
                );
            }

            return _todoElement;
        },
    };
}