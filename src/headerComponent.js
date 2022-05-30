import CreateToDoComponent from "./createToDoComponent.js";
import { createElement } from "./utilities.js";
import './headerComponent.scss';

export default function HeaderComponent() {
    return {
        render: () => {
            const headerComponent = document.createElement('header');

            const plusIconWithCharCode = createElement('span', {});
            //plusIconWithCharCode.innerHTML = '&#43;';

            headerComponent.appendChild(createElement('nav', {id: 'topnav'}, 
                createElement('span', {id: 'topnav-logo'}, 'Logo'),
                createElement('h1', {}, 'ToDo List'),
                createElement('div', {id: 'quick-add-todo'}, plusIconWithCharCode)
            ));

            return headerComponent;
        },
    };
}