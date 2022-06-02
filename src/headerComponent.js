import CreateToDoComponent from "./createToDoComponent.js";
import { createElement } from "./utilities.js";
import './headerComponent.scss';

/**
 * 
 * @param {Object} props 
 * @returns {Object}
 */
export default function HeaderComponent(props) {
    const _createQuickAddToDo = () => {
        const quickAddToDoElement = createElement('div', {id: 'quick-add-todo', 'aria-label': 'Quick add new To-Do'});

        quickAddToDoElement.addEventListener('click', () => {
            document.getElementById('content').appendChild(
                CreateToDoComponent({
                    handleQuickAddToDoSubmit: props.handleQuickAddToDoSubmit,
                    createNewProjectSelectValue: props.createNewProjectSelectValue,
                }).render()
            );
        }, false);

        return quickAddToDoElement;
    };

    return {
        render: () => {
            const headerComponent = document.createElement('header');

            headerComponent.appendChild(createElement('nav', {id: 'topnav'}, 
                createElement('span', {id: 'topnav-logo'}, 'Logo'),
                createElement('h1', {}, 'ToDo List'),
                _createQuickAddToDo()
            ));

            return headerComponent;
        },
    };
}